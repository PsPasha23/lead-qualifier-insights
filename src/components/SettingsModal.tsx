
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, Mail, Building, Save, Target, TrendingUp, TrendingDown, Shield, Copy, ExternalLink } from "lucide-react";
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
  const [abuseDetectionAccordion, setAbuseDetectionAccordion] = useState("");

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your lead scoring configuration has been updated successfully.",
    });
    onOpenChange(false);
  };

  const handleCopyCode = () => {
    const code = `// Add this to your signup form
document.getElementById('signup-button').addEventListener('click', function(e) {
  const email = document.getElementById('email').value;
  
  // Send email for abuse detection
  fetch('/api/abuse-detection', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  }).then(response => response.json())
    .then(data => {
      if (data.isAbusive) {
        e.preventDefault();
        alert('Invalid email detected');
      }
    });
});`;
    
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "JavaScript code has been copied to your clipboard.",
    });
  };

  const getScoreBadge = (score: string) => {
    const colors = {
      high: "bg-green-100 text-green-800 border-green-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-red-100 text-red-800 border-red-200"
    };
    return <Badge className={`${colors[score as keyof typeof colors]} border`}>{score.toUpperCase()}</Badge>;
  };

  const handleAbuseDetectionLinkClick = () => {
    setAbuseDetectionAccordion("abuse-detection");
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
          {/* Abuse Detection Addon Promotion */}
          <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 border-b border-orange-200">
              <CardTitle className="flex items-center text-orange-900">
                <Shield className="h-5 w-5 mr-2 text-orange-600" />
                🚀 Upgrade to Advanced Abuse Detection
              </CardTitle>
              <CardDescription className="text-orange-700">
                Protect your platform from fake signups and improve lead quality by 40%
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-orange-900">Current: Basic Detection</h4>
                    <Badge variant="outline" className="border-orange-300 text-orange-700">FREE</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>• Simple domain blacklist</li>
                    <li>• Manual review required</li>
                    <li>• 60% accuracy rate</li>
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-green-900">Upgrade: AI-Powered Detection</h4>
                    <Badge className="bg-green-600 text-white">$29/month</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Real-time AI analysis</li>
                    <li>• Behavioral pattern detection</li>
                    <li>• 95% accuracy rate</li>
                    <li>• Auto-block suspicious emails</li>
                  </ul>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Upgrade to Pro Detection
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Quick Setup Integration</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Add this JavaScript code to your signup form to enable real-time abuse detection:
                  </p>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-x-auto">
                    <pre>{`// Add this to your signup form
document.getElementById('signup-button')
  .addEventListener('click', function(e) {
  const email = document.getElementById('email').value;
  
  // Send email for abuse detection
  fetch('/api/abuse-detection', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  }).then(response => response.json())
    .then(data => {
      if (data.isAbusive) {
        e.preventDefault();
        alert('Invalid email detected');
      }
    });
});`}</pre>
                  </div>
                  <Button variant="outline" onClick={handleCopyCode} className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Integration Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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
                    <div className="text-xs text-red-600 font-medium mb-3">
                      ⚠️ Emails from suspicious sources are less likely to convert
                    </div>
                    
                    <div className="mt-4">
                      <button
                        onClick={handleAbuseDetectionLinkClick}
                        className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        Learn about Advanced Abuse Detection
                      </button>
                    </div>
                  </div>

                  <Accordion type="single" collapsible value={abuseDetectionAccordion} onValueChange={setAbuseDetectionAccordion}>
                    <AccordionItem value="abuse-detection" className="border-orange-200">
                      <AccordionTrigger className="text-orange-900 hover:text-orange-700">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          AI-Powered Abuse Detection Details
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-orange-900">Current vs Upgraded Detection</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-orange-800">Accuracy Rate:</span>
                                  <span className="font-medium">60% → 95%</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-orange-800">Detection Speed:</span>
                                  <span className="font-medium">Manual → Real-time</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-orange-800">False Positives:</span>
                                  <span className="font-medium">High → Minimal</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <h4 className="font-semibold text-green-900">Advanced Features</h4>
                              <ul className="space-y-1 text-sm text-green-800">
                                <li>• Behavioral pattern analysis</li>
                                <li>• IP reputation checking</li>
                                <li>• Disposable email detection</li>
                                <li>• Machine learning classification</li>
                                <li>• Custom whitelist/blacklist</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 pt-4 border-t border-orange-200">
                            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Upgrade Now - $29/month
                            </Button>
                            <Button variant="outline" className="border-orange-300 text-orange-700">
                              View Demo
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
