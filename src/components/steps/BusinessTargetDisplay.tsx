
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface BusinessTargetDisplayProps {
  businessType: 'B2B' | 'B2C' | null;
}

const BusinessTargetDisplay = ({ businessType }: BusinessTargetDisplayProps) => {
  if (!businessType) return null;

  return (
    <div className="flex items-center space-x-3">
      <TrendingUp className="h-5 w-5 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">Scoring Target:</span>
      <Badge variant="outline" className={businessType === 'B2B' ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-green-50 text-green-700 border-green-300'}>
        {businessType === 'B2B' ? '🎯 Business Accounts' : '👤 Individual Users'}
      </Badge>
    </div>
  );
};

export default BusinessTargetDisplay;
