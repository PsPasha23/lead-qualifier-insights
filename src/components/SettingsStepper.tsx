
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const SettingsStepper = ({ steps, currentStep, onStepClick }: StepperProps) => {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-between w-full">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className={cn("relative", stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "")}>
            {stepIdx !== steps.length - 1 && (
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={cn(
                  "h-0.5 w-full",
                  currentStep > step.id ? "bg-blue-600" : "bg-gray-200"
                )} />
              </div>
            )}
            <button
              onClick={() => onStepClick(step.id)}
              className={cn(
                "relative w-8 h-8 flex items-center justify-center rounded-full border-2",
                currentStep > step.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : currentStep === step.id
                  ? "border-blue-600 bg-white text-blue-600"
                  : "border-gray-300 bg-white text-gray-500"
              )}
            >
              {currentStep > step.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </button>
            <div className="mt-2 text-center">
              <p className={cn(
                "text-sm font-medium",
                currentStep >= step.id ? "text-blue-600" : "text-gray-500"
              )}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default SettingsStepper;
