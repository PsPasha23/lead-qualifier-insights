
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FilterRule {
  id: string;
  value: any;
  score: number[];
  operator?: 'AND' | 'OR';
}

interface FilterData {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'text';
  options?: string[];
  rules: FilterRule[];
}

interface FilterConfigProps {
  filter: FilterData;
  onFilterUpdate: (filterId: string, updates: Partial<FilterData>) => void;
  onFilterRemove: (filterId: string) => void;
}

const FilterConfig = ({ filter, onFilterUpdate, onFilterRemove }: FilterConfigProps) => {
  const handleRuleValueChange = (ruleId: string, newValue: any) => {
    const updatedRules = filter.rules.map(rule => 
      rule.id === ruleId ? { ...rule, value: newValue } : rule
    );
    onFilterUpdate(filter.id, { rules: updatedRules });
  };

  const handleRuleScoreChange = (ruleId: string, score: number[]) => {
    const updatedRules = filter.rules.map(rule => 
      rule.id === ruleId ? { ...rule, score } : rule
    );
    onFilterUpdate(filter.id, { rules: updatedRules });
  };

  const handleRuleOperatorChange = (ruleId: string, operator: 'AND' | 'OR') => {
    const updatedRules = filter.rules.map(rule => 
      rule.id === ruleId ? { ...rule, operator } : rule
    );
    onFilterUpdate(filter.id, { rules: updatedRules });
  };

  const addNewRule = () => {
    const newRule: FilterRule = {
      id: `${filter.id}-rule-${Date.now()}`,
      value: filter.type === 'multiselect' ? [] : filter.type === 'range' ? { min: '', max: '' } : '',
      score: [5],
      operator: 'OR'
    };
    const updatedRules = [...filter.rules, newRule];
    onFilterUpdate(filter.id, { rules: updatedRules });
  };

  const removeRule = (ruleId: string) => {
    const updatedRules = filter.rules.filter(rule => rule.id !== ruleId);
    onFilterUpdate(filter.id, { rules: updatedRules });
  };

  const renderRuleValueInput = (rule: FilterRule) => {
    switch (filter.type) {
      case 'select':
        return (
          <Select value={rule.value || ""} onValueChange={(value) => handleRuleValueChange(rule.id, value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select value" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {filter.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {filter.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${rule.id}-${option}`}
                  checked={rule.value?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    const currentValues = rule.value || [];
                    if (checked) {
                      handleRuleValueChange(rule.id, [...currentValues, option]);
                    } else {
                      handleRuleValueChange(rule.id, currentValues.filter((v: string) => v !== option));
                    }
                  }}
                />
                <label htmlFor={`${rule.id}-${option}`} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case 'range':
        return (
          <div className="flex items-center gap-2">
            <Input
              placeholder="Min"
              value={rule.value?.min || ""}
              onChange={(e) => handleRuleValueChange(rule.id, { ...rule.value, min: e.target.value })}
              className="w-20"
            />
            <span className="text-gray-500">-</span>
            <Input
              placeholder="Max"
              value={rule.value?.max || ""}
              onChange={(e) => handleRuleValueChange(rule.id, { ...rule.value, max: e.target.value })}
              className="w-20"
            />
          </div>
        );

      case 'text':
        return (
          <Input
            placeholder="Enter value"
            value={rule.value || ""}
            onChange={(e) => handleRuleValueChange(rule.id, e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  // Initialize with at least one rule if none exist
  if (!filter.rules || filter.rules.length === 0) {
    const initialRule: FilterRule = {
      id: `${filter.id}-rule-1`,
      value: filter.type === 'multiselect' ? [] : filter.type === 'range' ? { min: '', max: '' } : '',
      score: [5]
    };
    onFilterUpdate(filter.id, { rules: [initialRule] });
    return null; // Re-render with the new rule
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
          {filter.label}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterRemove(filter.id)}
          className="h-auto p-1 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {filter.rules.map((rule, index) => (
          <div key={rule.id}>
            {/* Show operator selector for rules after the first one */}
            {index > 0 && (
              <div className="flex justify-center mb-3">
                <Select 
                  value={rule.operator || 'OR'} 
                  onValueChange={(value: 'AND' | 'OR') => handleRuleOperatorChange(rule.id, value)}
                >
                  <SelectTrigger className="w-20 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="OR">OR</SelectItem>
                    <SelectItem value="AND">AND</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Card className="border border-gray-100 bg-gray-50">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Rule {index + 1}
                  </span>
                  {filter.rules.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRule(rule.id)}
                      className="h-auto p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Value
                  </label>
                  {renderRuleValueInput(rule)}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Score
                    </label>
                    <span className="text-sm text-gray-500">
                      {rule.score?.[0] || 5}/10
                    </span>
                  </div>
                  <Slider
                    value={rule.score || [5]}
                    onValueChange={(score) => handleRuleScoreChange(rule.id, score)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={addNewRule}
          className="w-full border-dashed text-blue-600 border-blue-300 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>
    </div>
  );
};

export default FilterConfig;
