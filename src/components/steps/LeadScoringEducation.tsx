
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react";

const LeadScoringEducation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-blue-200 bg-blue-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base text-blue-900">What is Lead Scoring?</CardTitle>
              </div>
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-blue-600" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <p className="text-sm text-blue-800">
              Lead scoring is a methodology used to rank prospects based on their likelihood to convert into customers. Assign scores to different attributes like email types, company characteristics, and engagement activities to prioritize your most valuable leads.
            </p>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default LeadScoringEducation;
