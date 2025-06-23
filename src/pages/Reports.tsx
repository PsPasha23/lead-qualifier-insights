
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, Download, CheckCircle, XCircle, AlertCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();
  const [timeFilter, setTimeFilter] = useState("6months");

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

  const chartConfig = {
    rate: {
      label: "Qualification Rate",
      color: "hsl(217, 91%, 60%)",
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

  const getScoreBadge = (score: string) => {
    const colors = {
      High: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-red-100 text-red-800"
    };
    return <Badge className={colors[score as keyof typeof colors]}>{score}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      Business: "bg-blue-100 text-blue-800",
      Personal: "bg-purple-100 text-purple-800",
      Abusive: "bg-red-100 text-red-800"
    };
    return <Badge variant="outline" className={colors[type as keyof typeof colors]}>{type}</Badge>;
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

      {/* Time-Based Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            Qualification Trends Over Time
          </CardTitle>
          <CardDescription>
            Monthly qualification rate heatmap for the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            {heatmapData.map((data) => (
              <div key={data.month} className="text-center">
                <div className="text-sm font-medium text-slate-600 mb-2">{data.month}</div>
                <div 
                  className={`h-16 rounded-md flex items-center justify-center text-white font-bold ${
                    data.rate >= 65 ? 'bg-green-500' :
                    data.rate >= 55 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                >
                  {data.rate}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded" />
              <span>Below 55%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded" />
              <span>55-65%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span>Above 65%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lead Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Breakdown with Manual Override</CardTitle>
          <CardDescription>
            Detailed view of leads segmented by type, region, industry, and title
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadBreakdown.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.email}</TableCell>
                    <TableCell>{getTypeBadge(lead.type)}</TableCell>
                    <TableCell>{getScoreBadge(lead.score)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {lead.qualified ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className={lead.qualified ? "text-green-600" : "text-red-600"}>
                          {lead.qualified ? "Qualified" : "Unqualified"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{lead.region}</TableCell>
                    <TableCell>{lead.industry}</TableCell>
                    <TableCell>{lead.title}</TableCell>
                    <TableCell>
                      {!lead.qualified && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQualifyLead(lead.id)}
                          className="text-xs"
                        >
                          Mark as Qualified
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
