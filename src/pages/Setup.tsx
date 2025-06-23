
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, Mail, Building, MapPin, User, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Setup = () => {
  const { toast } = useToast();
  const [qualificationGoal, setQualificationGoal] = useState("60");
  const [emailScoring, setEmailScoring] = useState({
    business: "high",
    personal: "medium",
    abusive: "low"
  });
  const [customCriteria, setCustomCriteria] = useState({
    industry: { enabled: true, importance: 75 },
    companySize: { enabled: true, importance: 60 },
    revenue: { enabled: false, importance: 50 },
    country: { enabled: true, importance: 40 },
    region: { enabled: false, importance: 30 },
    role: { enabled: true, importance: 80 }
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
            Configure scoring weights for firmographic, geographic, and role-based filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-4 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Firmographic Filters
                </h4>
                <div className="space-y-4">
                  {["industry", "companySize", "revenue"].map((key) => {
                    const labels = {
                      industry: "Industry",
                      companySize: "Company Size",
                      revenue: "Revenue Tier"
                    };
                    return (
                      <div key={key} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium">{labels[key as keyof typeof labels]}</Label>
                          <Switch
                            checked={customCriteria[key as keyof typeof customCriteria].enabled}
                            onCheckedChange={(checked) =>
                              setCustomCriteria(prev => ({
                                ...prev,
                                [key]: { ...prev[key as keyof typeof prev], enabled: checked }
                              }))
                            }
                          />
                        </div>
                        {customCriteria[key as keyof typeof customCriteria].enabled && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Importance</span>
                              <span>{customCriteria[key as keyof typeof customCriteria].importance}%</span>
                            </div>
                            <Slider
                              value={[customCriteria[key as keyof typeof customCriteria].importance]}
                              onValueChange={(value) =>
                                setCustomCriteria(prev => ({
                                  ...prev,
                                  [key]: { ...prev[key as keyof typeof prev], importance: value[0] }
                                }))
                              }
                              max={100}
                              step={5}
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-4 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Geographic Filters
                </h4>
                <div className="space-y-4">
                  {["country", "region"].map((key) => {
                    const labels = {
                      country: "Country",
                      region: "Region/State"
                    };
                    return (
                      <div key={key} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium">{labels[key as keyof typeof labels]}</Label>
                          <Switch
                            checked={customCriteria[key as keyof typeof customCriteria].enabled}
                            onCheckedChange={(checked) =>
                              setCustomCriteria(prev => ({
                                ...prev,
                                [key]: { ...prev[key as keyof typeof prev], enabled: checked }
                              }))
                            }
                          />
                        </div>
                        {customCriteria[key as keyof typeof customCriteria].enabled && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Importance</span>
                              <span>{customCriteria[key as keyof typeof customCriteria].importance}%</span>
                            </div>
                            <Slider
                              value={[customCriteria[key as keyof typeof customCriteria].importance]}
                              onValueChange={(value) =>
                                setCustomCriteria(prev => ({
                                  ...prev,
                                  [key]: { ...prev[key as keyof typeof prev], importance: value[0] }
                                }))
                              }
                              max={100}
                              step={5}
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-4 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Role/Title Filters
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Role/Title</Label>
                    <Switch
                      checked={customCriteria.role.enabled}
                      onCheckedChange={(checked) =>
                        setCustomCriteria(prev => ({
                          ...prev,
                          role: { ...prev.role, enabled: checked }
                        }))
                      }
                    />
                  </div>
                  {customCriteria.role.enabled && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Importance</span>
                        <span>{customCriteria.role.importance}%</span>
                      </div>
                      <Slider
                        value={[customCriteria.role.importance]}
                        onValueChange={(value) =>
                          setCustomCriteria(prev => ({
                            ...prev,
                            role: { ...prev.role, importance: value[0] }
                          }))
                        }
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <div className="text-sm text-slate-600 mt-2">
                        Examples: C-Level, Manager, IC (Individual Contributor)
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

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
