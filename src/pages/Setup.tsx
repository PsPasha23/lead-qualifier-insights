
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, Mail, Building, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CustomCriteriaConfig from "@/components/CustomCriteriaConfig";

const Setup = () => {
  const { toast } = useToast();
  const [qualificationGoal, setQualificationGoal] = useState("60");
  const [emailScoring, setEmailScoring] = useState({
    business: "high",
    personal: "medium",
    abusive: "low"
  });
  const [customCriteria, setCustomCriteria] = useState({
    industry: { enabled: true, selectedValues: [] as string[] },
    companySize: { enabled: true, selectedValues: [] as string[] },
    revenue: { enabled: false, selectedValues: [] as string[] },
    country: { enabled: true, selectedValues: [] as string[] },
    region: { enabled: false, selectedValues: [] as string[] },
    role: { enabled: true, selectedValues: [] as string[] }
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your lead scoring configuration has been updated successfully.",
    });
  };

  const getScoreBadge = (score: string) => {
    const colors = {
      high: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-red-100 text-red-800"
    };
    return <Badge className={colors[score as keyof typeof colors]}>{score.toUpperCase()}</Badge>;
  };

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Lead Scoring Setup</h1>
        <p className="mt-2 text-slate-600">Configure how leads are scored and qualified based on multiple parameters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-600" />
              Email Source-Based Scoring
            </CardTitle>
            <CardDescription>
              Configure automatic scoring based on email domain types
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-medium">Business Email Domains</Label>
                  <p className="text-sm text-slate-600">Corporate domains (company.com, organization.org)</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getScoreBadge("high")}
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Business emails are automatically scored as High and marked as Qualified</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-medium">Personal Email Domains</Label>
                  <p className="text-sm text-slate-600">Gmail, Yahoo, Outlook, etc.</p>
                  <div className="bg-blue-50 p-3 rounded-md mt-2">
                    <p className="text-sm text-blue-800">
                      💡 While personal emails may appear non-business, they could still represent serious intent depending on your customer profile.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={emailScoring.personal} onValueChange={(value) => 
                    setEmailScoring(prev => ({ ...prev, personal: value }))
                  }>
                    <SelectTrigger className="w-20">
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

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-medium">Abusive/Invalid Domains</Label>
                  <p className="text-sm text-slate-600">Disposable or flagged domains</p>
                  <p className="text-sm text-slate-500">Emails from suspicious sources are less likely to convert</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getScoreBadge("low")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-green-600" />
              Lead Qualification Goal
            </CardTitle>
            <CardDescription>
              Set your target lead qualification rate for benchmarking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal">Target Qualification Rate (%)</Label>
                <Input
                  id="goal"
                  type="number"
                  value={qualificationGoal}
                  onChange={(e) => setQualificationGoal(e.target.value)}
                  className="mt-1"
                  min="0"
                  max="100"
                />
                <p className="text-sm text-slate-600 mt-2">
                  This target will be used for benchmark comparison in reports
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-md">
                <h4 className="font-medium text-slate-900 mb-2">Industry Benchmarks</h4>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>• SaaS: 45-65%</p>
                  <p>• E-commerce: 35-55%</p>
                  <p>• B2B Services: 40-60%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Qualification Criteria</CardTitle>
          <CardDescription>
            Select specific values for firmographic, geographic, and role-based filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomCriteriaConfig 
            customCriteria={customCriteria}
            onUpdate={setCustomCriteria}
          />

          <Separator className="my-6" />

          <div className="flex justify-end">
            <Button onClick={handleSave} className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setup;
