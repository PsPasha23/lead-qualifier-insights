
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Building, Users, Activity, Target, ArrowRight, User, CheckCircle, TrendingUp, Clock, Zap, Award, ArrowDown, UserPlus } from "lucide-react";

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
  const [leadVisible, setLeadVisible] = useState(false);
  const [leadEntering, setLeadEntering] = useState(false);

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
      title: 'Email Domain',
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
      title: 'Job Role',
      icon: Users,
      description: 'Senior marketing executive',
      score: 'high',
      color: 'purple'
    },
    {
      id: 'activity',
      title: 'Engagement',
      icon: Activity,
      description: 'Active user, multiple touchpoints',
      score: 'medium',
      color: 'orange'
    }
  ];

  const finalScore = 'high';

  useEffect(() => {
    // Start with lead entering animation
    const leadEnterTimer = setTimeout(() => {
      setLeadEntering(true);
    }, 200);

    const leadTimer = setTimeout(() => {
      setLeadVisible(true);
      setLeadEntering(false);
    }, 1200);

    const interval = setInterval(() => {
      if (currentStep < scoringSteps.length) {
        setIsProcessing(true);
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setIsProcessing(false);
        }, 800);
      } else {
        // Reset after showing final result
        setTimeout(() => {
          setCurrentStep(0);
          setLeadVisible(false);
          setLeadEntering(false);
          setTimeout(() => setLeadEntering(true), 200);
          setTimeout(() => {
            setLeadVisible(true);
            setLeadEntering(false);
          }, 1000);
        }, 3000);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(leadTimer);
      clearTimeout(leadEnterTimer);
    };
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
    <div className="w-full h-full max-w-4xl mx-auto p-3 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl overflow-hidden">
      {/* Header - Compact */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center justify-center">
          <Target className="h-5 w-5 mr-2 text-blue-600" />
          Intelligent Lead Scoring
        </h2>
        <p className="text-gray-600 text-xs">See how raw lead data transforms into actionable insights</p>
      </div>

      {/* Process Flow - Compact */}
      <div className="space-y-3 h-full overflow-hidden">
        {/* Visual Lead Entry System - Compact */}
        <div className="relative">
          <Card className="border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                {/* Lead Entry Visualization - Compact */}
                <div className="flex-1">
                  {/* Visual System Entry Point - Compact */}
                  <div className="relative mb-3">
                    <div className="flex items-center justify-center space-x-4">
                      {/* Lead Visual Representation */}
                      <div className="relative">
                        {/* Lead entering animation */}
                        {leadEntering && (
                          <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 animate-slide-in-right">
                            <div className="flex items-center space-x-1 p-1 bg-white rounded-full border border-green-400 shadow-md">
                              <UserPlus className="h-3 w-3 text-green-600" />
                              <span className="text-xs font-medium text-green-700">New Lead</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Settled lead representation */}
                        <div className={`transition-all duration-500 ${
                          leadVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                          <div className="p-2 bg-gradient-to-br from-green-50 to-green-100 rounded-full border border-green-300 relative">
                            <User className="h-5 w-5 text-green-600" />
                            
                            {/* Success indicator */}
                            {leadVisible && (
                              <div className="absolute -top-1 -right-1 animate-bounce">
                                <div className="w-3 h-3 bg-green-500 rounded-full border border-white flex items-center justify-center">
                                  <CheckCircle className="h-1.5 w-1.5 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Entry Animation Arrow */}
                      <div className="flex items-center">
                        <ArrowRight className={`h-4 w-4 text-blue-500 transition-all duration-500 ${
                          leadEntering ? 'animate-pulse text-green-500' : ''
                        }`} />
                      </div>

                      {/* System/Website Visual */}
                      <div className="relative">
                        <div className="w-16 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded border border-blue-300 flex items-center justify-center">
                          <div className="text-xs font-semibold text-blue-700">SYSTEM</div>
                        </div>
                        
                        {/* Entry Door/Portal */}
                        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-6 bg-blue-400 rounded-l border border-blue-500 flex items-center justify-center">
                            <ArrowRight className="h-2 w-2 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Entry Process Description */}
                    <div className="text-center mt-2">
                      <div className="flex items-center justify-center space-x-1">
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          leadEntering ? 'bg-yellow-400 animate-pulse' : leadVisible ? 'bg-green-400' : 'bg-gray-300'
                        }`}></div>
                        <span className="text-xs font-medium text-gray-700">
                          {leadEntering ? 'Lead Entering...' : leadVisible ? 'Lead Captured' : 'Waiting for Lead'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Raw Data Cards - Compact */}
                  {leadVisible && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-white rounded border shadow-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
                        <Mail className="h-3 w-3 text-gray-500 mb-1" />
                        <p className="text-xs text-gray-600 truncate">{leadData.email}</p>
                      </div>
                      <div className="p-2 bg-white rounded border shadow-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
                        <Building className="h-3 w-3 text-gray-500 mb-1" />
                        <p className="text-xs text-gray-600 truncate">{leadData.company}</p>
                      </div>
                      <div className="p-2 bg-white rounded border shadow-sm animate-fade-in" style={{animationDelay: '0.3s'}}>
                        <Users className="h-3 w-3 text-gray-500 mb-1" />
                        <p className="text-xs text-gray-600 truncate">{leadData.jobTitle}</p>
                      </div>
                      <div className="p-2 bg-white rounded border shadow-sm animate-fade-in" style={{animationDelay: '0.4s'}}>
                        <Activity className="h-3 w-3 text-gray-500 mb-1" />
                        <p className="text-xs text-gray-600">Active User</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Benefit Highlight - Compact */}
                <div className="ml-3 p-2 bg-white rounded border border-green-200 shadow-sm">
                  <div className="flex items-center space-x-1 mb-1">
                    <Zap className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-800">Instant Processing</span>
                  </div>
                  <p className="text-xs text-green-700">No manual review</p>
                  <p className="text-xs text-green-700">Saves 15+ minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scoring Steps - Compact Grid */}
        <div className="grid grid-cols-2 gap-2">
          {scoringSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;
            const isProcessingStep = isActive && isProcessing;

            return (
              <Card 
                key={step.id}
                className={`transition-all duration-500 transform ${
                  isActive ? 'scale-105 shadow-md border-blue-400 bg-blue-50' : 
                  isCompleted ? 'border-green-300 bg-green-50' : 
                  'border-gray-200 bg-white opacity-70'
                }`}
              >
                <CardContent className="p-2 text-center">
                  <div className={`p-2 rounded-full mx-auto mb-2 w-fit ${
                    isCompleted ? 'bg-green-100' : 
                    isActive ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Icon className={`h-4 w-4 ${
                        isActive ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-xs text-gray-900 mb-1">{step.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{step.description}</p>
                  
                  {(isCompleted || (isActive && !isProcessingStep)) && (
                    <Badge className={`${getScoreColor(step.score)} text-xs animate-fade-in`}>
                      {step.score.toUpperCase()}
                    </Badge>
                  )}
                  
                  {isProcessingStep && (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Final Result - Compact */}
        {currentStep >= scoringSteps.length && (
          <Card className={`border-2 overflow-hidden animate-scale-in ${
            finalScore === 'high' ? 'border-green-400' : 
            finalScore === 'medium' ? 'border-yellow-400' : 'border-red-400'
          }`}>
            <div className={`h-1 bg-gradient-to-r ${getScoreGradient(finalScore)}`}></div>
            <CardContent className="p-3">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <h3 className="text-sm font-bold text-gray-900">Lead Quality Assessment</h3>
                </div>
                
                <Badge className={`text-sm px-3 py-1 mb-2 ${getScoreColor(finalScore)}`}>
                  {finalScore.toUpperCase()} QUALITY LEAD
                </Badge>
                
                <div className="p-2 bg-green-50 rounded border border-green-200">
                  <p className="text-xs font-medium text-green-800">Priority follow-up within 24 hours</p>
                  <p className="text-xs text-green-600">85% likelihood of conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ROI Summary - Compact */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardContent className="p-3">
            <h4 className="text-sm font-bold mb-2 text-center">Your Lead Scoring ROI</h4>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                <div className="text-lg font-bold">5x</div>
                <p className="text-xs opacity-90">Faster</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">85%</div>
                <p className="text-xs opacity-90">Accurate</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">40%</div>
                <p className="text-xs opacity-90">Higher Conv.</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">60%</div>
                <p className="text-xs opacity-90">Time Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadScoringIllustration;
