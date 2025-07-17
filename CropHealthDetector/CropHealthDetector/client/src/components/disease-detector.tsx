import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Microscope, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import FileUpload from "@/components/ui/file-upload";
import PredictionResults from "@/components/prediction-results";
import TreatmentRecommendations from "@/components/treatment-recommendations";
import { detectDisease } from "@/lib/tensorflow-model";

interface PredictionResult {
  disease: string;
  confidence: number;
  severity?: number;
  processingTime?: number;
}

export default function DiseaseDetector() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const savePredictionMutation = useMutation({
    mutationFn: async (data: FormData) => {
      await apiRequest("POST", "/api/predictions", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/predictions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/predictions/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/predictions/recent"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      console.error("Error saving prediction:", error);
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setPrediction(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview("");
    setPrediction(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const startTime = Date.now();
      const result = await detectDisease(preview);
      const processingTime = (Date.now() - startTime) / 1000;
      
      const predictionResult = {
        ...result,
        processingTime,
      };
      
      setPrediction(predictionResult);

      // Save to database
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('diseaseName', result.disease);
      formData.append('confidence', result.confidence.toString());
      if (result.severity) {
        formData.append('severity', result.severity.toString());
      }
      formData.append('processingTime', processingTime.toString());

      savePredictionMutation.mutate(formData);

      toast({
        title: "Analysis Complete",
        description: `Disease detected: ${result.disease} (${Math.round(result.confidence * 100)}% confidence)`,
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-secondary/10 text-secondary p-2 rounded-lg">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Upload Crop Image</CardTitle>
              <CardDescription>
                Upload a clear image of crop leaves for disease detection
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FileUpload
            onFileSelect={handleFileSelect}
            onClear={handleClear}
            preview={preview}
            className="mb-6"
          />
          
          {preview && (
            <div className="flex justify-center space-x-3">
              <Button
                onClick={handleAnalyze}
                disabled={isProcessing}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Microscope className="w-4 h-4 mr-2" />
                )}
                {isProcessing ? "Analyzing..." : "Analyze Disease"}
              </Button>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Analyzing crop image...</p>
                  <p className="text-xs text-gray-500">AI model is processing your image for disease detection</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {prediction && (
        <>
          <PredictionResults prediction={prediction} />
          <TreatmentRecommendations 
            disease={prediction.disease}
            confidence={prediction.confidence}
            severity={prediction.severity}
          />
        </>
      )}
    </div>
  );
}
