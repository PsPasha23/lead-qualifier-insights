
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface FilterData {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'text';
  options?: string[];
  value?: any;
  importance: number[];
}

interface FilterConfigProps {
  filter: FilterData;
  onFilterUpdate: (filterId: string, updates: Partial<FilterData>) => void;
  onFilterRemove: (filterId: string) => void;
}

const FilterConfig = ({ filter, onFilterUpdate, onFilterRemove }: FilterConfigProps) => {
  const handleValueChange = (newValue: any) => {
    onFilterUpdate(filter.id, { value: newValue });
  };

  const handleImportanceChange = (importance: number[]) => {
    onFilterUpdate(filter.id, { importance });
  };

  const renderValueInput = () => {
    switch (filter.type) {
      case 'select':
        return (
          <Select value={filter.value || ""} onValueChange={handleValueChange}>
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
                  id={`${filter.id}-${option}`}
                  checked={filter.value?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    const currentValues = filter.value || [];
                    if (checked) {
                      handleValueChange([...currentValues, option]);
                    } else {
                      handleValueChange(currentValues.filter((v: string) => v !== option));
                    }
                  }}
                />
                <label htmlFor={`${filter.id}-${option}`} className="text-sm">
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
              value={filter.value?.min || ""}
              onChange={(e) => handleValueChange({ ...filter.value, min: e.target.value })}
              className="w-20"
            />
            <span className="text-gray-500">-</span>
            <Input
              placeholder="Max"
              value={filter.value?.max || ""}
              onChange={(e) => handleValueChange({ ...filter.value, max: e.target.value })}
              className="w-20"
            />
          </div>
        );

      case 'text':
        return (
          <Input
            placeholder="Enter value"
            value={filter.value || ""}
            onChange={(e) => handleValueChange(e.target.value)}
          />
        );

      default:
        return null;
    }
  };

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

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Value
          </label>
          {renderValueInput()}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Importance
            </label>
            <span className="text-sm text-gray-500">
              {filter.importance?.[0] || 50}%
            </span>
          </div>
          <Slider
            value={filter.importance || [50]}
            onValueChange={handleImportanceChange}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterConfig;
