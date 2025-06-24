
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, TrendingUp, Target } from "lucide-react";

const LeadQualityExplanation = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="lead-quality" className="border-blue-200">
        <AccordionTrigger className="text-blue-900 hover:text-blue-700">
          <div className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            What is Lead Quality and Why Does It Matter?
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-900 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  High Quality Leads
                </h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Business email addresses</li>
                  <li>• Match your ideal customer profile</li>
                  <li>• Higher conversion potential</li>
                  <li>• Better ROI on marketing spend</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-orange-900 flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Why Scoring Matters
                </h4>
                <ul className="space-y-1 text-sm text-orange-800">
                  <li>• Prioritize sales efforts effectively</li>
                  <li>• Improve conversion rates</li>
                  <li>• Reduce time spent on low-quality leads</li>
                  <li>• Better understand your audience</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-100 p-3 rounded-md">
              <p className="text-sm text-blue-800 font-medium">
                💡 This setup will help you automatically score and qualify leads based on their email sources, company data, and your specific criteria.
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LeadQualityExplanation;
