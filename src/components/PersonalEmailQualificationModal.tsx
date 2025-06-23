
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalEmailQualificationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  personalLeads: Array<{
    id: number;
    email: string;
    region: string;
    industry: string;
    title: string;
  }>;
  onQualifyLeads: (leadIds: number[]) => void;
}

const PersonalEmailQualificationModal = ({
  isOpen,
  onOpenChange,
  personalLeads,
  onQualifyLeads
}: PersonalEmailQualificationModalProps) => {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const { toast } = useToast();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(personalLeads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId: number, checked: boolean) => {
    if (checked) {
      setSelectedLeads(prev => [...prev, leadId]);
    } else {
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    }
  };

  const handleQualify = () => {
    if (selectedLeads.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select at least one lead to qualify",
        variant: "destructive",
      });
      return;
    }

    onQualifyLeads(selectedLeads);
    setSelectedLeads([]);
    onOpenChange(false);
    
    toast({
      title: "Leads Qualified",
      description: `${selectedLeads.length} personal email lead(s) have been qualified`,
    });
  };

  const getDomainFromEmail = (email: string) => {
    return email.split('@')[1];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <span>Personal Email Domain Qualification</span>
          </DialogTitle>
          <DialogDescription>
            Review and qualify personal email addresses that may represent legitimate business contacts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Personal Email Review Required</h4>
              <p className="text-sm text-yellow-700 mt-1">
                The following leads use personal email domains but may still be valid business contacts. 
                Please review and select which ones to qualify based on their job titles and industries.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedLeads.length === personalLeads.length}
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                Select All ({personalLeads.length} leads)
              </label>
            </div>
            <Badge variant="outline">
              {selectedLeads.length} selected
            </Badge>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700">
                <div>Email Address</div>
                <div>Domain</div>
                <div>Job Title</div>
                <div>Industry</div>
                <div>Region</div>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {personalLeads.map((lead) => (
                <div key={lead.id} className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50">
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`lead-${lead.id}`}
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                      />
                      <span className="text-sm font-medium">{lead.email}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <Badge variant="outline" className="text-xs">
                        {getDomainFromEmail(lead.email)}
                      </Badge>
                    </div>
                    <div className="text-sm">{lead.title}</div>
                    <div className="text-sm">{lead.industry}</div>
                    <div className="text-sm">{lead.region}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Skip for Now
            </Button>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setSelectedLeads([])}
                disabled={selectedLeads.length === 0}
              >
                Clear Selection
              </Button>
              <Button 
                onClick={handleQualify}
                disabled={selectedLeads.length === 0}
              >
                Qualify Selected ({selectedLeads.length})
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalEmailQualificationModal;
