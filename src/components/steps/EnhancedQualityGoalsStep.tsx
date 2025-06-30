
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { QualityThresholds } from "../../pages/LeadQualitySetup";
import { Target, TrendingUp, AlertTriangle } from "lucide-react";

interface EnhancedQualityGoalsStepProps {
  qualityThresholds: QualityThresholds;
  onQualityThresholdsChange: (thresholds: QualityThresholds) => void;
}

const EnhancedQualityGoalsStep = ({ qualityThresholds, onQualityThresholdsChange }: EnhancedQualityGoalsStepProps) => {
  const handleThresholdChange = (key: keyof QualityThresholds, value: number) => {
    onQualityThresholdsChange({
      ...qualityThresholds,
      [key]: value
    });
  };

  const applyTemplate = (template: 'conservative' | 'ambitious' | 'aggressive') => {
    const templates = {
      conservative: { goodLead: 90, fairLeadMin: 60, fairLeadMax: 80, poorLead: 50 },
      ambitious: { goodLead: 80, fairLeadMin: 50, fairLeadMax: 70, poorLead: 40 },
      aggressive: { goodLead: 70, fairLeadMin: 40, fairLeadMax: 60, poorLead: 30 }
    };
    onQualityThresholdsChange(templates[template]);
  };

  // Calculate ranges for display
  const excellentRange = `${qualityThresholds.goodLead}% - 100%`;
  const goodRange = `${qualityThresholds.fairLeadMax + 1}% - ${qualityThresholds.goodLead - 1}%`;
  const fairRange = `0% - ${qualityThresholds.fairLeadMax}%`;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Lead Quality Goals</h3>
        <p className="text-gray-600">Set target benchmarks for lead qualification performance and define score ranges.</p>
      </div>

      {/* Main Goal Target */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-blue-900">
            <Target className="h-5 w-5 mr-3 text-blue-600" />
            Primary Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="flex-1">
              <Label className="text-lg font-semibold text-blue-900 mb-3 block">
                Lead Quality Rate Goal (%)
              </Label>
              <div className="flex items-center space-x-4">
                <div className="w-32">
                  <Input
                    type="number"
                    value={qualityThresholds.goodLead}
                    onChange={(e) => handleThresholdChange('goodLead', parseInt(e.target.value) || 70)}
                    min={0}
                    max={100}
                    className="text-2xl font-bold h-14 text-center border-2 border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="text-4xl font-bold text-blue-700">%</div>
              </div>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Target Benchmark</span>
              </div>
              <p className="text-xs text-blue-700">
                Your rate should be higher than this to be growing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Ranges Configuration */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-gray-900">Score Ranges</CardTitle>
          <p className="text-sm text-gray-600">Configure the thresholds for different lead quality levels</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual Range Display */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-green-700">Excellent</span>
              <span className="text-yellow-700">Good</span>
              <span className="text-red-700">Fair</span>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="h-6 w-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-lg relative">
                {/* Markers */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-blue-600 rounded shadow-md"
                  style={{ left: `${qualityThresholds.goodLead}%` }}
                />
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-blue-600 rounded shadow-md"
                  style={{ left: `${qualityThresholds.fairLeadMax}%` }}
                />
              </div>
              
              {/* Value labels */}
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>0%</span>
                <span className="font-medium">{qualityThresholds.fairLeadMax}%</span>
                <span className="font-medium">{qualityThresholds.goodLead}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Range Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Excellent Threshold (Good Lead)
                </Label>
                <div className="flex items-center space-x-3">
                  <Slider
                    value={[qualityThresholds.goodLead]}
                    onValueChange={(value) => handleThresholdChange('goodLead', value[0])}
                    min={qualityThresholds.fairLeadMax + 1}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <div className="w-16">
                    <Input
                      type="number"
                      value={qualityThresholds.goodLead}
                      onChange={(e) => handleThresholdChange('goodLead', parseInt(e.target.value) || 70)}
                      min={qualityThresholds.fairLeadMax + 1}
                      max={100}
                      className="text-sm text-center"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Good/Fair Threshold
                </Label>
                <div className="flex items-center space-x-3">
                  <Slider
                    value={[qualityThresholds.fairLeadMax]}
                    onValueChange={(value) => handleThresholdChange('fairLeadMax', value[0])}
                    min={0}
                    max={qualityThresholds.goodLead - 1}
                    step={1}
                    className="flex-1"
                  />
                  <div className="w-16">
                    <Input
                      type="number"
                      value={qualityThresholds.fairLeadMax}
                      onChange={(e) => handleThresholdChange('fairLeadMax', parseInt(e.target.value) || 60)}
                      min={0}
                      max={qualityThresholds.goodLead - 1}
                      className="text-sm text-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Range Summary */}
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-900">Excellent</span>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    {excellentRange}
                  </Badge>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-900">Good</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    {goodRange}
                  </Badge>
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-900">Fair</span>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                    {fairRange}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Templates */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Quick Templates</CardTitle>
          <p className="text-sm text-gray-600">Apply predefined threshold configurations</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 text-left flex-col items-start space-y-2 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => applyTemplate('conservative')}
            >
              <div className="font-semibold text-blue-900">Conservative (90%)</div>
              <div className="text-sm text-gray-600">Good for new businesses</div>
              <Badge variant="secondary" className="text-xs">90% / 80% / 60%</Badge>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 text-left flex-col items-start space-y-2 hover:bg-green-50 hover:border-green-300"
              onClick={() => applyTemplate('ambitious')}
            >
              <div className="font-semibold text-green-900">Ambitious (80%)</div>
              <div className="text-sm text-gray-600">For established brands</div>
              <Badge variant="secondary" className="text-xs">80% / 70% / 50%</Badge>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 text-left flex-col items-start space-y-2 hover:bg-orange-50 hover:border-orange-300"
              onClick={() => applyTemplate('aggressive')}
            >
              <div className="font-semibold text-orange-900">Aggressive (70%)</div>
              <div className="text-sm text-gray-600">For high-performing teams</div>
              <Badge variant="secondary" className="text-xs">70% / 60% / 40%</Badge>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Industry Benchmarks */}
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Industry Benchmarks</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="space-y-1">
                  <p>• SaaS Qualification: 45-65%</p>
                  <p>• E-commerce Qualification: 35-55%</p>
                </div>
                <div className="space-y-1">
                  <p>• B2B Services: 40-60%</p>
                  <p>• Low-Quality Rate: &lt;20%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedQualityGoalsStep;
