
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings, BarChart3, TrendingUp, Users, Mail, Target } from "lucide-react";

const Dashboard = () => {
  const quickStats = [
    { label: "Total Leads", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
    { label: "Qualified Leads", value: "1,708", change: "+8%", icon: Target, color: "text-green-600" },
    { label: "Qualification Rate", value: "60%", change: "+5%", icon: TrendingUp, color: "text-purple-600" },
    { label: "Business Emails", value: "1,924", change: "+15%", icon: Mail, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Lead Scoring Dashboard</h1>
        <p className="mt-2 text-slate-600">Monitor and optimize your lead qualification performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-blue-600" />
              Lead Scoring Setup
            </CardTitle>
            <CardDescription>
              Configure how leads are scored and qualified based on various criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              Set up automatic scoring rules for different email types, custom qualification criteria, and target goals.
            </p>
            <Link to="/setup">
              <Button className="w-full">Configure Scoring Rules</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
              Performance Reports
            </CardTitle>
            <CardDescription>
              Analyze lead qualification trends and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              View detailed insights on qualification rates, lead breakdowns, and time-based performance trends.
            </p>
            <Link to="/reports">
              <Button variant="outline" className="w-full">View Reports</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest lead scoring and qualification updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Lead scored as High", email: "john.doe@acmecorp.com", time: "2 minutes ago", type: "business" },
              { action: "Manual qualification override", email: "sarah@gmail.com", time: "15 minutes ago", type: "personal" },
              { action: "Lead scored as Low", email: "spam@tempmail.com", time: "1 hour ago", type: "abusive" },
              { action: "Lead scored as High", email: "cto@startup.io", time: "2 hours ago", type: "business" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'business' ? 'bg-green-500' :
                    activity.type === 'personal' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.email}</p>
                  </div>
                </div>
                <span className="text-sm text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
