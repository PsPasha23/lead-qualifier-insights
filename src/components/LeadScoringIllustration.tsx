
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Building, Users, Activity, Target, ArrowRight, User, CheckCircle } from "lucide-react";

interface ScoringStep {
  id: string;
  title: string;
  icon: any;
  description: string;
  score: 'high' | 'medium' | 'low';
  color: string;
}

const LeadScoringIllustration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const leadData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    company: 'TechCorp Inc.',
    jobTitle: 'VP of Marketing',
    industry: 'Technology'
  };

  const scoringSteps: ScoringStep[] = [
    {
      id: 'email',
      title: 'Email Domain Analysis',
      icon: Mail,
      description: 'Corporate email detected',
      score: 'high',
      color: 'blue'
    },
    {
      id: 'firmography',
      title: 'Company Profile',
      icon: Building,
      description: 'Tech company, 500+ employees',
      score: 'high',
      color: 'green'
    },
    {
      id: 'demographics',
      title: 'Job Role & Seniority',
      icon: Users,
      description: 'Senior marketing executive',
      score: 'high',
      color: 'purple'
    },
    {
      id: 'activity',
      title: 'Engagement Score',
      icon: Activity,
      description: 'Active user, multiple touchpoints',
      score: 'medium',
      color: 'orange'
    }
  ];

  const finalScore = 'high'; // Based on majority of high scores

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < scoringSteps.length) {
        setIsProcessing(true);
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setIsProcessing(false);
        }, 1000);
      } else {
        // Reset after showing final result
        setTimeout(() => {
          setCurrentStep(0);
        }, 3000);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [currentStep]);

  const getScoreColor = (score: 'high' | 'medium' | 'low') => {
    switch (score) {
      case 'high': return 'bg-green-500 text-white border-green-500';
      case 'medium': return 'bg-yellow-500 text-white border-yellow-500';
      case 'low': return 'bg-red-500 text-white border-red-500';
    }
  };

  const getScoreGradient = (score: 'high' | 'medium' | 'low') => {
    switch (score) {
      case 'high': return 'from-green-400 to-green-600';
      case 'medium': return 'from-yellow-400 to-yellow-600';
      case 'low': return 'from-red-400 to-red-600';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <Target className="h-8 w-8 mr-3 text-blue-600" />
          Lead Scoring Process Flow
        </h2>
        <p className="text-gray-600 text-lg">Watch how a lead progresses through our intelligent scoring system</p>
      </div>

      {/* Process Flow */}
      <div className="space-y-6">
        {/* Lead Input */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-blue-900">New Lead Enters System</h3>
                <div className="mt-2 p-3 bg-white rounded-lg border">
                  <p className="font-semibold text-gray-800">{leadData.name}</p>
                  <p className="text-sm text-gray-600">{leadData.email}</p>
                  <p className="text-sm text-gray-600">{leadData.jobTitle} at {leadData.company}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scoring Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scoringSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;
            const isProcessingStep = isActive && isProcessing;

            return (
              <div key={step.id} className="relative">
                <Card 
                  className={`transition-all duration-500 transform ${
                    isActive ? 'scale-105 shadow-lg border-blue-400 bg-blue-50' : 
                    isCompleted ? 'border-green-300 bg-green-50' : 
                    'border-gray-200 bg-white opacity-70'
                  }`}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`p-3 rounded-full mx-auto mb-3 w-fit ${
                      isCompleted ? 'bg-green-100' : 
                      isActive ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <Icon className={`h-6 w-6 ${
                          isActive ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-xs text-gray-600 mb-3">{step.description}</p>
                    
                    {(isCompleted || (isActive && !isProcessingStep)) && (
                      <Badge className={`${getScoreColor(step.score)} animate-fade-in`}>
                        {step.score.toUpperCase()}
                      </Badge>
                    )}
                    
                    {isProcessingStep && (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Arrow between steps */}
                {index < scoringSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className={`h-6 w-6 ${
                      currentStep > index ? 'text-green-500' : 
                      currentStep === index ? 'text-blue-500' : 'text-gray-300'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final Result */}
        {currentStep >= scoringSteps.length && (
          <Card className={`border-2 overflow-hidden animate-scale-in ${
            finalScore === 'high' ? 'border-green-400' : 
            finalScore === 'medium' ? 'border-yellow-400' : 'border-red-400'
          }`}>
            <div className={`h-2 bg-gradient-to-r ${getScoreGradient(finalScore)}`}></div>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Target className="h-8 w-8 text-gray-600" />
                <h3 className="text-2xl font-bold text-gray-900">Final Lead Quality Score</h3>
              </div>
              
              <div className="flex items-center justify-center space-x-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Lead Assessment Complete</p>
                  <Badge className={`text-lg px-6 py-2 ${getScoreColor(finalScore)}`}>
                    {finalScore.toUpperCase()} QUALITY LEAD
                  </Badge>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Recommended Action</p>
                  <p className="text-xs text-gray-600">
                    {finalScore === 'high' ? 'Priority follow-up within 24h' :
                     finalScore === 'medium' ? 'Schedule follow-up within 3 days' :
                     'Add to nurture campaign'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Process Benefits */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <h4 className="text-xl font-bold mb-4 text-center">
              Automated Lead Scoring Benefits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">85%</div>
                <p className="text-sm opacity-90">More Accurate Prioritization</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">60%</div>
                <p className="text-sm opacity-90">Faster Lead Qualification</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">40%</div>
                <p className="text-sm opacity-90">Higher Conversion Rates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadScoringIllustration;
