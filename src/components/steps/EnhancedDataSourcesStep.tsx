
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Database, FileText, Video, Check } from "lucide-react";

interface EnhancedDataSourcesStepProps {
  selectedSource: string;
  onSourceChange: (source: string) => void;
}

const EnhancedDataSourcesStep = ({ selectedSource, onSourceChange }: EnhancedDataSourcesStepProps) => {
  const dataSources = [
    {
      id: "signup-data",
      title: "Signed Up Data",
      description: "Users who have registered on your platform",
      icon: Database,
      available: true,
      recommended: true,
    },
    {
      id: "lead-form",
      title: "Lead Generation Form",
      description: "Prospects from your marketing forms",
      icon: FileText,
      available: false,
      comingSoon: true,
    },
    {
      id: "webinar",
      title: "Webinar Attendance",
      description: "Attendees from your webinars and events",
      icon: Video,
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Data Source</h3>
        <p className="text-gray-600">Select where your lead data originates from. This determines which leads will be scored using your ICP criteria.</p>
      </div>

      <RadioGroup value={selectedSource} onValueChange={onSourceChange}>
        <div className="space-y-4">
          {dataSources.map((source) => (
            <Card 
              key={source.id} 
              className={`transition-all cursor-pointer ${
                selectedSource === source.id && source.available
                  ? "border-2 border-blue-500 bg-blue-50" 
                  : source.available
                  ? "border-2 border-gray-200 hover:border-gray-300"
                  : "border-2 border-gray-200 opacity-60"
              }`}
            >
              <CardContent className="p-6" onClick={() => source.available && onSourceChange(source.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      selectedSource === source.id && source.available 
                        ? "bg-blue-500 text-white" 
                        : source.available 
                        ? "bg-gray-100 text-gray-600"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      <source.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{source.title}</h3>
                        {source.recommended && (
                          <Badge className="bg-green-100 text-green-800 text-xs">Recommended</Badge>
                        )}
                        {source.comingSoon && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs">Coming Soon</Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{source.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {source.available ? (
                      <RadioGroupItem value={source.id} id={source.id} />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full bg-gray-100" />
                    )}
                  </div>
                </div>
                
                {selectedSource === source.id && source.available && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
                      <Check className="h-4 w-4 mr-2" />
                      Active data source - your leads from this source will be scored
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default EnhancedDataSourcesStep;
