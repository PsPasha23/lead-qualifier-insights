
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Mail, Target, HelpCircle, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import FilterSelector from "../FilterSelector";
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

  const filterOptions = [
    { id: 'region', label: 'Region', type: 'multiselect' as const, options: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Africa', 'India'] },
    { id: 'companySize', label: 'Company Size', type: 'select' as const, options: ['< 20', '20-200', '> 200', '500+', '1000+'] },
    { id: 'fundingRaised', label: 'Funding Raised', type: 'range' as const },
    { id: 'foundedYear', label: 'Founded Year', type: 'range' as const },
    { id: 'lastActivity', label: 'Last Activity', type: 'select' as const, options: ['< 7 days', '< 30 days', '< 90 days', '> 90 days'] },
    { id: 'userRole', label: 'Role of User', type: 'multiselect' as const, options: ['CEO', 'CTO', 'VP', 'Director', 'Manager', 'Developer', 'Designer', 'Marketing'] }
  ];

  const handleAddFilter = (filterId: string) => {
    const filterOption = filterOptions.find(f => f.id === filterId);
    if (filterOption) {
      const newFilter: FilterData = {
        ...filterOption,
        rules: [{
          id: `${filterId}-rule-1`,
          value: filterOption.type === 'multiselect' ? [] : filterOption.type === 'range' ? { min: '', max: '' } : '',
          score: [5]
        }]
      };
      onFitCriteriaChange([...fitCriteria, newFilter]);
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    onFitCriteriaChange(fitCriteria.filter(f => f.id !== filterId));
  };

  const handleAddRule = (filterId: string) => {
    const filter = fitCriteria.find(f => f.id === filterId);
    if (filter) {
      const newRule = {
        id: `${filterId}-rule-${Date.now()}`,
        value: filter.type === 'multiselect' ? [] : filter.type === 'range' ? { min: '', max: '' } : '',
        score: [5]
      };
      const updatedFilter = {
        ...filter,
        rules: [...filter.rules, newRule]
      };
      onFitCriteriaChange(fitCriteria.map(f => f.id === filterId ? updatedFilter : f));
    }
  };

  const handleRemoveRule = (filterId: string, ruleId: string) => {
    const filter = fitCriteria.find(f => f.id === filterId);
    if (filter && filter.rules.length > 1) {
      const updatedFilter = {
        ...filter,
        rules: filter.rules.filter(r => r.id !== ruleId)
      };
      onFitCriteriaChange(fitCriteria.map(f => f.id === filterId ? updatedFilter : f));
    }
  };

  const handleRuleValueChange = (filterId: string, ruleId: string, newValue: any) => {
    const filter = fitCriteria.find(f => f.id === filterId);
    if (filter) {
      const updatedRules = filter.rules.map(rule => 
        rule.id === ruleId ? { ...rule, value: newValue } : rule
      );
      const updatedFilter = { ...filter, rules: updatedRules };
      onFitCriteriaChange(fitCriteria.map(f => f.id === filterId ? updatedFilter : f));
    }
  };

  const handleRuleScoreChange = (filterId: string, ruleId: string, score: number[]) => {
    const filter = fitCriteria.find(f => f.id === filterId);
    if (filter) {
      const updatedRules = filter.rules.map(rule => 
        rule.id === ruleId ? { ...rule, score } : rule
      );
      const updatedFilter = { ...filter, rules: updatedRules };
      onFitCriteriaChange(fitCriteria.map(f => f.id === filterId ? updatedFilter : f));
    }
  };

  const renderRuleValue = (filter: FilterData, rule: any) => {
    if (filter.type === 'range') {
      return `is between ${rule.value?.min || ''} to ${rule.value?.max || ''}`;
    } else if (filter.type === 'multiselect') {
      return rule.value?.length > 0 ? rule.value.join(', ') : 'Select values';
    } else {
      return rule.value || 'Select value';
    }
  };

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

      {/* Fit Criteria - Updated Design */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Fit Criteria</CardTitle>
              <CardDescription className="text-sm">
                Define rules with OR logic. Each property can have multiple conditions.
              </CardDescription>
            </div>
            <FilterSelector 
              availableFilters={filterOptions}
              onFilterAdd={handleAddFilter}
              usedFilters={fitCriteria.map(f => f.id)}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {fitCriteria.map((filter) => (
            <div key={filter.id} className="space-y-3">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{filter.label}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFilter(filter.id)}
                    className="h-4 w-4 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Importance</span>
                </div>
              </div>

              {/* Filter Rules */}
              <div className="space-y-2">
                {filter.rules.map((rule, index) => (
                  <div key={rule.id}>
                    {index > 0 && (
                      <div className="flex justify-center my-1">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">or</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center space-x-2 flex-1">
                        <span className="text-sm text-gray-700 min-w-0">
                          {renderRuleValue(filter, rule)}
                        </span>
                        {filter.rules.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRule(filter.id, rule.id)}
                            className="h-4 w-4 p-0 text-gray-400 hover:text-gray-600 flex-shrink-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 ml-4">
                        <div className="w-24">
                          <Slider
                            value={rule.score || [5]}
                            onValueChange={(score) => handleRuleScoreChange(filter.id, rule.id, score)}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-700">
                            {rule.score?.[0] || 5}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Rule Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAddRule(filter.id)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 h-auto"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add more values
              </Button>
            </div>
          ))}

          {fitCriteria.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-2">No fit criteria added yet.</p>
              <p className="text-xs text-gray-400">Click "Add Filter" to define your ICP rules.</p>
            </div>
          )}

          {/* Add Criteria Button */}
          {fitCriteria.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <FilterSelector 
                availableFilters={filterOptions}
                onFilterAdd={handleAddFilter}
                usedFilters={fitCriteria.map(f => f.id)}
                buttonText="Add criteria"
                buttonVariant="outline"
                buttonIcon={Plus}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ICPDefinitionStepV2;
