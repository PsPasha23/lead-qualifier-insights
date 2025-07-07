
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
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Settings className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Setup Lead Scoring</h1>
              <p className="text-gray-600 text-sm mt-1">Follow these steps to begin tracking and gain insights into lead quality</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>~10 mins setup</span>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-1 bg-blue-600 rounded"></div>
              <div className="w-6 h-1 bg-blue-600 rounded"></div>
              <div className="w-6 h-1 bg-gray-300 rounded"></div>
              <div className="w-6 h-1 bg-gray-300 rounded"></div>
            </div>
            <span>2/4</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Side - Setup Steps and ROI */}
          <div className="space-y-3 overflow-y-auto">
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
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      {/* Left side - Step info */}
                      <div className="flex items-center space-x-3">
                        {/* Step indicator */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-600 text-white' :
                          isActive ? 'bg-blue-600 text-white' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Icon className="h-4 w-4" />
                          )}
                        </div>

                        {/* Step content */}
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            isActive ? 'text-blue-900' : 
                            isCompleted ? 'text-green-900' : 
                            'text-gray-700'
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-0.5">{step.description}</p>
                          
                          {/* Status badges */}
                          <div className="flex items-center space-x-2 mt-1">
                            {isCompleted && (
                              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                                <CheckCircle className="h-2 w-2 mr-1" />
                                Completed
                              </Badge>
                            )}
                            {isActive && !isCompleted && (
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                                Current Step
                              </Badge>
                            )}
                            {isPending && (
                              <Badge variant="outline" className="text-gray-600 text-xs">
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
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Setup Now
                        </Button>
                      )}
                    </div>

                    {/* Setup Score Lead Actions */}
                    {step.number === 3 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-3">
                          {canSetupLeadScore && (
                            <Button 
                              onClick={handleSetupLeadScore}
                              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
                            >
                              <Settings className="h-4 w-4" />
                              <span>Setup Now</span>
                            </Button>
                          )}
                          
                          <Button 
                            onClick={handleTryDemo}
                            variant="outline" 
                            className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Eye className="h-4 w-4" />
                            <span>Try Demo Mode</span>
                          </Button>
                        </div>

                        {!canSetupLeadScore && (
                          <p className="text-xs text-gray-600 mt-2">
                            Complete the prerequisite setups above to enable lead scoring configuration.
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            {/* Your Lead Scoring ROI Section - Moved from right side */}
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <h4 className="text-lg font-bold mb-3 text-center">
                  Your Lead Scoring ROI
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center">
                    <div className="text-xl font-bold">5x</div>
                    <p className="text-xs opacity-90">Faster Processing</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">85%</div>
                    <p className="text-xs opacity-90">Accuracy Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">40%</div>
                    <p className="text-xs opacity-90">More Conversions</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">60%</div>
                    <p className="text-xs opacity-90">Time Savings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Illustration */}
          <div className="lg:border-l lg:border-gray-200 lg:pl-6 overflow-hidden">
            <div className="h-full">
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-full overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                  Lead Scoring Preview
                </h3>
                <div className="h-[calc(100%-60px)] overflow-hidden">
                  <LeadScoringIllustration />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSetup;
