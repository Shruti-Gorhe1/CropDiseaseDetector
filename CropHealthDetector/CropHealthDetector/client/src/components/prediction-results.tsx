import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle } from "lucide-react";

interface PredictionResult {
  disease: string;
  confidence: number;
  severity?: number;
  processingTime?: number;
}

interface PredictionResultsProps {
  prediction: PredictionResult;
}

export default function PredictionResults({ prediction }: PredictionResultsProps) {
  const getSeverityLevel = (severity?: number) => {
    if (!severity) return { level: "Unknown", color: "bg-gray-100 text-gray-600" };
    if (severity >= 0.8) return { level: "Severe", color: "bg-error/10 text-error" };
    if (severity >= 0.5) return { level: "Moderate", color: "bg-warning/10 text-warning" };
    return { level: "Mild", color: "bg-success/10 text-success" };
  };

  const severityInfo = getSeverityLevel(prediction.severity);

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="bg-success/10 text-success p-2 rounded-lg">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Detection Results</CardTitle>
            <CardDescription>
              AI-powered disease analysis results
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Disease Detection Card */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Detected Disease</h3>
              <Badge className="bg-primary/10 text-primary">
                Confirmed
              </Badge>
            </div>
            <div className="mb-3">
              <h4 className="text-xl font-bold text-gray-900">{prediction.disease}</h4>
              <p className="text-sm text-gray-600">
                {prediction.disease === "Healthy" ? "No disease detected" : "Disease classification"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${prediction.confidence * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(prediction.confidence * 100)}%
              </span>
            </div>
          </div>

          {/* Severity Assessment */}
          <div className="bg-gradient-to-r from-accent/5 to-warning/5 rounded-lg p-4 border border-accent/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Severity Level</h3>
              <Badge className={severityInfo.color}>
                {severityInfo.level}
              </Badge>
            </div>
            <div className="mb-3">
              <h4 className="text-xl font-bold text-gray-900">{severityInfo.level}</h4>
              <p className="text-sm text-gray-600">
                {severityInfo.level === "Severe" ? "Immediate action required" :
                 severityInfo.level === "Moderate" ? "Monitor closely" :
                 severityInfo.level === "Mild" ? "Preventive measures recommended" :
                 "Assessment unavailable"}
              </p>
            </div>
            {prediction.severity && (
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${prediction.severity * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(prediction.severity * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Processing Info */}
        {prediction.processingTime && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Processing Time:</span>
              <span className="font-medium text-gray-900">
                {prediction.processingTime.toFixed(2)}s
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
