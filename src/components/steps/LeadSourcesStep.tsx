
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Users, Video, FileText } from "lucide-react";

interface LeadSourcesStepProps {
  leadSources: string[];
  onLeadSourcesChange: (sources: string[]) => void;
}

const LeadSourcesStep = ({ leadSources, onLeadSourcesChange }: LeadSourcesStepProps) => {
  const handleSourceToggle = (sourceId: string, checked: boolean) => {
    if (checked) {
      onLeadSourcesChange([...leadSources, sourceId]);
    } else {
      onLeadSourcesChange(leadSources.filter(s => s !== sourceId));
    }
  };

  const sources = [
    {
      id: 'signup-users',
      title: 'Signed Up Users',
      description: 'Users who have registered for your product or service',
      icon: Users,
      enabled: true,
      defaultSelected: true
    },
    {
      id: 'webinar-attendance',
      title: 'Webinar Attendance',
      description: 'Leads from webinar registrations and attendees',
      icon: Video,
      enabled: false,
      defaultSelected: false
    },
    {
      id: 'lead-gen-form',
      title: 'Lead Generation Form',
      description: 'Leads captured through website forms and landing pages',
      icon: FileText,
      enabled: false,
      defaultSelected: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Where do your leads come from?
        </h3>
        <p className="text-gray-600 mb-6">
          Select the sources where your leads originate. This helps us understand your lead flow and apply appropriate scoring.
        </p>
      </div>

      <div className="space-y-4">
        {sources.map((source) => {
          const IconComponent = source.icon;
          const isChecked = leadSources.includes(source.id);
          
          return (
            <Card 
              key={source.id} 
              className={`border-2 transition-colors ${
                isChecked 
                  ? 'border-blue-300 bg-blue-50' 
                  : source.enabled 
                    ? 'border-gray-200 hover:border-gray-300' 
                    : 'border-gray-100 bg-gray-50'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id={source.id}
                    checked={isChecked}
                    onCheckedChange={(checked) => handleSourceToggle(source.id, !!checked)}
                    disabled={!source.enabled}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        source.enabled 
                          ? 'bg-blue-100' 
                          : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`h-4 w-4 ${
                          source.enabled 
                            ? 'text-blue-600' 
                            : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-medium ${
                            source.enabled 
                              ? 'text-gray-900' 
                              : 'text-gray-500'
                          }`}>
                            {source.title}
                          </h4>
                          {source.defaultSelected && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                              Default
                            </Badge>
                          )}
                          {!source.enabled && (
                            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-300">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        <p className={`text-sm ${
                          source.enabled 
                            ? 'text-gray-600' 
                            : 'text-gray-400'
                        }`}>
                          {source.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {leadSources.length === 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <p className="text-sm text-orange-800">
              ⚠️ Please select at least one lead source to continue.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeadSourcesStep;
