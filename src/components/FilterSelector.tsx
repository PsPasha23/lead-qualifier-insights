
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'text';
  options?: string[];
}

interface FilterSelectorProps {
  availableFilters: FilterOption[];
  onFilterAdd: (filterId: string) => void;
  usedFilters: string[];
}

const FilterSelector = ({ availableFilters, onFilterAdd, usedFilters }: FilterSelectorProps) => {
  const unusedFilters = availableFilters.filter(filter => !usedFilters.includes(filter.id));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          <Plus className="h-4 w-4 mr-2" />
          Add Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white z-50">
        {unusedFilters.map((filter) => (
          <DropdownMenuItem
            key={filter.id}
            onClick={() => onFilterAdd(filter.id)}
            className="cursor-pointer"
          >
            {filter.label}
          </DropdownMenuItem>
        ))}
        {unusedFilters.length === 0 && (
          <DropdownMenuItem disabled>
            All filters added
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterSelector;
