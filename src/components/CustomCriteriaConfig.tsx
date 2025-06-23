
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, User, X } from "lucide-react";

interface CustomCriteriaState {
  industry: { enabled: boolean; selectedValues: string[] };
  companySize: { enabled: boolean; selectedValues: string[] };
  revenue: { enabled: boolean; selectedValues: string[] };
  country: { enabled: boolean; selectedValues: string[] };
  region: { enabled: boolean; selectedValues: string[] };
  role: { enabled: boolean; selectedValues: string[] };
}

interface CustomCriteriaConfigProps {
  customCriteria: CustomCriteriaState;
  onUpdate: (criteria: CustomCriteriaState) => void;
}

const CustomCriteriaConfig = ({ customCriteria, onUpdate }: CustomCriteriaConfigProps) => {
  const [selectedValues, setSelectedValues] = useState<{[key: string]: string}>({});

  const criteriaOptions = {
    industry: ["Technology", "Healthcare", "Finance", "Education", "Manufacturing", "Retail", "Consulting"],
    companySize: ["1-10", "11-50", "51-200", "201-1000", "1000+"],
    revenue: ["< $1M", "$1M - $10M", "$10M - $50M", "$50M - $100M", "$100M+"],
    country: ["United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "Other"],
    region: ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East", "Africa"],
    role: ["C-Level", "VP/Director", "Manager", "Senior", "Individual Contributor", "Intern"]
  };

  const handleToggle = (key: keyof CustomCriteriaState, enabled: boolean) => {
    onUpdate({
      ...customCriteria,
      [key]: { ...customCriteria[key], enabled }
    });
  };

  const handleAddValue = (key: keyof CustomCriteriaState, value: string) => {
    if (value && !customCriteria[key].selectedValues.includes(value)) {
      onUpdate({
        ...customCriteria,
        [key]: {
          ...customCriteria[key],
          selectedValues: [...customCriteria[key].selectedValues, value]
        }
      });
      setSelectedValues(prev => ({ ...prev, [key]: "" }));
    }
  };

  const handleRemoveValue = (key: keyof CustomCriteriaState, value: string) => {
    onUpdate({
      ...customCriteria,
      [key]: {
        ...customCriteria[key],
        selectedValues: customCriteria[key].selectedValues.filter(v => v !== value)
      }
    });
  };

  const renderCriteriaSection = (
    title: string,
    icon: React.ReactNode,
    keys: (keyof CustomCriteriaState)[]
  ) => (
    <div>
      <h4 className="font-medium text-slate-900 mb-4 flex items-center">
        {icon}
        {title}
      </h4>
      <div className="space-y-4">
        {keys.map((key) => {
          const labels = {
            industry: "Industry",
            companySize: "Company Size",
            revenue: "Revenue Tier",
            country: "Country",
            region: "Region/State",
            role: "Role/Title"
          };
          return (
            <div key={key} className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-medium">{labels[key]}</Label>
                <Switch
                  checked={customCriteria[key].enabled}
                  onCheckedChange={(checked) => handleToggle(key, checked)}
                />
              </div>
              {customCriteria[key].enabled && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Select
                      value={selectedValues[key] || ""}
                      onValueChange={(value) => setSelectedValues(prev => ({ ...prev, [key]: value }))}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder={`Select ${labels[key].toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {criteriaOptions[key].map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      onClick={() => handleAddValue(key, selectedValues[key] || "")}
                      disabled={!selectedValues[key]}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {customCriteria[key].selectedValues.map(value => (
                      <Badge key={value} variant="secondary" className="flex items-center gap-1">
                        {value}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-auto p-0 hover:bg-transparent"
                          onClick={() => handleRemoveValue(key, value)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        {renderCriteriaSection(
          "Firmographic Filters",
          <Building className="h-4 w-4 mr-2" />,
          ["industry", "companySize", "revenue"]
        )}
      </div>
      <div className="space-y-6">
        {renderCriteriaSection(
          "Geographic Filters",
          <MapPin className="h-4 w-4 mr-2" />,
          ["country", "region"]
        )}
        {renderCriteriaSection(
          "Role/Title Filters",
          <User className="h-4 w-4 mr-2" />,
          ["role"]
        )}
      </div>
    </div>
  );
};

export default CustomCriteriaConfig;
