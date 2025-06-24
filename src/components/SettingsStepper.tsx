
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
      <ol className="flex items-center justify-between w-full max-w-2xl mx-auto">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className={cn("relative flex-1", stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "")}>
            {stepIdx !== steps.length - 1 && (
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={cn(
                  "h-0.5 w-full ml-10",
                  currentStep > step.id ? "bg-blue-600" : "bg-gray-200"
                )} />
              </div>
            )}
            <button
              onClick={() => onStepClick(step.id)}
              className="relative w-full flex flex-col items-center text-center group"
            >
              <div className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full border-2 mb-3 transition-colors",
                currentStep > step.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : currentStep === step.id
                  ? "border-blue-600 bg-white text-blue-600"
                  : "border-gray-300 bg-white text-gray-500 group-hover:border-gray-400"
              )}>
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <div>
                <p className={cn(
                  "text-sm font-medium mb-1",
                  currentStep >= step.id ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default SettingsStepper;
