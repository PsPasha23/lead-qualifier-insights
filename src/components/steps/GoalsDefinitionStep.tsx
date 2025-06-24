
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, TrendingUp, TrendingDown } from "lucide-react";

interface GoalsDefinitionStepProps {
  leadQualificationGoal: string;
  lowQualityLeadGoal: string;
  onLeadQualificationGoalChange: (value: string) => void;
  onLowQualityLeadGoalChange: (value: string) => void;
}

const GoalsDefinitionStep = ({ 
  leadQualificationGoal, 
  lowQualityLeadGoal, 
  onLeadQualificationGoalChange, 
  onLowQualityLeadGoalChange 
}: GoalsDefinitionStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Define Your Quality Goals</h3>
        <p className="text-sm text-gray-600">Set target benchmarks for lead qualification performance.</p>
      </div>

      <Card className="border-2 border-slate-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
          <CardTitle className="flex items-center text-green-900">
            <Target className="h-5 w-5 mr-2 text-green-600" />
            Lead Quality Goals
          </CardTitle>
          <CardDescription className="text-green-700">
            Set your target benchmarks for optimal lead qualification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <Label htmlFor="qualification-goal" className="font-semibold text-green-900">
                  Lead Qualification Rate Goal (%)
                </Label>
              </div>
              <Input
                id="qualification-goal"
                type="number"
                value={leadQualificationGoal}
                onChange={(e) => onLeadQualificationGoalChange(e.target.value)}
                className="border-green-300 focus:border-green-500"
                min="0"
                max="100"
                placeholder="Enter target %"
              />
              <div className="bg-green-100 p-3 rounded-md">
                <p className="text-sm text-green-800 font-medium">
                  📈 Your rate should be higher than this to be growing
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-orange-600" />
                <Label htmlFor="low-quality-goal" className="font-semibold text-orange-900">
                  Low-Quality Lead Rate Goal (%)
                </Label>
              </div>
              <Input
                id="low-quality-goal"
                type="number"
                value={lowQualityLeadGoal}
                onChange={(e) => onLowQualityLeadGoalChange(e.target.value)}
                className="border-orange-300 focus:border-orange-500"
                min="0"
                max="100"
                placeholder="Enter maximum %"
              />
              <div className="bg-orange-100 p-3 rounded-md">
                <p className="text-sm text-orange-800 font-medium">
                  📉 You should be less than this rate
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Industry Benchmarks</h4>
            <div className="space-y-1 text-sm text-slate-600">
              <p>• SaaS Qualification: 45-65%</p>
              <p>• E-commerce Qualification: 35-55%</p>
              <p>• B2B Services Qualification: 40-60%</p>
              <p>• Low-Quality Rate: &lt;20% (all industries)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsDefinitionStep;
