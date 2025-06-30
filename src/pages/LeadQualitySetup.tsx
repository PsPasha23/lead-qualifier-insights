
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VerticalStepper from "@/components/VerticalStepper";
import BusinessTypeStep from "@/components/steps/BusinessTypeStep";
import ICPDefinitionStepV2 from "@/components/steps/ICPDefinitionStepV2";
import LeadSourcesStep from "@/components/steps/LeadSourcesStep";
import QualityGoalsStep from "@/components/steps/QualityGoalsStep";

export interface EmailScoring {
  corporate: 'high' | 'medium' | 'low';
  personal: 'high' | 'medium' | 'low';
  abusive: 'high' | 'medium' | 'low';
}

export interface FilterRule {
  id: string;
  value: any;
  score: number[];
  operator?: 'AND' | 'OR';
}

export interface FilterData {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'text';
  options?: string[];
  rules: FilterRule[];
}

export interface QualityThresholds {
  goodLead: number;
  fairLeadMin: number;
  fairLeadMax: number;
  poorLead: number;
}

const LeadQualitySetup = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Business Type
  const [businessType, setBusinessType] = useState<'B2B' | 'B2C' | null>(null);
  
  // Step 2: ICP Definition
  const [emailScoring, setEmailScoring] = useState<EmailScoring>({
    corporate: 'high',
    personal: 'medium',
    abusive: 'low'
  });
  const [fitCriteria, setFitCriteria] = useState<FilterData[]>([]);
  
  // Step 3: Lead Sources
  const [leadSources, setLeadSources] = useState<string[]>(['signup-users']);
  
  // Step 4: Quality Goals
  const [qualityThresholds, setQualityThresholds] = useState<QualityThresholds>({
    goodLead: 70,
    fairLeadMin: 40,
    fairLeadMax: 60,
    poorLead: 30
  });

  const steps = [
    { 
      id: 1, 
      title: "Select Business Type", 
      description: "Define your business model",
      isComplete: currentStep > 1,
      isValid: !!businessType
    },
    { 
      id: 2, 
      title: "Define Your ICP", 
      description: "Set your ideal customer profile",
      isComplete: currentStep > 2,
      isValid: !!businessType && fitCriteria.length >= 0 // Email scoring is always valid
    },
    { 
      id: 3, 
      title: "Select Lead Sources", 
      description: "Choose your data sources",
      isComplete: currentStep > 3,
      isValid: leadSources.length > 0
    },
    { 
      id: 4, 
      title: "Define Lead Quality Goals", 
      description: "Set score thresholds",
      isComplete: false,
      isValid: true // Always valid with defaults
    }
  ];

  const handleSave = () => {
    const config = {
      businessType,
      emailScoring,
      fitCriteria,
      leadSources,
      qualityThresholds
    };
    
    console.log('Lead Quality Setup Config:', config);
    
    toast({
      title: "Lead Quality Setup Complete",
      description: "Your lead qualification model has been configured successfully.",
    });
  };

  const handleContinue = (stepId: number) => {
    if (stepId === 4) {
      handleSave();
    } else {
      setCurrentStep(stepId + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessTypeStep 
            businessType={businessType}
            onBusinessTypeChange={setBusinessType}
          />
        );
      case 2:
        return (
          <ICPDefinitionStepV2
            businessType={businessType}
            emailScoring={emailScoring}
            onEmailScoringChange={(type, value) => 
              setEmailScoring(prev => ({ ...prev, [type]: value }))
            }
            fitCriteria={fitCriteria}
            onFitCriteriaChange={setFitCriteria}
          />
        );
      case 3:
        return (
          <LeadSourcesStep
            leadSources={leadSources}
            onLeadSourcesChange={setLeadSources}
          />
        );
      case 4:
        return (
          <QualityGoalsStep
            qualityThresholds={qualityThresholds}
            onQualityThresholdsChange={setQualityThresholds}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900 p-1 h-auto mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lead Quality Setup
          </h1>
          <p className="text-gray-600">
            Configure your lead qualification criteria to identify high-quality prospects and optimize your sales pipeline.
          </p>
        </div>

        {/* Stepper */}
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
  );
};

export default LeadQualitySetup;
