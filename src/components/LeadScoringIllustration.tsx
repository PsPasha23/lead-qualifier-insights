
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
        }, 1000);
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
        }, 4000);
      }
    }, 2500);

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
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header - Reduced size */}
      <div className="text-center mb-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center justify-center">
          <Target className="h-6 w-6 mr-2 text-blue-600" />
          Lead Scoring in Action
        </h2>
        <p className="text-gray-600 text-sm">Raw data transforms into sales insights</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Visual Lead Entry System - Compact */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {/* Lead Entry Visualization - Simplified */}
              <div className="flex-1">
                <div className="flex items-center justify-center space-x-4 mb-3">
                  {/* Lead Visual */}
                  <div className="relative">
                    {leadEntering && (
                      <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 animate-slide-in-right">
                        <div className="flex items-center space-x-1 p-1 bg-white rounded-full border border-green-400 shadow-md">
                          <UserPlus className="h-3 w-3 text-green-600" />
                          <span className="text-xs font-medium text-green-700">New</span>
                        </div>
                      </div>
                    )}
                    
                    <div className={`transition-all duration-500 ${
                      leadVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                      <div className="p-2 bg-white rounded-full border-2 border-green-300 relative">
                        <User className="h-6 w-6 text-green-600" />
                        {leadVisible && (
                          <div className="absolute -top-1 -right-1 animate-bounce">
                            <div className="w-3 h-3 bg-green-500 rounded-full border border-white flex items-center justify-center">
                              <CheckCircle className="h-2 w-2 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className={`h-5 w-5 text-blue-500 transition-all duration-500 ${
                    leadEntering ? 'animate-pulse text-green-500' : ''
                  }`} />

                  <div className="w-16 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded border border-blue-300 flex items-center justify-center">
                    <div className="text-xs font-semibold text-blue-700">SYSTEM</div>
                  </div>
                </div>
                
                {/* Raw Data Cards - Compact */}
                {leadVisible && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-white rounded border shadow-sm animate-fade-in">
                      <Mail className="h-3 w-3 text-gray-500 mb-1" />
                      <p className="text-xs text-gray-600 truncate">{leadData.email}</p>
                    </div>
                    <div className="p-2 bg-white rounded border shadow-sm animate-fade-in">
                      <Building className="h-3 w-3 text-gray-500 mb-1" />
                      <p className="text-xs text-gray-600 truncate">{leadData.company}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Instant Processing Badge - Compact */}
              <div className="ml-4 p-3 bg-white rounded border-2 border-green-200 shadow-sm">
                <div className="flex items-center space-x-1 mb-1">
                  <Zap className="h-4 w-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-800">Instant</span>
                </div>
                <p className="text-xs text-green-700">Saves 15min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scoring Steps - Compact Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {scoringSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;
            const isProcessingStep = isActive && isProcessing;

            return (
              <Card 
                key={step.id}
                className={`transition-all duration-500 ${
                  isActive ? 'scale-105 shadow-md border-blue-400 bg-blue-50' : 
                  isCompleted ? 'border-green-300 bg-green-50' : 
                  'border-gray-200 bg-white opacity-70'
                }`}
              >
                <CardContent className="p-3 text-center">
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

        {/* Final Result - Properly Sized */}
        {currentStep >= scoringSteps.length && (
          <Card className={`border-2 animate-scale-in ${
            finalScore === 'high' ? 'border-green-400' : 
            finalScore === 'medium' ? 'border-yellow-400' : 'border-red-400'
          }`}>
            <div className={`h-1 bg-gradient-to-r ${getScoreGradient(finalScore)}`}></div>
            <CardContent className="p-4">
              {/* Lead Profile Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{leadData.name}</h3>
                      <p className="text-xs text-gray-600">{leadData.jobTitle}</p>
                    </div>
                  </div>
                  <Badge className={`text-sm px-3 py-1 ${getScoreColor(finalScore)}`}>
                    {finalScore.toUpperCase()}
                  </Badge>
                </div>
                
                {/* Compact Scoring Breakdown */}
                <div className="grid grid-cols-4 gap-2">
                  {scoringSteps.map((step) => (
                    <div key={step.id} className="text-center p-2 bg-white rounded border">
                      <step.icon className="h-3 w-3 mx-auto mb-1 text-gray-600" />
                      <Badge className={`text-xs ${getScoreColor(step.score)}`}>
                        {step.score.charAt(0).toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two Column Layout for Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left: Assessment Details */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                    <Award className="h-4 w-4 mr-1 text-blue-600" />
                    Assessment Results
                  </h4>
                  
                  {/* ICP Match */}
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-green-900">ICP Match</p>
                      <Badge className="bg-green-600 text-white text-xs">98%</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        <span className="text-green-800">Enterprise</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        <span className="text-green-800">C-level</span>
                      </div>
                    </div>
                  </div>

                  {/* Engagement */}
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-blue-900">Engagement</p>
                      <Badge className="bg-blue-600 text-white text-xs">High</Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-blue-800">Sessions</span>
                        <span className="text-blue-600 font-medium">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-800">Downloads</span>
                        <span className="text-blue-600 font-medium">2</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Business Impact */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                    <Zap className="h-4 w-4 mr-1 text-green-600" />
                    Business Impact
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded border border-green-200">
                      <div className="text-lg font-bold text-green-700">94%</div>
                      <p className="text-xs text-green-600">Conversion</p>
                    </div>
                    
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded border border-blue-200">
                      <div className="text-lg font-bold text-blue-700">$52K</div>
                      <p className="text-xs text-blue-600">Deal Value</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-purple-50 rounded border border-purple-200">
                      <div className="text-sm font-bold text-purple-700">45min</div>
                      <p className="text-xs text-purple-600">Response</p>
                    </div>
                    
                    <div className="text-center p-2 bg-orange-50 rounded border border-orange-200">
                      <div className="text-sm font-bold text-orange-700">90d</div>
                      <p className="text-xs text-orange-600">Cycle</p>
                    </div>
                  </div>

                  {/* Time Saved */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded p-3 text-white text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Award className="h-3 w-3" />
                      <span className="text-xs font-semibold">Time Saved</span>
                    </div>
                    <div className="text-lg font-bold">22 Min</div>
                    <p className="text-xs opacity-90">Auto qualification</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LeadScoringIllustration;
