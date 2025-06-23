
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Segment {
  id: string;
  name: string;
  filters: {
    emailType?: string;
    score?: string;
    qualified?: boolean;
    region?: string;
    industry?: string;
  };
  color: string;
}

interface SegmentManagerProps {
  segments: Segment[];
  onSegmentCreate: (segment: Omit<Segment, 'id'>) => void;
  onSegmentDelete: (segmentId: string) => void;
  activeSegment: string | null;
  onSegmentSelect: (segmentId: string | null) => void;
  title?: string;
}

const SegmentManager = ({ 
  segments, 
  onSegmentCreate, 
  onSegmentDelete, 
  activeSegment, 
  onSegmentSelect,
  title = "Lead Segments"
}: SegmentManagerProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newSegmentName, setNewSegmentName] = useState("");
  const [newSegmentFilters, setNewSegmentFilters] = useState({
    emailType: "",
    score: "",
    qualified: "",
    region: "",
    industry: ""
  });
  const [newSegmentColor, setNewSegmentColor] = useState("#3b82f6");
  const { toast } = useToast();

  const handleCreateSegment = () => {
    if (!newSegmentName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for the segment.",
        variant: "destructive",
      });
      return;
    }

    const filters: Segment['filters'] = {};
    if (newSegmentFilters.emailType) filters.emailType = newSegmentFilters.emailType;
    if (newSegmentFilters.score) filters.score = newSegmentFilters.score;
    if (newSegmentFilters.qualified !== "") filters.qualified = newSegmentFilters.qualified === "true";
    if (newSegmentFilters.region) filters.region = newSegmentFilters.region;
    if (newSegmentFilters.industry) filters.industry = newSegmentFilters.industry;

    onSegmentCreate({
      name: newSegmentName,
      filters,
      color: newSegmentColor
    });

    // Reset form
    setNewSegmentName("");
    setNewSegmentFilters({
      emailType: "",
      score: "",
      qualified: "",
      region: "",
      industry: ""
    });
    setNewSegmentColor("#3b82f6");
    setIsCreateModalOpen(false);

    toast({
      title: "Segment Created",
      description: `"${newSegmentName}" segment has been created successfully.`,
    });
  };

  const getSegmentCount = (segment: Segment) => {
    // Mock count for demonstration
    return Math.floor(Math.random() * 500) + 50;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                {title}
              </CardTitle>
              <CardDescription>
                Create custom segments to analyze specific lead groups
              </CardDescription>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Segment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeSegment === null ? "default" : "outline"}
                size="sm"
                onClick={() => onSegmentSelect(null)}
              >
                All Leads
              </Button>
              {segments.map((segment) => (
                <div key={segment.id} className="flex items-center space-x-1">
                  <Button
                    variant={activeSegment === segment.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSegmentSelect(segment.id)}
                    className="flex items-center space-x-2"
                    style={{ 
                      backgroundColor: activeSegment === segment.id ? segment.color : undefined,
                      borderColor: segment.color 
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: segment.color }}
                    />
                    <span>{segment.name}</span>
                    <Badge variant="secondary" className="ml-1">
                      {getSegmentCount(segment)}
                    </Badge>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSegmentDelete(segment.id)}
                    className="p-1 h-6 w-6 text-red-500 hover:text-red-700"
                    disabled={segment.id === "qualified" || segment.id === "unqualified"}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Segment Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Segment</DialogTitle>
            <DialogDescription>
              Define filters to create a custom lead segment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="segmentName">Segment Name</Label>
              <Input
                id="segmentName"
                value={newSegmentName}
                onChange={(e) => setNewSegmentName(e.target.value)}
                placeholder="Enter segment name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email Type</Label>
                <Select value={newSegmentFilters.emailType} onValueChange={(value) => 
                  setNewSegmentFilters(prev => ({ ...prev, emailType: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Abusive">Abusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Score</Label>
                <Select value={newSegmentFilters.score} onValueChange={(value) => 
                  setNewSegmentFilters(prev => ({ ...prev, score: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Qualified Status</Label>
                <Select value={newSegmentFilters.qualified} onValueChange={(value) => 
                  setNewSegmentFilters(prev => ({ ...prev, qualified: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="true">Qualified</SelectItem>
                    <SelectItem value="false">Unqualified</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Region</Label>
                <Select value={newSegmentFilters.region} onValueChange={(value) => 
                  setNewSegmentFilters(prev => ({ ...prev, region: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Industry</Label>
              <Select value={newSegmentFilters.industry} onValueChange={(value) => 
                setNewSegmentFilters(prev => ({ ...prev, industry: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Segment Color</Label>
              <div className="flex space-x-2 mt-2">
                {["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#f97316"].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${newSegmentColor === color ? 'border-gray-800' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewSegmentColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSegment}>
                Create Segment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SegmentManager;
