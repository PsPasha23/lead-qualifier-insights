
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Download, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SegmentManager, { Segment } from "@/components/SegmentManager";
import LeadTable from "@/components/LeadTable";

const Reports = () => {
  const { toast } = useToast();
  const [timeFilter, setTimeFilter] = useState("6months");
  const [segments, setSegments] = useState<Segment[]>([
    {
      id: "business-high",
      name: "High-Value Business",
      filters: { emailType: "Business", score: "High" },
      color: "#10b981"
    },
    {
      id: "personal-medium",
      name: "Personal Medium",
      filters: { emailType: "Personal", score: "Medium" },
      color: "#8b5cf6"
    },
    {
      id: "abusive-all",
      name: "Abusive Emails",
      filters: { emailType: "Abusive" },
      color: "#ef4444"
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

  const leadBreakdown = [
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
  ];

  const heatmapData = [
    { month: "Jan", rate: 58 },
    { month: "Feb", rate: 61 },
    { month: "Mar", rate: 59 },
    { month: "Apr", rate: 64 },
    { month: "May", rate: 62 },
    { month: "Jun", rate: 66 }
  ];

  // Email distribution data for the enhanced heatmap
  const emailDistributionData = [
    {
      month: "Jan",
      business: 450,
      personal: 280,
      abusive: 45,
      total: 775
    },
    {
      month: "Feb",
      business: 520,
      personal: 310,
      abusive: 38,
      total: 868
    },
    {
      month: "Mar",
      business: 480,
      personal: 295,
      abusive: 42,
      total: 817
    },
    {
      month: "Apr",
      business: 550,
      personal: 320,
      abusive: 35,
      total: 905
    },
    {
      month: "May",
      business: 495,
      personal: 305,
      abusive: 40,
      total: 840
    },
    {
      month: "Jun",
      business: 580,
      personal: 340,
      abusive: 32,
      total: 952
    }
  ];

  const chartConfig = {
    rate: {
      label: "Qualification Rate",
      color: "hsl(217, 91%, 60%)",
    },
  };

  const distributionChartConfig = {
    business: {
      label: "Business Emails",
      color: "#3b82f6",
    },
    personal: {
      label: "Personal Emails",
      color: "#8b5cf6",
    },
    abusive: {
      label: "Abusive Emails",
      color: "#ef4444",
    },
    total: {
      label: "Total Leads",
      color: "#10b981",
    },
  };

  const handleQualifyLead = (leadId: number) => {
    toast({
      title: "Lead Qualified",
      description: "Lead has been manually marked as qualified.",
    });
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
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

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
              <LineChart data={heatmapData}>
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

      {/* Enhanced Email Distribution Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            Email Distribution Trends
          </CardTitle>
          <CardDescription>
            Distribution of business emails, personal emails, abusive emails, and total leads over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={distributionChartConfig} className="h-[300px] w-full">
            <BarChart data={emailDistributionData}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="business" fill="var(--color-business)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="personal" fill="var(--color-personal)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="abusive" fill="var(--color-abusive)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded" />
              <span>Business Emails</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded" />
              <span>Personal Emails</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded" />
              <span>Abusive Emails</span>
            </div>
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
    </div>
  );
};

export default Reports;
