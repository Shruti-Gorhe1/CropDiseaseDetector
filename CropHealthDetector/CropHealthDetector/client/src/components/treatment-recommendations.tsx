import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, Shield, Droplets, AlertTriangle, CheckCircle, ExternalLink, Star, Info, Bug, Zap } from "lucide-react";
import { getDiseaseInfo, type DiseaseInfo, type Treatment } from "@/lib/disease-database";

interface TreatmentRecommendationsProps {
  disease: string;
  confidence: number;
  severity?: number;
}

export default function TreatmentRecommendations({ disease, confidence, severity }: TreatmentRecommendationsProps) {
  const diseaseInfo = getDiseaseInfo(disease);
  
  if (!diseaseInfo) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            No Treatment Information Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Treatment information for "{disease}" is not available in our database.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'low': return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Shield className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Leaf className="h-4 w-4" />;
    }
  };

  const renderTreatmentCard = (treatment: Treatment, index: number) => (
    <Card key={index} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{treatment.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{treatment.type}</Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{treatment.effectiveness}/10</span>
            </div>
          </div>
        </div>
        {treatment.activeIngredient && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Active Ingredient: {treatment.activeIngredient}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Dosage</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{treatment.dosage}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Application</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{treatment.applicationMethod}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Frequency</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{treatment.frequency}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{treatment.price}</p>
            </div>
          </div>
          
          {treatment.purchaseLinks.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Purchase Options</p>
              <div className="flex flex-wrap gap-2">
                {treatment.purchaseLinks.map((link, linkIndex) => (
                  <Button
                    key={linkIndex}
                    variant="outline"
                    size="sm"
                    asChild
                    className="text-xs"
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {link.retailer} - {link.price}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full space-y-6">
      {/* Disease Information Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Bug className="h-6 w-6 text-red-600" />
              {diseaseInfo.name}
            </CardTitle>
            <Badge className={getSeverityColor(diseaseInfo.severity)}>
              {getSeverityIcon(diseaseInfo.severity)}
              <span className="ml-1 capitalize">{diseaseInfo.severity} Risk</span>
            </Badge>
          </div>
          {diseaseInfo.scientificName && (
            <CardDescription className="text-sm italic">
              {diseaseInfo.scientificName}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{diseaseInfo.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Affected Crops</h4>
                <div className="flex flex-wrap gap-1">
                  {diseaseInfo.affectedCrops.map((crop, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Spread Method</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{diseaseInfo.spreadMethod}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Symptoms and Causes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <ul className="space-y-2">
                {diseaseInfo.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{symptom}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              Causes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <ul className="space-y-2">
                {diseaseInfo.causes.map((cause, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{cause}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Treatment Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Droplets className="h-6 w-6 text-green-600" />
            Treatment Options
          </CardTitle>
          <CardDescription>
            Choose the treatment approach that best fits your preferences and situation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="organic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="organic">Organic ({diseaseInfo.treatments.organic.length})</TabsTrigger>
              <TabsTrigger value="chemical">Chemical ({diseaseInfo.treatments.chemical.length})</TabsTrigger>
              <TabsTrigger value="biological">Biological ({diseaseInfo.treatments.biological.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="organic" className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Organic treatments are environmentally friendly and safe for beneficial insects.
              </div>
              {diseaseInfo.treatments.organic.length > 0 ? (
                diseaseInfo.treatments.organic.map((treatment, index) => renderTreatmentCard(treatment, index))
              ) : (
                <p className="text-gray-500 text-center py-8">No organic treatments available for this disease.</p>
              )}
            </TabsContent>
            
            <TabsContent value="chemical" className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Chemical treatments are typically more effective but require careful handling.
              </div>
              {diseaseInfo.treatments.chemical.length > 0 ? (
                diseaseInfo.treatments.chemical.map((treatment, index) => renderTreatmentCard(treatment, index))
              ) : (
                <p className="text-gray-500 text-center py-8">No chemical treatments available for this disease.</p>
              )}
            </TabsContent>
            
            <TabsContent value="biological" className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Biological treatments use beneficial microorganisms to control disease.
              </div>
              {diseaseInfo.treatments.biological.length > 0 ? (
                diseaseInfo.treatments.biological.map((treatment, index) => renderTreatmentCard(treatment, index))
              ) : (
                <p className="text-gray-500 text-center py-8">No biological treatments available for this disease.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Prevention Measures */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Prevention Measures
          </CardTitle>
          <CardDescription>
            Prevent future outbreaks with these proactive measures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diseaseInfo.prevention.map((measure, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{measure}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Optimal Conditions for Disease</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{diseaseInfo.optimalConditions}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Detection Confidence</h4>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${confidence * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{(confidence * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}