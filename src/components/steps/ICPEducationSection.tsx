
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Users, Building } from "lucide-react";

const ICPEducationSection = () => {
  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Target className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              What is an Ideal Customer Profile (ICP)?
            </h3>
            <p className="text-blue-800 mb-4 leading-relaxed">
              An Ideal Customer Profile (ICP) defines the characteristics of your perfect customer - 
              those most likely to buy, succeed with your product, and become long-term advocates.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-blue-700">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Increases conversion rates by 3-5x</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-700">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Improves lead quality scoring</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-100 rounded-md">
              <p className="text-sm text-blue-800 font-medium">
                💡 <strong>Pro tip:</strong> A well-defined ICP helps you prioritize high-quality leads 
                and focus your sales efforts on prospects most likely to convert.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ICPEducationSection;
