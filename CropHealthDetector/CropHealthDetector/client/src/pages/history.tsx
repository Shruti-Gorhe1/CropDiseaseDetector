import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, User, LogOut, ArrowLeft, Calendar, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { isUnauthorizedError } from "@/lib/authUtils";
import { format } from "date-fns";

export default function History() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();

  const { data: predictions, isLoading: predictionsLoading } = useQuery({
    queryKey: ["/api/predictions"],
    enabled: !!user,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !user) {
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
  }, [user, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-success/10 text-success";
    if (confidence >= 0.7) return "bg-primary/10 text-primary";
    return "bg-warning/10 text-warning";
  };

  const getSeverityColor = (severity: number | null) => {
    if (!severity) return "bg-gray-100 text-gray-600";
    if (severity >= 0.8) return "bg-error/10 text-error";
    if (severity >= 0.5) return "bg-warning/10 text-warning";
    return "bg-success/10 text-success";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CropGuard AI</h1>
                <p className="text-sm text-gray-500">Disease Detection System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Detection
                </Button>
              </Link>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user.firstName || user.email}</span>
              </div>
              <Button 
                onClick={handleLogout}
                className="bg-primary text-white hover:bg-primary/90"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary/10 text-primary p-2 rounded-lg">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Detection History</h2>
              <p className="text-sm text-gray-500">View your past crop disease detections</p>
            </div>
          </div>
        </div>

        {predictionsLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading predictions...</p>
          </div>
        ) : !predictions || predictions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Predictions Yet</h3>
              <p className="text-gray-600 mb-4">
                You haven't uploaded any crop images for disease detection yet.
              </p>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90">
                  Start Detection
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {predictions.map((prediction: any) => (
              <Card key={prediction.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {prediction.imageUrl && (
                      <div className="flex-shrink-0">
                        <img 
                          src={prediction.imageUrl} 
                          alt="Crop analysis"
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {prediction.diseaseName}
                        </h3>
                        <Badge 
                          className={getConfidenceColor(prediction.confidence)}
                          variant="secondary"
                        >
                          {Math.round(prediction.confidence * 100)}% confidence
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {format(new Date(prediction.createdAt), 'PPp')}
                        </span>
                        {prediction.originalFilename && (
                          <span className="truncate">
                            File: {prediction.originalFilename}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Confidence:</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${prediction.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        {prediction.severity && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Severity:</span>
                            <Badge 
                              className={getSeverityColor(prediction.severity)}
                              variant="secondary"
                            >
                              {prediction.severity >= 0.8 ? 'High' : 
                               prediction.severity >= 0.5 ? 'Medium' : 'Low'}
                            </Badge>
                          </div>
                        )}
                        
                        {prediction.processingTime && (
                          <span className="text-sm text-gray-600">
                            Processed in {prediction.processingTime.toFixed(2)}s
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
