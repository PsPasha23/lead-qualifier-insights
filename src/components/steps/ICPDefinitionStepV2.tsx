
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmailScoring, FilterData } from "../../pages/LeadQualitySetup";
import LeadScoringIllustration from "../LeadScoringIllustration";
import LeadScoringEducation from "./LeadScoringEducation";
import BusinessTargetDisplay from "./BusinessTargetDisplay";
import EmailTypeScoringCard from "./EmailTypeScoringCard";

interface ICPDefinitionStepV2Props {
  businessType: 'B2B' | 'B2C' | null;
  emailScoring: EmailScoring;
  onEmailScoringChange: (type: keyof EmailScoring, value: 'high' | 'medium' | 'low') => void;
  fitCriteria: FilterData[];
  onFitCriteriaChange: (criteria: FilterData[]) => void;
}

const ICPDefinitionStepV2 = ({ 
  businessType,
  emailScoring, 
  onEmailScoringChange, 
  fitCriteria, 
  onFitCriteriaChange 
}: ICPDefinitionStepV2Props) => {
  return (
    <div className="space-y-6">
      {/* Lead Scoring Education Section */}
      <LeadScoringEducation />

      {/* Target Display */}
      <BusinessTargetDisplay businessType={businessType} />

      {/* Email Type Scoring */}
      <EmailTypeScoringCard 
        emailScoring={emailScoring}
        onEmailScoringChange={onEmailScoringChange}
      />

      {/* Lead Scoring Illustration */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-gray-800">Advanced Lead Scoring Preview</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            See how comprehensive lead scoring works across multiple criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <LeadScoringIllustration />
        </CardContent>
      </Card>
    </div>
  );
};

export default ICPDefinitionStepV2;
