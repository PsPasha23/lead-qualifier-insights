import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, Download, Calendar, Users, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SegmentManager, { Segment } from "@/components/SegmentManager";
import LeadTable from "@/components/LeadTable";
import LeadQualificationGoal from "@/components/LeadQualificationGoal";
import PersonalEmailQualificationModal from "@/components/PersonalEmailQualificationModal";
import SettingsModal from "@/components/SettingsModal";

const Reports = () => {
  const { toast } = useToast();
  const [timeFilter, setTimeFilter] = useState("6months");
  const [qualificationGoal, setQualificationGoal] = useState(70);
  const [isPersonalEmailModalOpen, setIsPersonalEmailModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [segments, setSegments] = useState<Segment[]>([
    {
      id: "personal-medium",
      name: "Personal Medium",
      filters: { emailType: "Personal", score: "Medium" },
      color: "#8b5cf6"
    }
  ]);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  // Mock data for demonstration
  const kpiData = {
    qualificationRate: 62,
    industryBenchmark: 55,
    totalLeads: 2847,
    qualifiedLeads: 1765,
    industryPercentile: 78
  };

  // Data for the qualification rate trend chart
  const qualificationTrendData = [
    { month: "Jan", rate: 58 },
    { month: "Feb", rate: 61 },
    { month: "Mar", rate: 59 },
    { month: "Apr", rate: 63 },
    { month: "May", rate: 65 },
    { month: "Jun", rate: 62 }
  ];

  const [leadBreakdown, setLeadBreakdown] = useState([
    {
      id: 1,
      email: "john.doe@acmecorp.com",
      type: "Business",
      score: "High",
      qualified: true,
      region: "North America",
      industry: "SaaS",
      title: "CTO"
    },
    {
      id: 2,
      email: "sarah.wilson@gmail.com",
      type: "Personal",
      score: "Medium",
      qualified: false,
      region: "Europe",
      industry: "E-commerce",
      title: "Marketing Manager"
    },
    {
      id: 3,
      email: "spam@tempmail.com",
      type: "Abusive",
      score: "Low",
      qualified: false,
      region: "Unknown",
      industry: "Unknown",
      title: "Unknown"
    },
    {
      id: 4,
      email: "ceo@startup.io",
      type: "Business",
      score: "High",
      qualified: true,
      region: "North America",
      industry: "Tech",
      title: "CEO"
    },
    {
      id: 5,
      email: "mike.jones@gmail.com",
      type: "Personal",
      score: "Medium",
      qualified: false,
      region: "Asia",
      industry: "Finance",
      title: "Director"
    },
    {
      id: 6,
      email: "admin@company.com",
      type: "Business",
      score: "High",
      qualified: true,
      region: "North America",
      industry: "Manufacturing",
      title: "VP Sales"
    },
    {
      id: 7,
      email: "test@test.com",
      type: "Abusive",
      score: "Low",
      qualified: false,
      region: "Unknown",
      industry: "Unknown",
      title: "Unknown"
    },
    {
      id: 8,
      email: "jane.smith@outlook.com",
      type: "Personal",
      score: "Medium",
      qualified: false,
      region: "Europe",
      industry: "Healthcare",
      title: "Manager"
    }
  ]);

  // Enhanced email distribution data for the new heatmap format
  const emailDistributionData = [
    {
      month: "Jan 2025",
      corporate: { count: 1675, percentage: 68.2, target: "70-80%" },
      personal: { count: 351, percentage: 14.3, target: "10-15%" },
      lowQuality: { count: 430, percentage: 17.5, target: "<20%" },
      total: 2456
    },
    {
      month: "Feb 2025",
      corporate: { count: 1912, percentage: 71.4, target: "70-80%" },
      personal: { count: 343, percentage: 12.8, target: "10-15%" },
      lowQuality: { count: 423, percentage: 15.8, target: "<20%" },
      total: 2678
    },
    {
      month: "Mar 2025",
      corporate: { count: 1769, percentage: 69.8, target: "70-80%" },
      personal: { count: 345, percentage: 13.6, target: "10-15%" },
      lowQuality: { count: 421, percentage: 16.6, target: "<20%" },
      total: 2535
    },
    {
      month: "Apr 2025",
      corporate: { count: 2011, percentage: 72.1, target: "70-80%" },
      personal: { count: 332, percentage: 11.9, target: "10-15%" },
      lowQuality: { count: 446, percentage: 16.0, target: "<20%" },
      total: 2789
    },
    {
      month: "May 2025",
      corporate: { count: 2165, percentage: 73.8, target: "70-80%" },
      personal: { count: 364, percentage: 12.4, target: "10-15%" },
      lowQuality: { count: 405, percentage: 13.8, target: "<20%" },
      total: 2934
    },
    {
      month: "Jun 2025",
      corporate: { count: 2349, percentage: 75.2, target: "70-80%" },
      personal: { count: 350, percentage: 11.2, target: "10-15%" },
      lowQuality: { count: 425, percentage: 13.6, target: "<20%" },
      total: 3124
    }
  ];

  const chartConfig = {
    rate: {
      label: "Qualification Rate",
      color: "hsl(217, 91%, 60%)",
    },
  };

  const getCellColor = (type: 'corporate' | 'personal' | 'lowQuality', percentage: number) => {
    if (type === 'corporate') {
      if (percentage >= 75) return 'bg-green-600 text-white';
      if (percentage >= 70) return 'bg-green-500 text-white';
      if (percentage >= 65) return 'bg-green-400 text-black';
      return 'bg-green-300 text-black';
    } else if (type === 'personal') {
      if (percentage >= 14) return 'bg-yellow-500 text-black';
      if (percentage >= 12) return 'bg-yellow-400 text-black';
      if (percentage >= 10) return 'bg-yellow-300 text-black';
      return 'bg-yellow-200 text-black';
    } else {
      if (percentage <= 14) return 'bg-green-500 text-white';
      if (percentage <= 16) return 'bg-green-400 text-black';
      if (percentage <= 18) return 'bg-yellow-400 text-black';
      return 'bg-yellow-500 text-black';
    }
  };

  const handleQualifyLead = (leadId: number) => {
    setLeadBreakdown(prev => 
      prev.map(lead => 
        lead.id === leadId ? { ...lead, qualified: true } : lead
      )
    );
    toast({
      title: "Lead Qualified",
      description: "Lead has been manually marked as qualified.",
    });
  };

  const handleQualifyPersonalLeads = (leadIds: number[]) => {
    setLeadBreakdown(prev => 
      prev.map(lead => 
        leadIds.includes(lead.id) ? { ...lead, qualified: true } : lead
      )
    );
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your report is being prepared for download.",
    });
  };

  const handleSegmentCreate = (segmentData: Omit<Segment, 'id'>) => {
    const newSegment: Segment = {
      ...segmentData,
      id: `segment-${Date.now()}`
    };
    setSegments(prev => [...prev, newSegment]);
  };

  const handleSegmentDelete = (segmentId: string) => {
    setSegments(prev => prev.filter(s => s.id !== segmentId));
    if (activeSegment === segmentId) {
      setActiveSegment(null);
    }
    toast({
      title: "Segment Deleted",
      description: "The segment has been removed.",
    });
  };

  const personalLeads = leadBreakdown.filter(lead => 
    lead.type === "Personal" && !lead.qualified
  );

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Lead Qualification Reports</h1>
          <p className="mt-2 text-slate-600">Insights on lead qualification performance and trends</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsSettingsModalOpen(true)} variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Lead Qualification Goal Tracking */}
      <LeadQualificationGoal
        currentRate={kpiData.qualificationRate}
        goal={qualificationGoal}
        onGoalUpdate={setQualificationGoal}
      />

      {/* Personal Email Review Button */}
      {personalLeads.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">Personal Email Review Required</h3>
                  <p className="text-sm text-orange-700">
                    {personalLeads.length} personal email leads need qualification review
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setIsPersonalEmailModalOpen(true)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Review Personal Emails
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Lead Qualification Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">{kpiData.qualificationRate}%</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Your Rate</span>
                <span>{kpiData.qualificationRate}%</span>
              </div>
              <Progress value={kpiData.qualificationRate} className="h-2" />
              <div className="flex justify-between text-sm text-slate-600">
                <span>Industry Benchmark</span>
                <span>{kpiData.industryBenchmark}%</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-md">
              <div className="flex items-center text-green-800">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  You are in the top {100 - kpiData.industryPercentile}% of companies
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Lead Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Leads</span>
                <span className="text-2xl font-bold">{kpiData.totalLeads.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Qualified</span>
                <span className="text-xl font-semibold text-green-600">{kpiData.qualifiedLeads.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Unqualified</span>
                <span className="text-xl font-semibold text-red-600">{(kpiData.totalLeads - kpiData.qualifiedLeads).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[180px] w-full">
              <LineChart data={qualificationTrendData}>
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[50, 70]}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />} 
                  formatter={(value) => [`${value}%`, "Qualification Rate"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="var(--color-rate)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--color-rate)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "var(--color-rate)", strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Lead Quality Distribution Heatmap */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Lead Quality Distribution by Time Period
              </CardTitle>
              <CardDescription>
                Track corporate vs personal vs low-quality lead percentages
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              📅 Monthly View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 font-semibold text-slate-700 bg-slate-50 min-w-[140px]">LEAD CATEGORY</th>
                  <th className="text-left p-3 font-semibold text-slate-700 bg-slate-50 min-w-[120px]">TARGET RANGE</th>
                  {emailDistributionData.map((data) => (
                    <th key={data.month} className="text-center p-3 font-semibold text-slate-700 bg-slate-50 min-w-[120px]">
                      {data.month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-3 font-medium text-slate-900 bg-slate-50">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      Corporate Emails
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 bg-slate-50">
                    <div className="font-medium">70-80%</div>
                    <div className="text-xs text-slate-500">benchmark</div>
                  </td>
                  {emailDistributionData.map((monthData) => (
                    <td key={`corporate-${monthData.month}`} className="p-0">
                      <div className={`p-3 text-center font-semibold transition-all hover:opacity-80 cursor-pointer ${getCellColor('corporate', monthData.corporate.percentage)}`}>
                        <div className="text-lg">{monthData.corporate.percentage}%</div>
                        <div className="text-sm opacity-90">{monthData.corporate.count.toLocaleString()}</div>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-slate-200">
                  <td className="p-3 font-medium text-slate-900 bg-slate-50">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      Personal Emails
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 bg-slate-50">
                    <div className="font-medium">10-15%</div>
                    <div className="text-xs text-slate-500">benchmark</div>
                  </td>
                  {emailDistributionData.map((monthData) => (
                    <td key={`personal-${monthData.month}`} className="p-0">
                      <div className={`p-3 text-center font-semibold transition-all hover:opacity-80 cursor-pointer ${getCellColor('personal', monthData.personal.percentage)}`}>
                        <div className="text-lg">{monthData.personal.percentage}%</div>
                        <div className="text-sm opacity-90">{monthData.personal.count.toLocaleString()}</div>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-slate-200">
                  <td className="p-3 font-medium text-slate-900 bg-slate-50">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      Low-Quality/Fake
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 bg-slate-50">
                    <div className="font-medium">&lt;20%</div>
                    <div className="text-xs text-slate-500">benchmark</div>
                  </td>
                  {emailDistributionData.map((monthData) => (
                    <td key={`lowquality-${monthData.month}`} className="p-0">
                      <div className={`p-3 text-center font-semibold transition-all hover:opacity-80 cursor-pointer ${getCellColor('lowQuality', monthData.lowQuality.percentage)}`}>
                        <div className="text-lg">{monthData.lowQuality.percentage}%</div>
                        <div className="text-sm opacity-90">{monthData.lowQuality.count.toLocaleString()}</div>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="bg-blue-50 border-t-2 border-blue-200">
                  <td className="p-3 font-bold text-blue-900">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                      TOTAL LEADS
                    </div>
                  </td>
                  <td className="p-3 text-blue-700">
                    <div className="font-medium">All</div>
                    <div className="text-xs">Categories</div>
                    <div className="text-xs">combined</div>
                  </td>
                  {emailDistributionData.map((monthData) => (
                    <td key={`total-${monthData.month}`} className="p-0">
                      <div className="p-3 text-center font-bold bg-blue-100 text-blue-900 transition-all hover:bg-blue-200 cursor-pointer">
                        <div className="text-lg">{(monthData.total / 1000).toFixed(1)}K</div>
                        <div className="text-sm">leads</div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Segment Manager */}
      <SegmentManager
        segments={segments}
        onSegmentCreate={handleSegmentCreate}
        onSegmentDelete={handleSegmentDelete}
        activeSegment={activeSegment}
        onSegmentSelect={setActiveSegment}
      />

      {/* Enhanced Lead Table */}
      <LeadTable
        leads={leadBreakdown}
        activeSegment={activeSegment}
        segments={segments}
        onQualifyLead={handleQualifyLead}
      />

      {/* Personal Email Qualification Modal */}
      <PersonalEmailQualificationModal
        isOpen={isPersonalEmailModalOpen}
        onOpenChange={setIsPersonalEmailModalOpen}
        personalLeads={personalLeads}
        onQualifyLeads={handleQualifyPersonalLeads}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onOpenChange={setIsSettingsModalOpen}
      />
    </div>
  );
};

export default Reports;
