import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Eye, CheckCircle, ArrowRight, Target, Zap, TrendingUp, Users, Star } from "lucide-react";
import LeadScoringIllustration from "@/components/LeadScoringIllustration";
import { useNavigate } from "react-router-dom";

interface Step {
  number: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  icon: React.ComponentType<{ className?: string }>;
  setupRequired?: boolean;
}

const PreSetup = () => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Simulate setup status - you can modify these to test different states
  const [marketingAnalyticsComplete, setMarketingAnalyticsComplete] = useState(false);
  const [productIntelligenceComplete, setProductIntelligenceComplete] = useState(false);

  const steps: Step[] = [
    {
      number: 1,
      title: "Marketing Analytics Setup",
      description: "Configure your marketing tracking and attribution",
      status: marketingAnalyticsComplete ? "completed" : "current",
      icon: TrendingUp,
      setupRequired: !marketingAnalyticsComplete
    },
    {
      number: 2,
      title: "Product Intelligence Setup", 
      description: "Set up product usage analytics and insights",
      status: productIntelligenceComplete ? "completed" : marketingAnalyticsComplete ? "current" : "pending",
      icon: Target,
      setupRequired: marketingAnalyticsComplete && !productIntelligenceComplete
    },
    {
      number: 3,
      title: "Setup Score Lead",
      description: "Configure lead scoring criteria and thresholds",
      status: (marketingAnalyticsComplete && productIntelligenceComplete) ? "current" : "pending",
      icon: Settings
    }
  ];

  const canSetupLeadScore = marketingAnalyticsComplete && productIntelligenceComplete;

  const handleSetupLeadScore = () => {
    navigate("/setup");
  };

  const handleTryDemo = () => {
    console.log("Demo mode activated");
  };

  const handleSetupStep = (stepNumber: number) => {
    // Simulate setup completion for demo purposes
    if (stepNumber === 1) {
      setMarketingAnalyticsComplete(true);
    } else if (stepNumber === 2) {
      setProductIntelligenceComplete(true);
    }
    console.log(`Setting up step ${stepNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Setup Lead Scoring</h1>
              <p className="text-gray-600 mt-1">Follow these steps to begin tracking and gain insights into lead quality</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>~10 mins setup</span>
            <div className="flex items-center space-x-1">
              <div className="w-8 h-1 bg-blue-600 rounded"></div>
              <div className="w-8 h-1 bg-blue-600 rounded"></div>
              <div className="w-8 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-1 bg-gray-300 rounded"></div>
            </div>
            <span>2/4</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Setup Steps */}
          <div className="space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = step.status === 'current';
              const isCompleted = step.status === 'completed';
              const isPending = step.status === 'pending';

              return (
                <Card key={step.number} className={`transition-all duration-200 ${
                  isActive ? 'border-blue-200 bg-blue-50' : 
                  isCompleted ? 'border-green-200 bg-green-50' : 
                  'border-gray-200 bg-white'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      {/* Left side - Step info */}
                      <div className="flex items-center space-x-4">
                        {/* Step indicator */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-600 text-white' :
                          isActive ? 'bg-blue-600 text-white' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>

                        {/* Step content */}
                        <div className="flex-1">
                          <h3 className={`font-semibold text-lg ${
                            isActive ? 'text-blue-900' : 
                            isCompleted ? 'text-green-900' : 
                            'text-gray-700'
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mt-1">{step.description}</p>
                          
                          {/* Status badges */}
                          <div className="flex items-center space-x-2 mt-2">
                            {isCompleted && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                            {isActive && !isCompleted && (
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                Current Step
                              </Badge>
                            )}
                            {isPending && (
                              <Badge variant="outline" className="text-gray-600">
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right side - Action button for incomplete steps */}
                      {step.setupRequired && (
                        <Button 
                          onClick={() => handleSetupStep(step.number)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Setup Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Action Buttons Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mt-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Continue?</h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {canSetupLeadScore && (
                    <Button 
                      onClick={handleSetupLeadScore}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 px-6 py-3 text-base font-semibold rounded-lg group"
                    >
                      <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
                      <span>Setup Lead Score</span>
                    </Button>
                  )}
                  
                  <Button 
                    onClick={handleTryDemo}
                    variant="outline" 
                    size="lg"
                    className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 px-6 py-3 text-base font-semibold rounded-lg group"
                  >
                    <Eye className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Try Demo Mode</span>
                  </Button>
                </div>

                {!canSetupLeadScore && (
                  <p className="text-sm text-gray-600 mt-3">
                    Complete the prerequisite setups above to enable lead scoring configuration.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 text-green-600 mr-2" />
                  Expected Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900">5x</div>
                    <p className="text-sm text-green-700">Faster Qualification</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900">85%</div>
                    <p className="text-sm text-green-700">Accuracy Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900">40%</div>
                    <p className="text-sm text-green-700">More Conversions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Illustration (Separated) */}
          <div className="lg:border-l lg:border-gray-200 lg:pl-8">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Lead Scoring Preview
                </h3>
                <LeadScoringIllustration />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSetup;
