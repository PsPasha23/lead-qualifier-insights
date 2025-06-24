
import ICPEducationSection from "./ICPEducationSection";
import ICPTypeSelector from "./ICPTypeSelector";
import FilterSelector from "../FilterSelector";
import FilterConfig from "../FilterConfig";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Users, Building } from "lucide-react";
import { useState } from "react";

interface EmailScoring {
  business: string;
  personal: string;
  abusive: string;
}

interface FilterData {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'text';
  options?: string[];
  value?: any;
  importance: number[];
}

interface FitCriteria {
  foundedYear: {
    operator: string;
    minYear: string;
    maxYear: string;
    importance: number[];
  } | null;
}

interface EnhancedICPDefinitionStepProps {
  icpType: 'user' | 'company' | null;
  onICPTypeChange: (type: 'user' | 'company') => void;
  emailScoring: EmailScoring;
  onEmailScoringChange: (type: keyof EmailScoring, value: string) => void;
  fitCriteria: FitCriteria;
  onFitCriteriaChange: (criteria: FitCriteria) => void;
}

const EnhancedICPDefinitionStep = ({ 
  icpType,
  onICPTypeChange,
  emailScoring, 
  onEmailScoringChange, 
  fitCriteria, 
  onFitCriteriaChange 
}: EnhancedICPDefinitionStepProps) => {
  const [userFilters, setUserFilters] = useState<FilterData[]>([]);
  const [companyFilters, setCompanyFilters] = useState<FilterData[]>([]);

  const userFilterOptions = [
    { id: 'region', label: 'Region', type: 'multiselect' as const, options: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Africa'] },
    { id: 'role', label: 'Role/Title', type: 'multiselect' as const, options: ['CEO', 'CTO', 'VP', 'Director', 'Manager', 'Developer', 'Designer'] },
    { id: 'employerSize', label: 'Employer Size', type: 'select' as const, options: ['1-10', '11-50', '51-200', '201-1000', '1000+'] },
    { id: 'employerRevenue', label: 'Employer Revenue', type: 'range' as const },
    { id: 'seniority', label: 'Seniority Level', type: 'select' as const, options: ['Entry', 'Mid', 'Senior', 'Executive'] }
  ];

  const companyFilterOptions = [
    { id: 'industry', label: 'Industry', type: 'multiselect' as const, options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing'] },
    { id: 'companySize', label: 'Company Size', type: 'select' as const, options: ['1-10', '11-50', 'scaleup-200', '201-1000', '1000+'] },
    { id: 'fundingStatus', label: 'Funding Status', type: 'multiselect' as const, options: ['Bootstrapped', 'Seed', 'Series A', 'Series B', 'Series C+', 'IPO'] },
    { id: 'revenue', label: 'Revenue', type: 'range' as const },
    { id: 'location', label: 'Location', type: 'multiselect' as const, options: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Africa'] },
    { id: 'techStack', label: 'Technology Stack', type: 'multiselect' as const, options: ['React', 'Node.js', 'Python', 'Java', 'AWS', 'Azure', 'GCP'] }
  ];

  const getScoreBadge = (score: string) => {
    const colors = {
      high: "bg-green-100 text-green-800 border-green-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-red-100 text-red-800 border-red-200"
    };
    return <Badge className={`${colors[score as keyof typeof colors]} border`}>{score.toUpperCase()}</Badge>;
  };

  const handleAddUserFilter = (filterId: string) => {
    const filterOption = userFilterOptions.find(f => f.id === filterId);
    if (filterOption) {
      const newFilter: FilterData = {
        ...filterOption,
        importance: [50]
      };
      setUserFilters([...userFilters, newFilter]);
    }
  };

  const handleAddCompanyFilter = (filterId: string) => {
    const filterOption = companyFilterOptions.find(f => f.id === filterId);
    if (filterOption) {
      const newFilter: FilterData = {
        ...filterOption,
        importance: [50]
      };
      setCompanyFilters([...companyFilters, newFilter]);
    }
  };

  const handleUpdateUserFilter = (filterId: string, updates: Partial<FilterData>) => {
    setUserFilters(filters => 
      filters.map(f => f.id === filterId ? { ...f, ...updates } : f)
    );
  };

  const handleUpdateCompanyFilter = (filterId: string, updates: Partial<FilterData>) => {
    setCompanyFilters(filters => 
      filters.map(f => f.id === filterId ? { ...f, ...updates } : f)
    );
  };

  const handleRemoveUserFilter = (filterId: string) => {
    setUserFilters(filters => filters.filter(f => f.id !== filterId));
  };

  const handleRemoveCompanyFilter = (filterId: string) => {
    setCompanyFilters(filters => filters.filter(f => f.id !== filterId));
  };

  return (
    <div className="space-y-8">
      {/* Educational Section */}
      <ICPEducationSection />

      {/* ICP Type Selection */}
      <ICPTypeSelector 
        selectedType={icpType} 
        onTypeChange={onICPTypeChange} 
      />

      {/* ICP Criteria Configuration */}
      {icpType && (
        <>
          <Separator />

          {icpType === 'user' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-lg font-semibold text-blue-900">User-Based ICP Criteria</span>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                  Individual attributes
                </Badge>
              </div>

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
                        <div className="text-sm font-semibold text-green-900">Corporate</div>
                        {getScoreBadge("high")}
                      </div>
                      <p className="text-xs text-green-700">company.com, organization.org</p>
                    </div>

                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-yellow-900">Personal</div>
                        <Select value={emailScoring.personal} onValueChange={(value) => onEmailScoringChange('personal', value)}>
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
                        <div className="text-sm font-semibold text-red-900">Abusive</div>
                        <Select value={emailScoring.abusive} onValueChange={(value) => onEmailScoringChange('abusive', value)}>
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

              {/* User Attribute Filters */}
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Additional User Filters</CardTitle>
                    <FilterSelector 
                      availableFilters={userFilterOptions}
                      onFilterAdd={handleAddUserFilter}
                      usedFilters={userFilters.map(f => f.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userFilters.map((filter) => (
                    <FilterConfig
                      key={filter.id}
                      filter={filter}
                      onFilterUpdate={handleUpdateUserFilter}
                      onFilterRemove={handleRemoveUserFilter}
                    />
                  ))}
                  {userFilters.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No additional filters added yet. Click "Add Filter" to get started.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {icpType === 'company' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  <span className="text-lg font-semibold text-purple-900">Company-Based ICP Criteria</span>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
                  Firmographic data
                </Badge>
              </div>

              {/* Company Attribute Filters */}
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Company Filters</CardTitle>
                    <FilterSelector 
                      availableFilters={companyFilterOptions}
                      onFilterAdd={handleAddCompanyFilter}
                      usedFilters={companyFilters.map(f => f.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {companyFilters.map((filter) => (
                    <FilterConfig
                      key={filter.id}
                      filter={filter}
                      onFilterUpdate={handleUpdateCompanyFilter}
                      onFilterRemove={handleRemoveCompanyFilter}
                    />
                  ))}
                  {companyFilters.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No filters added yet. Click "Add Filter" to get started.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnhancedICPDefinitionStep;
