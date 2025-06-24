
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Building, MapPin, Plus } from "lucide-react";

interface EmailScoring {
  business: string;
  personal: string;
  abusive: string;
}

interface FirmographyFilters {
  userRegion: string[];
  companySize: string[];
}

interface ICPDefinitionStepProps {
  emailScoring: EmailScoring;
  onEmailScoringChange: (type: keyof EmailScoring, value: string) => void;
  firmographyFilters: FirmographyFilters;
  onFirmographyChange: (category: keyof FirmographyFilters, values: string[]) => void;
}

const ICPDefinitionStep = ({ 
  emailScoring, 
  onEmailScoringChange, 
  firmographyFilters, 
  onFirmographyChange 
}: ICPDefinitionStepProps) => {
  const getScoreBadge = (score: string) => {
    const colors = {
      high: "bg-green-100 text-green-800 border-green-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-red-100 text-red-800 border-red-200"
    };
    return <Badge className={`${colors[score as keyof typeof colors]} border`}>{score.toUpperCase()}</Badge>;
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Define Your Ideal Customer Profile</h3>
        <p className="text-gray-600">Set scoring criteria and filters to identify your best leads.</p>
      </div>

      {/* Email Type Scoring */}
      <Card className="border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <CardTitle className="flex items-center text-blue-900 text-lg">
            <Mail className="h-5 w-5 mr-3 text-blue-600" />
            Email Type Scoring
          </CardTitle>
          <CardDescription className="text-blue-700">
            Score leads based on their email domain type
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="space-y-1">
                <div className="font-semibold text-green-900">Corporate Email Domains</div>
                <p className="text-sm text-green-700">company.com, organization.org</p>
              </div>
              <div className="flex items-center space-x-2">
                {getScoreBadge("high")}
              </div>
            </div>
            <div className="text-xs text-green-600 font-medium">
              ✓ Automatically set to HIGH - Default
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="space-y-1">
                <div className="font-semibold text-yellow-900">Personal Email Domains</div>
                <p className="text-sm text-yellow-700">Gmail, Yahoo, Outlook, etc.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={emailScoring.personal} onValueChange={(value) => onEmailScoringChange('personal', value)}>
                  <SelectTrigger className="w-32 border-yellow-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="space-y-1">
                <div className="font-semibold text-red-900">Abusive/Invalid Domains</div>
                <p className="text-sm text-red-700">Disposable or flagged domains</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={emailScoring.abusive} onValueChange={(value) => onEmailScoringChange('abusive', value)}>
                  <SelectTrigger className="w-32 border-red-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Firmography Filters */}
      <Card className="border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
          <CardTitle className="flex items-center text-purple-900 text-lg">
            <Building className="h-5 w-5 mr-3 text-purple-600" />
            Firmography Filters
          </CardTitle>
          <CardDescription className="text-purple-700">
            Add filters based on user and company characteristics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="space-y-1">
                  <div className="font-semibold text-purple-900 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    User Region (user.firmography.region)
                  </div>
                  <p className="text-sm text-purple-700">Filter by user's geographic region</p>
                </div>
                <Button variant="outline" size="sm" className="border-purple-300 text-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Region
                </Button>
              </div>
              {firmographyFilters.userRegion.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {firmographyFilters.userRegion.map((region) => (
                    <Badge key={region} variant="outline" className="border-purple-300 text-purple-700">
                      {region}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="space-y-1">
                  <div className="font-semibold text-blue-900 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Company Size (account.firmography.companySize)
                  </div>
                  <p className="text-sm text-blue-700">Filter by company employee count</p>
                </div>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Size
                </Button>
              </div>
              {firmographyFilters.companySize.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {firmographyFilters.companySize.map((size) => (
                    <Badge key={size} variant="outline" className="border-blue-300 text-blue-700">
                      {size}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ICPDefinitionStep;
