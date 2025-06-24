
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Users, Building } from "lucide-react";

interface ICPTypeSelectorProps {
  selectedType: 'user' | 'company' | null;
  onTypeChange: (type: 'user' | 'company') => void;
}

const ICPTypeSelector = ({ selectedType, onTypeChange }: ICPTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          Choose Your ICP Definition Type
        </h4>
        <p className="text-gray-600 mb-4">
          Select whether you want to define your ideal customer based on individual user characteristics or company attributes.
        </p>
      </div>

      <RadioGroup value={selectedType || ""} onValueChange={onTypeChange}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User Attributes Option */}
          <Card className={`cursor-pointer transition-all ${
            selectedType === 'user' ? 'border-2 border-blue-500 bg-blue-50' : 'border-2 border-gray-200 hover:border-gray-300'
          }`}>
            <CardContent className="p-6" onClick={() => onTypeChange('user')}>
              <div className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user" className="cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    <span className="text-lg font-semibold">User Attributes</span>
                  </div>
                </Label>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Define your ICP based on individual user characteristics such as role, email type, and personal attributes.
              </p>
              <div className="text-xs text-gray-500">
                <strong>Includes:</strong> Email Type, Region, Role/Title, Employer Size, Employer Revenue
              </div>
            </CardContent>
          </Card>

          {/* Company Attributes Option */}
          <Card className={`cursor-pointer transition-all ${
            selectedType === 'company' ? 'border-2 border-blue-500 bg-blue-50' : 'border-2 border-gray-200 hover:border-gray-300'
          }`}>
            <CardContent className="p-6" onClick={() => onTypeChange('company')}>
              <div className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company" className="cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Building className="h-6 w-6 text-purple-600" />
                    <span className="text-lg font-semibold">Company Attributes</span>
                  </div>
                </Label>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Define your ICP based on company characteristics such as industry, size, revenue, and firmographic data.
              </p>
              <div className="text-xs text-gray-500">
                <strong>Includes:</strong> Founding Year, Industry, Company Size, Funding Status, Revenue
              </div>
            </CardContent>
          </Card>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ICPTypeSelector;
