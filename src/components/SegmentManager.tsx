
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Segment {
  id: string;
  name: string;
  filters: {
    emailType?: string;
    score?: string;
    region?: string;
    industry?: string;
    title?: string;
    qualified?: boolean;
  };
  color: string;
}

interface SegmentManagerProps {
  segments: Segment[];
  onSegmentCreate: (segment: Omit<Segment, 'id'>) => void;
  onSegmentDelete: (segmentId: string) => void;
  activeSegment: string | null;
  onSegmentSelect: (segmentId: string | null) => void;
}

const SegmentManager = ({
  segments,
  onSegmentCreate,
  onSegmentDelete,
  activeSegment,
  onSegmentSelect
}: SegmentManagerProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSegment, setNewSegment] = useState({
    name: "",
    filters: {
      emailType: "none" as string,
      score: "none" as string,
      region: "none" as string,
      industry: "none" as string,
      title: "none" as string,
      qualified: "none" as string,
    },
    color: "#3b82f6"
  });
  const { toast } = useToast();

  const handleCreateSegment = () => {
    if (!newSegment.name.trim()) {
      toast({
        title: "Error",
        description: "Segment name is required",
        variant: "destructive",
      });
      return;
    }

    // Filter out "none" values and convert qualified filter to boolean
    const cleanFilters: any = {};
    
    if (newSegment.filters.emailType !== "none") {
      cleanFilters.emailType = newSegment.filters.emailType;
    }
    if (newSegment.filters.score !== "none") {
      cleanFilters.score = newSegment.filters.score;
    }
    if (newSegment.filters.region !== "none") {
      cleanFilters.region = newSegment.filters.region;
    }
    if (newSegment.filters.industry !== "none") {
      cleanFilters.industry = newSegment.filters.industry;
    }
    if (newSegment.filters.title !== "none") {
      cleanFilters.title = newSegment.filters.title;
    }
    if (newSegment.filters.qualified !== "none") {
      cleanFilters.qualified = newSegment.filters.qualified === "true";
    }

    onSegmentCreate({
      name: newSegment.name,
      filters: cleanFilters,
      color: newSegment.color
    });
    
    setNewSegment({ 
      name: "", 
      filters: {
        emailType: "none",
        score: "none",
        region: "none",
        industry: "none",
        title: "none",
        qualified: "none",
      }, 
      color: "#3b82f6" 
    });
    setIsCreateDialogOpen(false);
    toast({
      title: "Segment Created",
      description: `"${newSegment.name}" segment has been created`,
    });
  };

  const colors = [
    "#3b82f6", "#ef4444", "#10b981", "#f59e0b", 
    "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Lead Segments
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Segment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Segment</DialogTitle>
                <DialogDescription>
                  Define filters to create a custom lead segment
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <Label htmlFor="segment-name">Segment Name</Label>
                  <Input
                    id="segment-name"
                    value={newSegment.name}
                    onChange={(e) => setNewSegment(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter segment name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email Type Filter</Label>
                    <Select
                      value={newSegment.filters.emailType}
                      onValueChange={(value) => setNewSegment(prev => ({
                        ...prev,
                        filters: { ...prev.filters, emailType: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select email type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Filter</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Abusive">Abusive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Score Filter</Label>
                    <Select
                      value={newSegment.filters.score}
                      onValueChange={(value) => setNewSegment(prev => ({
                        ...prev,
                        filters: { ...prev.filters, score: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select score range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Filter</SelectItem>
                        <SelectItem value="High">High Score</SelectItem>
                        <SelectItem value="Medium">Medium Score</SelectItem>
                        <SelectItem value="Low">Low Score</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Region Filter</Label>
                    <Select
                      value={newSegment.filters.region}
                      onValueChange={(value) => setNewSegment(prev => ({
                        ...prev,
                        filters: { ...prev.filters, region: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Filter</SelectItem>
                        <SelectItem value="North America">North America</SelectItem>
                        <SelectItem value="Europe">Europe</SelectItem>
                        <SelectItem value="Asia">Asia</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Industry Filter</Label>
                    <Select
                      value={newSegment.filters.industry}
                      onValueChange={(value) => setNewSegment(prev => ({
                        ...prev,
                        filters: { ...prev.filters, industry: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Filter</SelectItem>
                        <SelectItem value="SaaS">SaaS</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="Tech">Tech</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Title Filter</Label>
                    <Select
                      value={newSegment.filters.title}
                      onValueChange={(value) => setNewSegment(prev => ({
                        ...prev,
                        filters: { ...prev.filters, title: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Filter</SelectItem>
                        <SelectItem value="CEO">CEO</SelectItem>
                        <SelectItem value="CTO">CTO</SelectItem>
                        <SelectItem value="VP Sales">VP Sales</SelectItem>
                        <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Director">Director</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Qualification Status</Label>
                    <Select
                      value={newSegment.filters.qualified}
                      onValueChange={(value) => setNewSegment(prev => ({
                        ...prev,
                        filters: { ...prev.filters, qualified: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Filter</SelectItem>
                        <SelectItem value="true">Qualified</SelectItem>
                        <SelectItem value="false">Unqualified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Color</Label>
                  <div className="flex space-x-2 mt-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${
                          newSegment.color === color ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewSegment(prev => ({ ...prev, color }))}
                      />
                    ))}
                  </div>
                </div>

                <Button onClick={handleCreateSegment} className="w-full">
                  Create Segment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>
          Manage and apply different segments to filter your leads
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeSegment === null ? "default" : "outline"}
            size="sm"
            onClick={() => onSegmentSelect(null)}
          >
            All Leads
          </Button>
          {segments.map(segment => (
            <div key={segment.id} className="flex items-center">
              <Button
                variant={activeSegment === segment.id ? "default" : "outline"}
                size="sm"
                onClick={() => onSegmentSelect(segment.id)}
                className="rounded-r-none"
                style={{
                  backgroundColor: activeSegment === segment.id ? segment.color : undefined,
                  borderColor: segment.color
                }}
              >
                {segment.name}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-l-none border-l-0 px-2"
                onClick={() => onSegmentDelete(segment.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SegmentManager;
