
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QualityThresholds } from "../../pages/LeadQualitySetup";

interface QualityGoalsStepProps {
  qualityThresholds: QualityThresholds;
  onQualityThresholdsChange: (thresholds: QualityThresholds) => void;
}

const QualityGoalsStep = ({ qualityThresholds, onQualityThresholdsChange }: QualityGoalsStepProps) => {
  const handleThresholdChange = (key: keyof QualityThresholds, value: number) => {
    onQualityThresholdsChange({
      ...qualityThresholds,
      [key]: value
    });
  };

  const applyTemplate = (template: 'conservative' | 'ambitious' | 'aggressive') => {
    const templates = {
      conservative: { goodLead: 9, fairLeadMin: 6, fairLeadMax: 8, poorLead: 5 },
      ambitious: { goodLead: 8, fairLeadMin: 5, fairLeadMax: 7, poorLead: 4 },
      aggressive: { goodLead: 7, fairLeadMin: 4, fairLeadMax: 6, poorLead: 3 }
    };
    onQualityThresholdsChange(templates[template]);
  };

  // Calculate positions for the progress bar (0-100%)
  const excellentEnd = (qualityThresholds.goodLead / 10) * 100;
  const goodEnd = (qualityThresholds.fairLeadMax / 10) * 100;
  const fairEnd = (qualityThresholds.poorLead / 10) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Edit score ranges</h3>
        <p className="text-gray-600">Drag the markers to define your progress zones</p>
      </div>

      {/* Goal Target */}
      <div className="space-y-4">
        <div>
          <Label className="text-lg font-semibold text-gray-900 mb-4 block">
            Lead Quality Rate Goal Target (score)
          </Label>
          <div className="w-48">
            <Input
              type="number"
              value={qualityThresholds.goodLead}
              onChange={(e) => handleThresholdChange('goodLead', parseInt(e.target.value) || 7)}
              min={1}
              max={10}
              className="text-2xl font-bold h-16 text-center border-2"
            />
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="space-y-6 mt-8">
          {/* Labels */}
          <div className="flex justify-between text-sm font-medium">
            <span className="text-green-700">Excellent</span>
            <span className="text-yellow-700">Good</span>
            <span className="text-red-700">Fair</span>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-8 w-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-lg relative">
              {/* Markers */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-blue-600 rounded"
                style={{ left: `${excellentEnd}%` }}
              />
              <div 
                className="absolute top-0 bottom-0 w-1 bg-blue-600 rounded"
                style={{ left: `${goodEnd}%` }}
              />
            </div>
            
            {/* Value labels under progress bar */}
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>0 score</span>
              <span>{qualityThresholds.goodLead} score</span>
              <span>{qualityThresholds.fairLeadMax} score</span>
              <span>10 score</span>
            </div>
          </div>
        </div>

        {/* Quality Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Excellent Card */}
          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h4 className="font-semibold text-green-900">Excellent</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {qualityThresholds.goodLead} - 10 score
              </p>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-600">Upper bound:</Label>
                  <Input
                    type="number"
                    value={10}
                    disabled
                    className="mt-1 bg-gray-50 text-sm"
                  />
                </div>
                <p className="text-sm font-medium text-green-800">Excellent Performance</p>
              </div>
            </CardContent>
          </Card>

          {/* Good Card */}
          <Card className="border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <h4 className="font-semibold text-yellow-900">Good</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {qualityThresholds.fairLeadMax + 1} - {qualityThresholds.goodLead - 1} score
              </p>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-600">Upper bound:</Label>
                  <Input
                    type="number"
                    value={qualityThresholds.goodLead - 1}
                    onChange={(e) => handleThresholdChange('goodLead', parseInt(e.target.value) + 1 || 8)}
                    min={qualityThresholds.fairLeadMax + 1}
                    max={9}
                    className="mt-1 text-sm"
                  />
                </div>
                <p className="text-sm font-medium text-yellow-800">Good Progress</p>
              </div>
            </CardContent>
          </Card>

          {/* Fair Card */}
          <Card className="border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <h4 className="font-semibold text-red-900">Fair</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {qualityThresholds.fairLeadMax + 1}+ score
              </p>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-600">Lower bound:</Label>
                  <Input
                    type="number"
                    value={qualityThresholds.fairLeadMax + 1}
                    onChange={(e) => handleThresholdChange('fairLeadMax', parseInt(e.target.value) - 1 || 5)}
                    min={qualityThresholds.poorLead + 1}
                    max={qualityThresholds.goodLead - 1}
                    className="mt-1 text-sm"
                  />
                </div>
                <p className="text-sm font-medium text-red-800">Needs Work</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Templates */}
        <div className="mt-12">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Quick Templates</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-6 text-left flex-col items-start space-y-2"
              onClick={() => applyTemplate('conservative')}
            >
              <div className="font-semibold">Conservative (9 score)</div>
              <div className="text-sm text-gray-600">Good for new businesses</div>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-6 text-left flex-col items-start space-y-2"
              onClick={() => applyTemplate('ambitious')}
            >
              <div className="font-semibold">Ambitious (8 score)</div>
              <div className="text-sm text-gray-600">For established brands</div>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-6 text-left flex-col items-start space-y-2"
              onClick={() => applyTemplate('aggressive')}
            >
              <div className="font-semibold">Aggressive (7 score)</div>
              <div className="text-sm text-gray-600">For high-performing teams</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityGoalsStep;
