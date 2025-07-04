
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Building, Users, Activity, TrendingUp, Target, Star } from "lucide-react";

interface LeadData {
  id: string;
  name: string;
  email: string;
  emailType: 'corporate' | 'personal' | 'abusive';
  company: string;
  industry: string;
  employees: string;
  jobTitle: string;
  seniority: string;
  engagement: 'high' | 'medium' | 'low';
  overallScore: 'high' | 'medium' | 'low';
  points: number;
}

const LeadScoringIllustration = () => {
  const [selectedLead, setSelectedLead] = useState<string>('lead1');
  const [animationStep, setAnimationStep] = useState(0);

  const sampleLeads: LeadData[] = [
    {
      id: 'lead1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      emailType: 'corporate',
      company: 'TechCorp Inc.',
      industry: 'Technology',
      employees: '500-1000',
      jobTitle: 'VP of Marketing',
      seniority: 'Senior',
      engagement: 'high',
      overallScore: 'high',
      points: 85
    },
    {
      id: 'lead2',
      name: 'Mike Chen',
      email: 'mikechen@gmail.com',
      emailType: 'personal',
      company: 'Small Business',
      industry: 'Retail',
      employees: '10-50',
      jobTitle: 'Owner',
      seniority: 'Senior',
      engagement: 'medium',
      overallScore: 'medium',
      points: 55
    },
    {
      id: 'lead3',
      name: 'Anonymous User',
      email: 'temp123@10minutemail.com',
      emailType: 'abusive',
      company: 'Unknown',
      industry: 'Unknown',
      employees: 'Unknown',
      jobTitle: 'Unknown',
      seniority: 'Unknown',
      engagement: 'low',
      overallScore: 'low',
      points: 15
    }
  ];

  const scoringCriteria = [
    {
      icon: Mail,
      title: 'Email Domain',
      description: 'Corporate vs Personal vs Abusive',
      color: 'blue'
    },
    {
      icon: Building,
      title: 'Firmography',
      description: 'Company size, industry, revenue',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Demographics',
      description: 'Job title, seniority, department',
      color: 'purple'
    },
    {
      icon: Activity,
      title: 'Activity Score',
      description: 'Engagement, interactions, behavior',
      color: 'orange'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score: 'high' | 'medium' | 'low') => {
    switch (score) {
      case 'high': return 'bg-green-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-red-500 text-white';
    }
  };

  const getScoreGradient = (score: 'high' | 'medium' | 'low') => {
    switch (score) {
      case 'high': return 'from-green-400 to-green-600';
      case 'medium': return 'from-yellow-400 to-yellow-600';
      case 'low': return 'from-red-400 to-red-600';
    }
  };

  const selectedLeadData = sampleLeads.find(lead => lead.id === selectedLead) || sampleLeads[0];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <Target className="h-8 w-8 mr-3 text-blue-600" />
          Lead Scoring Impact Visualization
        </h2>
        <p className="text-gray-600 text-lg">Transform raw leads into qualified prospects with intelligent scoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scoring Criteria */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Scoring Criteria
          </h3>
          <div className="space-y-3">
            {scoringCriteria.map((criteria, index) => {
              const Icon = criteria.icon;
              const isActive = animationStep === index;
              return (
                <Card 
                  key={criteria.title}
                  className={`transition-all duration-500 transform ${
                    isActive ? 'scale-105 shadow-lg border-blue-300' : 'scale-100 shadow-sm'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${criteria.color}-100`}>
                        <Icon className={`h-5 w-5 text-${criteria.color}-600`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{criteria.title}</h4>
                        <p className="text-sm text-gray-600">{criteria.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Lead Examples */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            Lead Scoring Results
          </h3>
          
          {/* Lead Selection */}
          <div className="flex space-x-2 mb-6">
            {sampleLeads.map((lead) => (
              <button
                key={lead.id}
                onClick={() => setSelectedLead(lead.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLead === lead.id
                    ? `${getScoreColor(lead.overallScore)} shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {lead.name}
              </button>
            ))}
          </div>

          {/* Selected Lead Details */}
          <Card className="mb-6 overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${getScoreGradient(selectedLeadData.overallScore)}`}></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedLeadData.name}</h4>
                  <p className="text-gray-600">{selectedLeadData.email}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${getScoreColor(selectedLeadData.overallScore)} font-bold text-lg`}>
                    {selectedLeadData.points}/100
                  </div>
                  <p className="text-sm text-gray-600 mt-1 capitalize">{selectedLeadData.overallScore} Quality Lead</p>
                </div>
              </div>

              {/* Scoring Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Email Type</p>
                  <Badge className={`mt-1 ${getScoreColor(selectedLeadData.emailType === 'corporate' ? 'high' : selectedLeadData.emailType === 'personal' ? 'medium' : 'low')}`}>
                    {selectedLeadData.emailType}
                  </Badge>
                </div>

                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Building className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Company</p>
                  <p className="text-xs text-gray-600 mt-1">{selectedLeadData.company}</p>
                  <p className="text-xs text-gray-500">{selectedLeadData.employees} employees</p>
                </div>

                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Role</p>
                  <p className="text-xs text-gray-600 mt-1">{selectedLeadData.jobTitle}</p>
                  <Badge variant="outline" className="mt-1 text-xs">{selectedLeadData.seniority}</Badge>
                </div>

                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <Activity className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Engagement</p>
                  <Badge className={`mt-1 ${getScoreColor(selectedLeadData.engagement)}`}>
                    {selectedLeadData.engagement}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Visualization */}
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                Lead Scoring Impact
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">3x</div>
                  <p className="text-sm opacity-90">Higher Conversion Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50%</div>
                  <p className="text-sm opacity-90">Faster Sales Cycle</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">75%</div>
                  <p className="text-sm opacity-90">Time Saved on Qualifying</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadScoringIllustration;
