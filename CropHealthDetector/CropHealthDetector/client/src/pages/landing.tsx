import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Microscope, Shield, Users, BarChart3, Clock } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100">
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
            <Button onClick={handleLogin} className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full inline-block text-sm font-medium mb-6">
            AI-Powered Agriculture Technology
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Protect Your Crops with
            <span className="text-primary block">AI Disease Detection</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload images of crop leaves and get instant AI-powered disease detection with 96.8% accuracy. 
            Get treatment recommendations to save your harvest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleLogin}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
            >
              <Microscope className="w-5 h-5 mr-2" />
              Start Detection
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-lg"
              asChild
            >
              <a href="/login">
                <Shield className="w-5 h-5 mr-2" />
                Sign In
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CropGuard AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced machine learning technology meets practical agriculture solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit">
                  <Microscope className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Instant Detection</CardTitle>
                <CardDescription>
                  Get results in seconds with our TensorFlow.js powered AI model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    Real-time image analysis
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    38+ crop disease types
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    96.8% accuracy rate
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-secondary/10 text-secondary p-3 rounded-lg w-fit">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Treatment Guidance</CardTitle>
                <CardDescription>
                  Get actionable treatment recommendations for detected diseases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                    Immediate action plans
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                    Chemical treatments
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                    Organic solutions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Track Progress</CardTitle>
                <CardDescription>
                  Monitor your crop health with detailed analytics and history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                    Detection history
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                    Success tracking
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                    Performance metrics
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">96.8%</div>
              <div className="text-primary-foreground/80">Detection Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">38+</div>
              <div className="text-primary-foreground/80">Disease Types</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-primary-foreground/80">Crops Analyzed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Protect Your Crops?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of farmers using AI to detect and treat crop diseases early
          </p>
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg"
          >
            <Users className="w-5 h-5 mr-2" />
            Start Free Detection
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">CropGuard AI</h3>
                <p className="text-sm text-gray-500">Protecting crops with AI</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 CropGuard AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
