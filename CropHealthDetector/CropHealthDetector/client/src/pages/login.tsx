import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Shield, Brain, Users } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-600 dark:text-green-400" />
            <span className="ml-2 text-3xl font-bold text-green-800 dark:text-green-200">CropGuard AI</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Sign in to access your crop disease detection dashboard
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-green-800 dark:text-green-200">Sign In to Your Account</CardTitle>
            <CardDescription>
              Access your personalized disease detection tools and history
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Brain className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  AI-powered disease detection for 38+ plant diseases
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Secure prediction history and analytics
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Treatment recommendations from experts
                </span>
              </div>
            </div>

            {/* Sign In Button */}
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
            >
              Sign In with Replit
            </Button>

            {/* Additional Info */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Secure authentication powered by Replit</p>
              <p className="mt-1">Your data is protected and encrypted</p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <Brain className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Smart Detection</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                96.8% accuracy rate
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Secure Storage</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Encrypted history
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <Users className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Expert Advice</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Treatment guidance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}