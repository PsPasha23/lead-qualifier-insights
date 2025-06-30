
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Mail, Target, HelpCircle, Clock } from "lucide-react";
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
  const [isICPEducationOpen, setIsICPEducationOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* ICP Education Section */}
      <Card className="border-blue-200 bg-blue-50">
        <Collapsible open={isICPEducationOpen} onOpenChange={setIsICPEducationOpen}>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-base text-blue-900">What is ICP?</CardTitle>
                </div>
                {isICPEducationOpen ? (
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
                An Ideal Customer Profile (ICP) represents the characteristics of a company or individual that's most likely to become a high-value customer. Use filters like region, company size, and user roles to define your ICP and assign scores to different attributes.
              </p>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Target Display */}
      {businessType && (
        <div className="flex items-center space-x-3">
          <Target className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Target:</span>
          <Badge variant="outline" className={businessType === 'B2B' ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-green-50 text-green-700 border-green-300'}>
            {businessType === 'B2B' ? '🎯 Accounts' : '👤 Users'}
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

      {/* Fit Criteria - Coming Soon */}
      <Card className="border border-gray-200 bg-gray-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base text-gray-600">Fit Criteria</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Define rules with OR logic. Each property can have multiple conditions.
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
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Advanced Fit Criteria</h3>
            <p className="text-sm text-gray-500 mb-4">
              Define custom rules based on company size, region, funding, and more to identify your ideal customers.
            </p>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-left max-w-md mx-auto">
              <div className="space-y-2 text-xs text-gray-500">
                <div>• Company Size: 20-200 employees</div>
                <div>• Region: North America, Europe</div>
                <div>• Funding Raised: $1M - $10M</div>
                <div>• User Role: CEO, CTO, VP</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ICPDefinitionStepV2;
