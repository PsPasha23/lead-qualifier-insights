
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LeadQualityExplanation from "@/components/LeadQualityExplanation";
import SettingsStepper from "@/components/SettingsStepper";
import DataSourcesStep from "@/components/steps/DataSourcesStep";
import ICPDefinitionStep from "@/components/steps/ICPDefinitionStep";
import GoalsDefinitionStep from "@/components/steps/GoalsDefinitionStep";

interface SettingsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsModal = ({ isOpen, onOpenChange }: SettingsModalProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Data Sources state
  const [selectedSources, setSelectedSources] = useState(["signup-data"]);
  
  // ICP Definition state
  const [emailScoring, setEmailScoring] = useState({
    business: "high",
    personal: "low",
    abusive: "low"
  });
  const [firmographyFilters, setFirmographyFilters] = useState({
    userRegion: [] as string[],
    companySize: [] as string[]
  });
  
  // Goals state
  const [leadQualificationGoal, setLeadQualificationGoal] = useState("60");
  const [lowQualityLeadGoal, setLowQualityLeadGoal] = useState("20");

  const steps = [
    { id: 1, title: "Data Sources", description: "Select your data" },
    { id: 2, title: "Define ICP", description: "Set scoring criteria" },
    { id: 3, title: "Set Goals", description: "Define targets" }
  ];

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your lead scoring configuration has been updated successfully.",
    });
    onOpenChange(false);
  };

  const handleSourceToggle = (source: string) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const handleEmailScoringChange = (type: 'business' | 'personal' | 'abusive', value: string) => {
    setEmailScoring(prev => ({ ...prev, [type]: value }));
  };

  const handleFirmographyChange = (category: 'userRegion' | 'companySize', values: string[]) => {
    setFirmographyFilters(prev => ({ ...prev, [category]: values }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DataSourcesStep 
            selectedSources={selectedSources}
            onSourceToggle={handleSourceToggle}
          />
        );
      case 2:
        return (
          <ICPDefinitionStep
            emailScoring={emailScoring}
            onEmailScoringChange={handleEmailScoringChange}
            firmographyFilters={firmographyFilters}
            onFirmographyChange={handleFirmographyChange}
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Lead Scoring Setup</DialogTitle>
          <DialogDescription>
            Configure how leads are scored and qualified based on multiple parameters
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lead Quality Explanation */}
          <LeadQualityExplanation />

          {/* Stepper */}
          <SettingsStepper 
            steps={steps} 
            currentStep={currentStep} 
            onStepClick={setCurrentStep} 
          />

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-3">
              {currentStep < steps.length ? (
                <Button onClick={handleNext} className="flex items-center">
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSave} className="flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
