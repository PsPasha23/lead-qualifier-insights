
import ICPEducationSection from "./ICPEducationSection";
import ICPTypeSelector from "./ICPTypeSelector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Mail, Target, X, Plus, Users, Building } from "lucide-react";
import { useState } from "react";

interface EmailScoring {
  business: string;
  personal: string;
  abusive: string;
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
  const [showFoundedYear, setShowFoundedYear] = useState(!!fitCriteria.foundedYear);

  const getScoreBadge = (score: string) => {
    const colors = {
      high: "bg-green-100 text-green-800 border-green-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-red-100 text-red-800 border-red-200"
    };
    return <Badge className={`${colors[score as keyof typeof colors]} border`}>{score.toUpperCase()}</Badge>;
  };

  const handleAddFoundedYear = () => {
    setShowFoundedYear(true);
    const newCriteria = {
      ...fitCriteria,
      foundedYear: {
        operator: "is between",
        minYear: "",
        maxYear: "",
        importance: [50]
      }
    };
    onFitCriteriaChange(newCriteria);
  };

  const handleRemoveFoundedYear = () => {
    setShowFoundedYear(false);
    const newCriteria = {
      ...fitCriteria,
      foundedYear: null
    };
    onFitCriteriaChange(newCriteria);
  };

  const handleFoundedYearChange = (field: string, value: string | number[]) => {
    if (fitCriteria.foundedYear) {
      const newCriteria = {
        ...fitCriteria,
        foundedYear: {
          ...fitCriteria.foundedYear,
          [field]: value
        }
      };
      onFitCriteriaChange(newCriteria);
    }
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
            <Card className="border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <CardTitle className="flex items-center text-blue-900 text-lg">
                  <Users className="h-5 w-5 mr-3 text-blue-600" />
                  User-Based ICP Criteria
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Configure scoring based on individual user characteristics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Email Type Scoring */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-blue-600" />
                    Email Type Scoring
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="space-y-1">
                          <div className="font-semibold text-green-900">Corporate Email Domains</div>
                          <p className="text-sm text-green-700">company.com, organization.org</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getScoreBadge("high")}
                        </div>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        ✓ Automatically set to HIGH - Default
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="space-y-1">
                          <div className="font-semibold text-yellow-900">Personal Email Domains</div>
                          <p className="text-sm text-yellow-700">Gmail, Yahoo, Outlook, etc.</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Select value={emailScoring.personal} onValueChange={(value) => onEmailScoringChange('personal', value)}>
                            <SelectTrigger className="w-32 border-yellow-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="space-y-1">
                          <div className="font-semibold text-red-900">Abusive/Invalid Domains</div>
                          <p className="text-sm text-red-700">Disposable or flagged domains</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Select value={emailScoring.abusive} onValueChange={(value) => onEmailScoringChange('abusive', value)}>
                            <SelectTrigger className="w-32 border-red-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional User Criteria */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Additional User Criteria</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>• Region (Coming Soon)</div>
                    <div>• Role/Title (Coming Soon)</div>
                    <div>• Employer Size (Coming Soon)</div>
                    <div>• Employer Revenue (Coming Soon)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {icpType === 'company' && (
            <Card className="border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                <CardTitle className="flex items-center text-purple-900 text-lg">
                  <Building className="h-5 w-5 mr-3 text-purple-600" />
                  Company-Based ICP Criteria
                </CardTitle>
                <CardDescription className="text-purple-700">
                  Configure scoring based on company firmographic data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Founded Year Criteria */}
                {showFoundedYear && fitCriteria.foundedYear && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700">Founded year</div>
                      <div className="text-sm text-gray-500">Importance</div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className="border-blue-300 text-blue-700 bg-blue-50 px-3 py-1"
                      >
                        {fitCriteria.foundedYear.operator}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-2 text-blue-700 hover:text-blue-900"
                          onClick={handleRemoveFoundedYear}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                      
                      <div className="flex-1">
                        <Slider
                          value={fitCriteria.foundedYear.importance}
                          onValueChange={(value) => handleFoundedYearChange('importance', value)}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Select 
                          value={fitCriteria.foundedYear.operator} 
                          onValueChange={(value) => handleFoundedYearChange('operator', value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="is between">is between</SelectItem>
                            <SelectItem value="is greater than">is greater than</SelectItem>
                            <SelectItem value="is less than">is less than</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="min year"
                            value={fitCriteria.foundedYear.minYear}
                            onChange={(e) => handleFoundedYearChange('minYear', e.target.value)}
                            className="w-24"
                          />
                          <span className="text-gray-500">-</span>
                          <Input
                            placeholder="max year"
                            value={fitCriteria.foundedYear.maxYear}
                            onChange={(e) => handleFoundedYearChange('maxYear', e.target.value)}
                            className="w-24"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={handleRemoveFoundedYear}>
                          Cancel
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add Criteria Button */}
                {!showFoundedYear && (
                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-300 text-purple-700"
                      onClick={handleAddFoundedYear}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Founded Year Criteria
                    </Button>
                  </div>
                )}

                {/* Additional Company Criteria */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Additional Company Criteria</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>• Industry (Coming Soon)</div>
                    <div>• Company Size (Coming Soon)</div>
                    <div>• Funding Status (Coming Soon)</div>
                    <div>• Revenue Bands (Coming Soon)</div>
                    <div>• Location (Coming Soon)</div>
                    <div>• Technology Stack (Coming Soon)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default EnhancedICPDefinitionStep;
