
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, Mail, Building, Save, Target, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CustomCriteriaConfig from "@/components/CustomCriteriaConfig";

interface SettingsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsModal = ({ isOpen, onOpenChange }: SettingsModalProps) => {
  const { toast } = useToast();
  const [leadQualificationGoal, setLeadQualificationGoal] = useState("60");
  const [lowQualityLeadGoal, setLowQualityLeadGoal] = useState("20");
  const [emailScoring, setEmailScoring] = useState({
    business: "high",
    personal: "low",
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
    onOpenChange(false);
  };

  const getScoreBadge = (score: string) => {
    const colors = {
      high: "bg-green-100 text-green-800 border-green-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-red-100 text-red-800 border-red-200"
    };
    return <Badge className={`${colors[score as keyof typeof colors]} border`}>{score.toUpperCase()}</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Lead Scoring Setup</DialogTitle>
          <DialogDescription>
            Configure how leads are scored and qualified based on multiple parameters
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-slate-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                <CardTitle className="flex items-center text-blue-900">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  Email Source-Based Scoring
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Configure automatic scoring based on email domain types
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="space-y-1">
                        <Label className="font-semibold text-green-900">Business Email Domains</Label>
                        <p className="text-sm text-green-700">Corporate domains (company.com, organization.org)</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getScoreBadge("high")}
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-green-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Business emails are automatically scored as High and marked as Qualified</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      ✓ Automatically set to HIGH - Best conversion rate
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="space-y-1">
                        <Label className="font-semibold text-yellow-900">Personal Email Domains</Label>
                        <p className="text-sm text-yellow-700">Gmail, Yahoo, Outlook, etc.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select value={emailScoring.personal} onValueChange={(value) => 
                          setEmailScoring(prev => ({ ...prev, personal: value }))
                        }>
                          <SelectTrigger className="w-24 border-yellow-300">
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
                    <div className="bg-yellow-100 p-3 rounded-md">
                      <p className="text-sm text-yellow-800">
                        💡 While personal emails may appear non-business, they could still represent serious intent depending on your customer profile.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="space-y-1">
                        <Label className="font-semibold text-red-900">Abusive/Invalid Domains</Label>
                        <p className="text-sm text-red-700">Disposable or flagged domains</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select value={emailScoring.abusive} onValueChange={(value) => 
                          setEmailScoring(prev => ({ ...prev, abusive: value }))
                        }>
                          <SelectTrigger className="w-24 border-red-300">
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
                    <div className="text-xs text-red-600 font-medium">
                      ⚠️ Emails from suspicious sources are less likely to convert
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
                <CardTitle className="flex items-center text-green-900">
                  <Target className="h-5 w-5 mr-2 text-green-600" />
                  Goal Settings
                </CardTitle>
                <CardDescription className="text-green-700">
                  Set your target benchmarks for lead qualification performance
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
                      onChange={(e) => setLeadQualificationGoal(e.target.value)}
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
                      onChange={(e) => setLowQualityLeadGoal(e.target.value)}
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
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
