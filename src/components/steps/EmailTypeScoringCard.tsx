
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail } from "lucide-react";
import { EmailScoring } from "../../pages/LeadQualitySetup";

interface EmailTypeScoringCardProps {
  emailScoring: EmailScoring;
  onEmailScoringChange: (type: keyof EmailScoring, value: 'high' | 'medium' | 'low') => void;
}

const EmailTypeScoringCard = ({ emailScoring, onEmailScoringChange }: EmailTypeScoringCardProps) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base">
          <Mail className="h-4 w-4 mr-2 text-blue-600" />
          Email Type Scoring
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Assign scores based on email domain types to identify lead quality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-green-900">Corporate Email</div>
              <Select value={emailScoring.corporate} onValueChange={(value: 'high' | 'medium' | 'low') => onEmailScoringChange('corporate', value)}>
                <SelectTrigger className="w-20 h-6 text-xs border-green-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-green-700">company.com, organization.org</p>
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-yellow-900">Personal Email</div>
              <Select value={emailScoring.personal} onValueChange={(value: 'high' | 'medium' | 'low') => onEmailScoringChange('personal', value)}>
                <SelectTrigger className="w-20 h-6 text-xs border-yellow-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-yellow-700">Gmail, Yahoo, Outlook</p>
          </div>

          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-red-900">Fake/Abusive Email</div>
              <Select value={emailScoring.abusive} onValueChange={(value: 'high' | 'medium' | 'low') => onEmailScoringChange('abusive', value)}>
                <SelectTrigger className="w-20 h-6 text-xs border-red-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-red-700">Disposable domains</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTypeScoringCard;
