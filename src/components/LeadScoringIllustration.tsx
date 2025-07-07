
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
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <Target className="h-8 w-8 mr-3 text-blue-600" />
          Intelligent Lead Scoring in Action
        </h2>
        <p className="text-gray-600 text-lg">See how raw lead data transforms into actionable sales insights</p>
      </div>

      {/* Process Flow */}
      <div className="space-y-6">
        {/* Visual Lead Entry System */}
        <div className="relative">
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {/* Lead Entry Visualization */}
                <div className="flex-1">
                  {/* Visual System Entry Point */}
                  <div className="relative mb-6">
                    <div className="flex items-center justify-center space-x-8">
                      {/* Lead Visual Representation - On the left */}
                      <div className="relative">
                        {/* Lead entering animation */}
                        {leadEntering && (
                          <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 animate-slide-in-right">
                            <div className="flex items-center space-x-2 p-2 bg-white rounded-full border-2 border-green-400 shadow-lg">
                              <UserPlus className="h-4 w-4 text-green-600" />
                              <span className="text-xs font-medium text-green-700">New Lead</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Settled lead representation - Reverted to simple circular design */}
                        <div className={`transition-all duration-500 ${
                          leadVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-full border-2 border-green-300 relative">
                            <User className="h-8 w-8 text-green-600" />
                            
                            {/* Success indicator */}
                            {leadVisible && (
                              <div className="absolute -top-1 -right-1 animate-bounce">
                                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                  <CheckCircle className="h-2 w-2 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Entry Animation Arrow */}
                      <div className="flex items-center">
                        <ArrowRight className={`h-6 w-6 text-blue-500 transition-all duration-500 ${
                          leadEntering ? 'animate-pulse text-green-500' : ''
                        }`} />
                      </div>

                      {/* System/Website Visual - On the right */}
                      <div className="relative">
                        <div className="w-24 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300 flex items-center justify-center">
                          <div className="text-xs font-semibold text-blue-700">YOUR SYSTEM</div>
                        </div>
                        
                        {/* Entry Door/Portal */}
                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-8 bg-blue-400 rounded-l-lg border-2 border-blue-500 flex items-center justify-center">
                            <ArrowRight className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Entry Process Description */}
                    <div className="text-center mt-4">
                      <div className="flex items-center justify-center space-x-2">
                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          leadEntering ? 'bg-yellow-400 animate-pulse' : leadVisible ? 'bg-green-400' : 'bg-gray-300'
                        }`}></div>
                        <span className="text-sm font-medium text-gray-700">
                          {leadEntering ? 'Lead Entering...' : leadVisible ? 'Lead Captured' : 'Waiting for Lead'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Raw Data Cards - Now showing after entry */}
                  {leadVisible && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-white rounded-lg border shadow-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
                        <Mail className="h-4 w-4 text-gray-500 mb-1" />
                        <p className="text-xs text-gray-600 truncate">{leadData.email}</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border shadow-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
                        <Building className="h-4 w-4 text-gray-500 mb-1" />
                        <p className="text-xs text-gray-600 truncate">{leadData.company}</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border shadow-sm animate-fade-in" style={{animationDelay: '0.3s'}}>
                        <Users className="h-4 w-4 text-gray-500 mb-1" />
                        <p className="text-xs text-gray-600 truncate">{leadData.jobTitle}</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border shadow-sm animate-fade-in" style={{animationDelay: '0.4s'}}>
                        <Activity className="h-4 w-4 text-gray-500 mb-1" />
                        <p className="text-xs text-gray-600">Active User</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Benefit Highlight */}
                <div className="ml-6 p-4 bg-white rounded-lg border-2 border-green-200 shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Instant Processing</span>
                  </div>
                  <p className="text-xs text-green-700">No manual review needed</p>
                  <p className="text-xs text-green-700">Saves 15+ minutes per lead</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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

                    {/* User Benefit Tooltip */}
                    {isCompleted && (
                      <div className="mt-2 p-2 bg-white rounded border text-xs text-gray-600">
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        {index === 0 && "Email quality verified"}
                        {index === 1 && "Company size confirmed"}
                        {index === 2 && "Decision maker identified"}
                        {index === 3 && "Engagement level assessed"}
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

        {/* Enhanced Final Result with Updated Lead Scoring Assessment */}
        {currentStep >= scoringSteps.length && (
          <Card className={`border-2 overflow-hidden animate-scale-in ${
            finalScore === 'high' ? 'border-green-400' : 
            finalScore === 'medium' ? 'border-yellow-400' : 'border-red-400'
          }`}>
            <div className={`h-2 bg-gradient-to-r ${getScoreGradient(finalScore)}`}></div>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Lead Profile Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{leadData.name}</h3>
                        <p className="text-gray-600">{leadData.jobTitle} at {leadData.company}</p>
                      </div>
                    </div>
                    <Badge className={`text-lg px-4 py-2 ${getScoreColor(finalScore)}`}>
                      {finalScore.toUpperCase()} QUALITY
                    </Badge>
                  </div>
                  
                  {/* Scoring Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {scoringSteps.map((step, index) => (
                      <div key={step.id} className="text-center p-3 bg-white rounded-lg border">
                        <step.icon className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                        <p className="text-xs font-medium text-gray-700 mb-1">{step.title}</p>
                        <Badge className={`text-xs ${getScoreColor(step.score)}`}>
                          {step.score.toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assessment Results Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Key Insights */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-blue-600" />
                      Lead Assessment Summary
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-green-900">Perfect ICP Match</p>
                          <p className="text-xs text-green-700">Senior executive at enterprise tech company with corporate email</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">High Conversion Potential</p>
                          <p className="text-xs text-blue-700">92% match with your best customers - VP level with active engagement</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <Target className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-purple-900">Immediate Action Required</p>
                          <p className="text-xs text-purple-700">High-value prospect - assign to senior sales rep within 1 hour</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Impact */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-green-600" />
                      Business Impact
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-700">92%</div>
                        <p className="text-xs text-green-600 font-medium">Conversion Likelihood</p>
                      </div>
                      
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-700">$45K</div>
                        <p className="text-xs text-blue-600 font-medium">Estimated Deal Size</p>
                      </div>
                      
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <div className="text-2xl font-bold text-purple-700">1 Hour</div>
                        <p className="text-xs text-purple-600 font-medium">Response SLA</p>
                      </div>
                      
                      <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                        <div className="text-2xl font-bold text-orange-700">High</div>
                        <p className="text-xs text-orange-600 font-medium">Priority Level</p>
                      </div>
                    </div>

                    {/* Time Savings */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium opacity-90">Time Saved on Qualification</p>
                          <p className="text-2xl font-bold">18 Minutes</p>
                        </div>
                        <Clock className="h-8 w-8 opacity-80" />
                      </div>
                    </div>
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
