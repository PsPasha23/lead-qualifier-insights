
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Building, Users } from "lucide-react";

interface BusinessTypeStepProps {
  businessType: 'B2B' | 'B2C' | null;
  onBusinessTypeChange: (type: 'B2B' | 'B2C') => void;
}

const BusinessTypeStep = ({ businessType, onBusinessTypeChange }: BusinessTypeStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          What type of business are you?
        </h3>
        <p className="text-gray-600 mb-6">
          This helps us customize the lead qualification criteria for your business model.
        </p>
      </div>

      <RadioGroup 
        value={businessType || ""} 
        onValueChange={(value) => onBusinessTypeChange(value as 'B2B' | 'B2C')}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="B2B" id="b2b" />
          <Label htmlFor="b2b" className="cursor-pointer flex-1">
            <Card className="p-4 border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">B2B – Business-to-Business</h4>
                    <p className="text-sm text-gray-600">Selling products or services to other businesses</p>
                    <p className="text-xs text-blue-600 mt-1">Target: Accounts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="B2C" id="b2c" />
          <Label htmlFor="b2c" className="cursor-pointer flex-1">
            <Card className="p-4 border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">B2C – Business-to-Consumer</h4>
                    <p className="text-sm text-gray-600">Selling products or services directly to consumers</p>
                    <p className="text-xs text-green-600 mt-1">Target: Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default BusinessTypeStep;
