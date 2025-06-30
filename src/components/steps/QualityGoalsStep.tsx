
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Define Lead Quality Goals
        </h3>
        <p className="text-gray-600 mb-6">
          Set score thresholds to automatically categorize leads based on their qualification score (1-10 scale).
        </p>
      </div>

      {/* Threshold Configuration */}
      <div className="space-y-6">
        {/* Good Lead Threshold */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base text-green-900">
              <CheckCircle className="h-4 w-4 mr-2" />
              Good Lead Threshold
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium text-green-800">
                Score ≥ {qualityThresholds.goodLead}
              </Label>
              <Badge className="bg-green-100 text-green-800 border-green-300">
                High Priority
              </Badge>
            </div>
            <Slider
              value={[qualityThresholds.goodLead]}
              onValueChange={(value) => handleThresholdChange('goodLead', value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex items-center space-x-4">
              <Input
                type="number"
                value={qualityThresholds.goodLead}
                onChange={(e) => handleThresholdChange('goodLead', parseInt(e.target.value) || 1)}
                min={1}
                max={10}
                className="w-20 h-8 text-sm border-green-300"
              />
              <span className="text-sm text-green-700">
                Leads ready for immediate sales outreach
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Fair Lead Range */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base text-yellow-900">
              <AlertCircle className="h-4 w-4 mr-2" />
              Fair Lead Range
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium text-yellow-800">
                Score {qualityThresholds.fairLeadMin} - {qualityThresholds.fairLeadMax}
              </Label>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                Medium Priority
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-yellow-700 mb-1 block">Minimum Score</Label>
                <Slider
                  value={[qualityThresholds.fairLeadMin]}
                  onValueChange={(value) => handleThresholdChange('fairLeadMin', value[0])}
                  max={qualityThresholds.fairLeadMax}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-xs text-yellow-700 mb-1 block">Maximum Score</Label>
                <Slider
                  value={[qualityThresholds.fairLeadMax]}
                  onValueChange={(value) => handleThresholdChange('fairLeadMax', value[0])}
                  max={qualityThresholds.goodLead - 1}
                  min={qualityThresholds.fairLeadMin}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={qualityThresholds.fairLeadMin}
                  onChange={(e) => handleThresholdChange('fairLeadMin', parseInt(e.target.value) || 1)}
                  min={1}
                  max={qualityThresholds.fairLeadMax}
                  className="w-16 h-8 text-sm border-yellow-300"
                />
                <span className="text-sm text-yellow-700">to</span>
                <Input
                  type="number"
                  value={qualityThresholds.fairLeadMax}
                  onChange={(e) => handleThresholdChange('fairLeadMax', parseInt(e.target.value) || 6)}
                  min={qualityThresholds.fairLeadMin}
                  max={qualityThresholds.goodLead - 1}
                  className="w-16 h-8 text-sm border-yellow-300"
                />
              </div>
              <span className="text-sm text-yellow-700">
                Leads requiring nurturing before sales contact
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Poor Lead Threshold */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base text-red-900">
              <XCircle className="h-4 w-4 mr-2" />
              Poor Lead Threshold
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium text-red-800">
                Score ≤ {qualityThresholds.poorLead}
              </Label>
              <Badge className="bg-red-100 text-red-800 border-red-300">
                Low Priority
              </Badge>
            </div>
            <Slider
              value={[qualityThresholds.poorLead]}
              onValueChange={(value) => handleThresholdChange('poorLead', value[0])}
              max={qualityThresholds.fairLeadMin - 1}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex items-center space-x-4">
              <Input
                type="number"
                value={qualityThresholds.poorLead}
                onChange={(e) => handleThresholdChange('poorLead', parseInt(e.target.value) || 1)}
                min={1}
                max={qualityThresholds.fairLeadMin - 1}
                className="w-20 h-8 text-sm border-red-300"
              />
              <span className="text-sm text-red-700">
                Leads not suitable for current sales efforts
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Lead Quality Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-green-700">✅ Good Leads:</span>
            <Badge className="bg-green-100 text-green-800">Score ≥ {qualityThresholds.goodLead}</Badge>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-yellow-700">⚠️ Fair Leads:</span>
            <Badge className="bg-yellow-100 text-yellow-800">Score {qualityThresholds.fairLeadMin}-{qualityThresholds.fairLeadMax}</Badge>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-red-700">❌ Poor Leads:</span>
            <Badge className="bg-red-100 text-red-800">Score ≤ {qualityThresholds.poorLead}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityGoalsStep;
