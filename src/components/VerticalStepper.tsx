
import { useState } from "react";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Step {
  id: number;
  title: string;
  description: string;
  isComplete?: boolean;
  isValid?: boolean;
}

interface VerticalStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
  onContinue: (step: number) => void;
  children: React.ReactNode;
}

const VerticalStepper = ({ 
  steps, 
  currentStep, 
  onStepClick, 
  onContinue,
  children 
}: VerticalStepperProps) => {
  const currentStepData = steps.find(step => step.id === currentStep);

  return (
    <div className="space-y-4">
      {steps.map((step, stepIdx) => {
        const isActive = currentStep === step.id;
        const isCompleted = step.isComplete;
        const canExpand = isActive || isCompleted;

        return (
          <div key={step.id} className="border border-gray-200 rounded-lg">
            {/* Step Header */}
            <button
              onClick={() => onStepClick(step.id)}
              className={cn(
                "w-full p-4 flex items-center justify-between text-left transition-colors",
                isActive ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
              )}
            >
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors",
                  isCompleted
                    ? "bg-green-600 border-green-600 text-white"
                    : isActive
                    ? "border-blue-600 bg-white text-blue-600"
                    : "border-gray-300 bg-white text-gray-500"
                )}>
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div>
                  <h3 className={cn(
                    "font-semibold",
                    isActive ? "text-blue-900" : isCompleted ? "text-green-900" : "text-gray-700"
                  )}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              {canExpand && (
                <div className="text-gray-400">
                  {isActive ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
              )}
            </button>

            {/* Step Content */}
            {isActive && (
              <div className="border-t border-gray-200 p-6 bg-white">
                {children}
                
                {/* Continue Button */}
                <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                  <Button 
                    onClick={() => onContinue(step.id)}
                    disabled={!step.isValid}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {step.id === steps.length ? "Complete Setup" : "Continue"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VerticalStepper;
