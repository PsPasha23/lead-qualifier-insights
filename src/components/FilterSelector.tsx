
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, LucideIcon } from "lucide-react";

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
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonIcon?: LucideIcon;
}

const FilterSelector = ({ 
  availableFilters, 
  onFilterAdd, 
  usedFilters,
  buttonText = "Add Filter",
  buttonVariant = "outline",
  buttonIcon: ButtonIcon = Plus
}: FilterSelectorProps) => {
  const unusedFilters = availableFilters.filter(filter => !usedFilters.includes(filter.id));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} size="sm" className="border-dashed">
          <ButtonIcon className="h-4 w-4 mr-2" />
          {buttonText}
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
