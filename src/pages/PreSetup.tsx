
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Eye, CheckCircle, ArrowRight, Target, Zap, TrendingUp } from "lucide-react";
import LeadScoringIllustration from "@/components/LeadScoringIllustration";
import { useNavigate } from "react-router-dom";

interface Step {
  number: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  icon: React.ComponentType<{ className?: string }>;
}

const PreSetup = () => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps: Step[] = [
    {
      number: 1,
      title: "Marketing Analytics Setup",
      description: "Configure your marketing tracking and attribution",
      status: "completed",
      icon: TrendingUp
    },
    {
      number: 2,
      title: "Product Intelligence Setup", 
      description: "Set up product usage analytics and insights",
      status: "completed",
      icon: Target
    },
    {
      number: 3,
      title: "Setup Score Lead",
      description: "Configure lead scoring criteria and thresholds",
      status: "current",
      icon: Settings
    }
  ];

  const handleSetupLeadScore = () => {
    navigate("/setup");
  };

  const handleTryDemo = () => {
    // Demo mode functionality
    console.log("Demo mode activated");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[80vh]">
          {/* Left Side - Enhanced UI */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Header Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Setup Score For Your{" "}
                  <span className="text-blue-600 relative">
                    Leads
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Lead Scoring ranks prospects by their likelihood to convert, using their actions 
                  and attributes. Once set up, it helps you identify high-potential leads, prioritize 
                  sales efforts, and improve pipeline efficiency.
                </p>
              </div>

              {/* Benefits Pills */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Instant Prioritization
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Higher Conversion
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">
                  <Target className="h-3 w-3 mr-1" />
                  Better ROI
                </Badge>
              </div>
            </div>

            {/* Steps Progress */}
            <div className="space-y-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                      step.status === 'current' 
                        ? 'bg-white border-2 border-blue-200 shadow-md' 
                        : 'bg-white/60 border border-gray-200'
                    } ${step.status === 'current' ? 'hover:shadow-lg' : ''}`}
                    onMouseEnter={() => setHoveredStep(step.number)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* Step Number/Icon */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                      step.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : step.status === 'current'
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : step.status === 'current' ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-semibold">{step.number}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 className={`font-semibold transition-colors duration-200 ${
                        step.status === 'current' ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    </div>

                    {/* Status Indicator */}
                    {step.status === 'current' && hoveredStep === step.number && (
                      <ArrowRight className="h-5 w-5 text-blue-500 animate-bounce-x" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={handleSetupLeadScore}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 px-8 py-6 text-lg font-semibold rounded-xl group"
              >
                <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
                <span>Setup Lead Score</span>
              </Button>
              
              <Button 
                onClick={handleTryDemo}
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 px-8 py-6 text-lg font-semibold rounded-xl group"
              >
                <Eye className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Try Demo Mode</span>
              </Button>
            </div>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-900">5x</div>
                    <p className="text-sm text-blue-700">Faster Qualification</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-900">85%</div>
                    <p className="text-sm text-blue-700">Accuracy Rate</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-900">40%</div>
                    <p className="text-sm text-blue-700">More Conversions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Lead Scoring Illustration */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <LeadScoringIllustration />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSetup;
