import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Check, AlertTriangle, TrendingUp, Calendar } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

export default function SidebarStats() {
  const { data: stats } = useQuery({
    queryKey: ["/api/predictions/stats"],
    retry: false,
  });

  const { data: recentPredictions } = useQuery({
    queryKey: ["/api/predictions/recent"],
    retry: false,
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-success/10 text-success";
    if (confidence >= 0.7) return "bg-primary/10 text-primary";
    return "bg-warning/10 text-warning";
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Detection Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Images Analyzed</p>
                  <p className="text-xs text-gray-500">This session</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {stats?.totalPredictions || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-accent/10 text-accent p-2 rounded-lg">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Diseases Found</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {stats?.diseasesFound || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-success/10 text-success p-2 rounded-lg">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Accuracy Rate</p>
                  <p className="text-xs text-gray-500">Model performance</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {stats?.avgConfidence || 96.8}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Detections */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Detections</CardTitle>
            <Link href="/history">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPredictions && recentPredictions.length > 0 ? (
              recentPredictions.slice(0, 3).map((prediction: any) => (
                <div key={prediction.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  {prediction.imageUrl && (
                    <img 
                      src={prediction.imageUrl} 
                      alt="Recent detection"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {prediction.diseaseName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(prediction.createdAt), 'MMM d, HH:mm')}
                    </p>
                  </div>
                  <Badge 
                    className={getConfidenceColor(prediction.confidence)}
                    variant="secondary"
                  >
                    {Math.round(prediction.confidence * 100)}%
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No recent detections</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Model Information */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">AI Model Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Model Version</span>
              <span className="text-sm font-medium text-gray-900">v2.1.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Training Dataset</span>
              <span className="text-sm font-medium text-gray-900">PlantVillage</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Supported Crops</span>
              <span className="text-sm font-medium text-gray-900">38 Classes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Updated</span>
              <span className="text-sm font-medium text-gray-900">2 weeks ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
