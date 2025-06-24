
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
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Define Your Quality Goals</h3>
        <p className="text-gray-600">Set target benchmarks for lead qualification performance.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
          <CardTitle className="flex items-center text-green-900 text-lg">
            <Target className="h-5 w-5 mr-3 text-green-600" />
            Lead Quality Goals
          </CardTitle>
          <CardDescription className="text-green-700">
            Set your target benchmarks for optimal lead qualification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <Label htmlFor="qualification-goal" className="font-semibold text-green-900 text-base">
                  Lead Qualification Rate Goal (%)
                </Label>
              </div>
              <Input
                id="qualification-goal"
                type="number"
                value={leadQualificationGoal}
                onChange={(e) => onLeadQualificationGoalChange(e.target.value)}
                className="border-green-300 focus:border-green-500 text-lg"
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

          <div className="p-5 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingDown className="h-5 w-5 text-orange-600" />
                <Label htmlFor="low-quality-goal" className="font-semibold text-orange-900 text-base">
                  Low-Quality Lead Rate Goal (%)
                </Label>
              </div>
              <Input
                id="low-quality-goal"
                type="number"
                value={lowQualityLeadGoal}
                onChange={(e) => onLowQualityLeadGoalChange(e.target.value)}
                className="border-orange-300 focus:border-orange-500 text-lg"
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

          <div className="bg-gray-50 p-5 rounded-md border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Industry Benchmarks</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
              <div>
                <p>• SaaS Qualification: 45-65%</p>
                <p>• E-commerce Qualification: 35-55%</p>
              </div>
              <div>
                <p>• B2B Services Qualification: 40-60%</p>
                <p>• Low-Quality Rate: &lt;20% (all industries)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsDefinitionStep;
