
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Mail, Target, X, Plus } from "lucide-react";
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

interface ICPDefinitionStepProps {
  emailScoring: EmailScoring;
  onEmailScoringChange: (type: keyof EmailScoring, value: string) => void;
  fitCriteria: FitCriteria;
  onFitCriteriaChange: (criteria: FitCriteria) => void;
}

const ICPDefinitionStep = ({ 
  emailScoring, 
  onEmailScoringChange, 
  fitCriteria, 
  onFitCriteriaChange 
}: ICPDefinitionStepProps) => {
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
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Define Your Ideal Customer Profile</h3>
        <p className="text-gray-600">Set scoring criteria and filters to identify your best leads.</p>
      </div>

      {/* Email Type Scoring */}
      <Card className="border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <CardTitle className="flex items-center text-blue-900 text-lg">
            <Mail className="h-5 w-5 mr-3 text-blue-600" />
            Email Type Scoring
          </CardTitle>
          <CardDescription className="text-blue-700">
            Score leads based on their email domain type
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
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
        </CardContent>
      </Card>

      <Separator />

      {/* Fit Criteria */}
      <Card className="border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
          <CardTitle className="flex items-center text-purple-900 text-lg">
            <Target className="h-5 w-5 mr-3 text-purple-600" />
            Fit Criteria
          </CardTitle>
          <CardDescription className="text-purple-700">
            Add firmographic or demographic rules that define member fit criteria that you want to use in <span className="bg-yellow-200 px-1 rounded">scoring</span>
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
            <Button 
              variant="outline" 
              size="sm" 
              className="border-purple-300 text-purple-700"
              onClick={handleAddFoundedYear}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Founded Year
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ICPDefinitionStep;
