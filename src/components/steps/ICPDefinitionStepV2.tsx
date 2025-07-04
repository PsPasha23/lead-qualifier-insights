
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Mail, Target, HelpCircle, TrendingUp } from "lucide-react";
import { EmailScoring, FilterData } from "../../pages/LeadQualitySetup";
import LeadScoringIllustration from "../LeadScoringIllustration";

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

      {/* Lead Scoring Illustration */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-gray-800">Advanced Lead Scoring Preview</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            See how comprehensive lead scoring works across multiple criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <LeadScoringIllustration />
        </CardContent>
      </Card>
    </div>
  );
};

export default ICPDefinitionStepV2;
