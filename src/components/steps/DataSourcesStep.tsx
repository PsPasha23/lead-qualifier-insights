
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Database, FileText, Video, Check } from "lucide-react";

interface DataSourcesStepProps {
  selectedSources: string[];
  onSourceToggle: (source: string) => void;
}

const DataSourcesStep = ({ selectedSources, onSourceToggle }: DataSourcesStepProps) => {
  const dataSources = [
    {
      id: "signup-data",
      title: "Signed-up Data",
      description: "Users who have registered on your platform",
      icon: Database,
      available: true,
      defaultSelected: true,
    },
    {
      id: "lead-form",
      title: "Lead Generation Form",
      description: "Prospects from your marketing forms",
      icon: FileText,
      available: false,
      defaultSelected: false,
    },
    {
      id: "webinar",
      title: "Webinar Attendance",
      description: "Attendees from your webinars and events",
      icon: Video,
      available: false,
      defaultSelected: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Your Data Sources</h3>
        <p className="text-sm text-gray-600">Choose which data sources you want to include in your lead scoring.</p>
      </div>

      <div className="grid gap-4">
        {dataSources.map((source) => (
          <Card key={source.id} className={`border-2 transition-all ${
            selectedSources.includes(source.id) ? "border-blue-500 bg-blue-50" : "border-gray-200"
          } ${!source.available ? "opacity-60" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedSources.includes(source.id) ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    <source.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {source.title}
                      {source.defaultSelected && (
                        <Badge variant="outline" className="text-xs">Default</Badge>
                      )}
                      {!source.available && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs">Coming Soon</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm">{source.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center">
                  {source.available ? (
                    <Checkbox
                      checked={selectedSources.includes(source.id)}
                      onCheckedChange={() => onSourceToggle(source.id)}
                    />
                  ) : (
                    <div className="w-4 h-4 border-2 border-gray-300 rounded bg-gray-100" />
                  )}
                </div>
              </div>
            </CardHeader>
            {selectedSources.includes(source.id) && source.available && (
              <CardContent className="pt-0">
                <div className="flex items-center text-sm text-green-600">
                  <Check className="h-4 w-4 mr-2" />
                  Active data source
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DataSourcesStep;
