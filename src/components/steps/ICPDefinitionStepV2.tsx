
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Mail, Target, HelpCircle, Clock, TrendingUp } from "lucide-react";
import { EmailScoring, FilterData } from "../../pages/LeadQualitySetup";

interface ICPDefinitionStepV2Props {
  businessType: 'B2B' | 'B2C' | null;
  emailScoring: EmailScoring;
  onEmailScoringChange: (type: keyof EmailScoring, value: 'high' | 'medium' | 'low') => void;
  fitCriteria: FilterData[];
  onFitCriteriaChange: (criteria: FilterData[]) => void;
}

const ICPDefinitionStepV2 = ({ 
  businessType,
  emailScoring, 
  onEmailScoringChange, 
  fitCriteria, 
  onFitCriteriaChange 
}: ICPDefinitionStepV2Props) => {
  const [isScoringEducationOpen, setIsScoringEducationOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Lead Scoring Education Section */}
      <Card className="border-blue-200 bg-blue-50">
        <Collapsible open={isScoringEducationOpen} onOpenChange={setIsScoringEducationOpen}>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-base text-blue-900">What is Lead Scoring?</CardTitle>
                </div>
                {isScoringEducationOpen ? (
                  <ChevronDown className="h-4 w-4 text-blue-600" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <p className="text-sm text-blue-800">
                Lead scoring is a methodology used to rank prospects based on their likelihood to convert into customers. Assign scores to different attributes like email types, company characteristics, and engagement activities to prioritize your most valuable leads.
              </p>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Target Display */}
      {businessType && (
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Scoring Target:</span>
          <Badge variant="outline" className={businessType === 'B2B' ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-green-50 text-green-700 border-green-300'}>
            {businessType === 'B2B' ? '🎯 Business Accounts' : '👤 Individual Users'}
          </Badge>
        </div>
      )}

      {/* Email Type Scoring */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base">
            <Mail className="h-4 w-4 mr-2 text-blue-600" />
            Email Type Scoring
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Assign scores based on email domain types to identify lead quality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-green-900">Corporate Email</div>
                <Select value={emailScoring.corporate} onValueChange={(value: 'high' | 'medium' | 'low') => onEmailScoringChange('corporate', value)}>
                  <SelectTrigger className="w-20 h-6 text-xs border-green-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-green-700">company.com, organization.org</p>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-yellow-900">Personal Email</div>
                <Select value={emailScoring.personal} onValueChange={(value: 'high' | 'medium' | 'low') => onEmailScoringChange('personal', value)}>
                  <SelectTrigger className="w-20 h-6 text-xs border-yellow-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-yellow-700">Gmail, Yahoo, Outlook</p>
            </div>

            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-red-900">Fake/Abusive Email</div>
                <Select value={emailScoring.abusive} onValueChange={(value: 'high' | 'medium' | 'low') => onEmailScoringChange('abusive', value)}>
                  <SelectTrigger className="w-20 h-6 text-xs border-red-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-red-700">Disposable domains</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Scoring Criteria - Coming Soon */}
      <Card className="border border-gray-200 bg-gray-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base text-gray-600">Advanced Scoring Criteria</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Score your leads based on various criteria such as firmographic data, behavioral activity, and engagement patterns
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Clock className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Comprehensive Lead Scoring</h3>
            <p className="text-sm text-gray-500 mb-6">
              Create sophisticated scoring models using multiple data points to accurately identify your highest-value prospects and optimize your sales funnel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-700 mb-2">📊 Firmographic Scoring</h4>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>• Company Size: 50-500 employees</div>
                  <div>• Industry: Technology, SaaS</div>
                  <div>• Revenue: $10M - $100M</div>
                  <div>• Geographic Location</div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-700 mb-2">🎯 Behavioral Scoring</h4>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>• Website Engagement Time</div>
                  <div>• Content Download Activity</div>
                  <div>• Email Open & Click Rates</div>
                  <div>• Product Trial Usage</div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-700 mb-2">👥 Demographic Scoring</h4>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>• Job Title & Seniority Level</div>
                  <div>• Department & Function</div>
                  <div>• Decision-Making Authority</div>
                  <div>• Years of Experience</div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-700 mb-2">⚡ Activity Scoring</h4>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>• Social Media Engagement</div>
                  <div>• Event Participation</div>
                  <div>• Webinar Attendance</div>
                  <div>• Sales Interaction History</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ICPDefinitionStepV2;
