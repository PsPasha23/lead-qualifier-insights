
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VerticalStepper from "@/components/VerticalStepper";
import EnhancedDataSourcesStep from "@/components/steps/EnhancedDataSourcesStep";
import EnhancedICPDefinitionStep from "@/components/steps/EnhancedICPDefinitionStep";
import GoalsDefinitionStep from "@/components/steps/GoalsDefinitionStep";

interface SettingsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsModal = ({ isOpen, onOpenChange }: SettingsModalProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Data Sources state
  const [selectedSource, setSelectedSource] = useState("signup-data");
  
  // ICP Definition state
  const [icpType, setIcpType] = useState<'user' | 'company' | null>(null);
  const [emailScoring, setEmailScoring] = useState({
    business: "high",
    personal: "low",
    abusive: "low"
  });
  const [fitCriteria, setFitCriteria] = useState({
    foundedYear: null as {
      operator: string;
      minYear: string;
      maxYear: string;
      score: number[];
    } | null
  });
  
  // Goals state
  const [leadQualificationGoal, setLeadQualificationGoal] = useState("60");
  const [lowQualityLeadGoal, setLowQualityLeadGoal] = useState("20");

  const steps = [
    { 
      id: 1, 
      title: "Choose Data Source", 
      description: "Select your data origin",
      isComplete: currentStep > 1,
      isValid: !!selectedSource
    },
    { 
      id: 2, 
      title: "Define ICP", 
      description: "Set scoring criteria",
      isComplete: currentStep > 2,
      isValid: !!icpType
    },
    { 
      id: 3, 
      title: "Set Goals", 
      description: "Define targets",
      isComplete: false,
      isValid: !!leadQualificationGoal && !!lowQualityLeadGoal
    }
  ];

  const handleSave = () => {
    toast({
      title: "Lead Scoring Setup Complete",
      description: "Your lead qualification model has been configured successfully.",
    });
    onOpenChange(false);
  };

  const handleProceedWithDefaults = () => {
    // Set default values for all steps
    setSelectedSource("signup-data");
    setIcpType("user");
    setEmailScoring({
      business: "high",
      personal: "medium",
      abusive: "low"
    });
    setLeadQualificationGoal("60");
    setLowQualityLeadGoal("20");
    
    toast({
      title: "Default Configuration Applied",
      description: "Lead scoring has been set up with default values.",
    });
    onOpenChange(false);
  };

  const handleContinue = (stepId: number) => {
    if (stepId === 3) {
      handleSave();
    } else {
      setCurrentStep(stepId + 1);
    }
  };

  const handleEmailScoringChange = (type: 'business' | 'personal' | 'abusive', value: string) => {
    setEmailScoring(prev => ({ ...prev, [type]: value }));
  };

  const handleFitCriteriaChange = (criteria: typeof fitCriteria) => {
    setFitCriteria(criteria);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <EnhancedDataSourcesStep 
            selectedSource={selectedSource}
            onSourceChange={setSelectedSource}
          />
        );
      case 2:
        return (
          <EnhancedICPDefinitionStep
            icpType={icpType}
            onICPTypeChange={setIcpType}
            emailScoring={emailScoring}
            onEmailScoringChange={handleEmailScoringChange}
            fitCriteria={fitCriteria}
            onFitCriteriaChange={handleFitCriteriaChange}
          />
        );
      case 3:
        return (
          <GoalsDefinitionStep
            leadQualificationGoal={leadQualificationGoal}
            lowQualityLeadGoal={lowQualityLeadGoal}
            onLeadQualificationGoalChange={setLeadQualificationGoal}
            onLowQualityLeadGoalChange={setLowQualityLeadGoal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0">
        <div className="bg-white">
          {/* Header */}
          <div className="border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="text-gray-600 hover:text-gray-900 p-1 h-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button
                variant="outline"
                onClick={handleProceedWithDefaults}
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                Proceed with Defaults
              </Button>
            </div>
            <DialogTitle className="text-2xl font-semibold text-gray-900 mb-2">
              Lead Quality Setup
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Configure your Ideal Customer Profile (ICP), assign scoring to lead attributes, and set measurable goals for lead qualification.
            </DialogDescription>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <VerticalStepper 
              steps={steps} 
              currentStep={currentStep} 
              onStepClick={setCurrentStep}
              onContinue={handleContinue}
            >
              {renderStepContent()}
            </VerticalStepper>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
