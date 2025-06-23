
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Target, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LeadQualificationGoalProps {
  currentRate: number;
  goal: number;
  onGoalUpdate: (newGoal: number) => void;
}

const LeadQualificationGoal = ({ currentRate, goal, onGoalUpdate }: LeadQualificationGoalProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState(goal);
  const { toast } = useToast();

  const getProgressLevel = () => {
    const percentage = (currentRate / goal) * 100;
    if (percentage < 50) return "Needs Work";
    if (percentage < 80) return "Good Progress";
    return "Excellent";
  };

  const getProgressColor = () => {
    const percentage = (currentRate / goal) * 100;
    if (percentage < 50) return "bg-red-400";
    if (percentage < 80) return "bg-yellow-400";
    return "bg-green-400";
  };

  const getProgressWidth = () => {
    return Math.min((currentRate / goal) * 100, 100);
  };

  const handleGoalUpdate = () => {
    if (newGoal > 0 && newGoal <= 100) {
      onGoalUpdate(newGoal);
      setIsEditModalOpen(false);
      toast({
        title: "Goal Updated",
        description: `Lead qualification goal updated to ${newGoal}%`,
      });
    }
  };

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-slate-900">6-Month Qualification Goal Tracking</CardTitle>
                <p className="text-slate-600 mt-1">Set and monitor your long-term qualification objectives</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-700">Goal: {goal}%</div>
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => setIsEditModalOpen(true)}
                className="text-blue-600 p-0 h-auto"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Goal
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="text-4xl font-bold text-red-600 mb-2">{currentRate}%</div>
            <div className="text-slate-600">Current 6-month qualification</div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Progress Level</span>
              <span className="text-lg font-semibold">{currentRate}%</span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-12 flex overflow-hidden">
                {/* Needs Work Section */}
                <div className="bg-red-200 flex-1 flex items-center justify-center relative">
                  <span className="text-sm font-medium text-slate-700">Needs Work</span>
                  <div className="absolute bottom-1 text-xs text-slate-500">0% - 50%</div>
                </div>
                
                {/* Good Progress Section */}
                <div className="bg-yellow-200 flex-1 flex items-center justify-center relative">
                  <span className="text-sm font-medium text-slate-700">Good Progress</span>
                  <div className="absolute bottom-1 text-xs text-slate-500">50% - 80%</div>
                  
                  {/* "You are here" indicator */}
                  {currentRate >= 50 && currentRate < 80 && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium relative">
                        You are here
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Excellent Section */}
                <div className="bg-green-200 flex-1 flex items-center justify-center relative">
                  <span className="text-sm font-medium text-slate-700">Excellent</span>
                  <div className="absolute bottom-1 text-xs text-slate-500">80% - 100%</div>
                </div>
              </div>
              
              {/* Progress indicator dot */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg"
                style={{ 
                  left: `${getProgressWidth()}%`,
                  backgroundColor: currentRate < 50 ? '#ef4444' : currentRate < 80 ? '#f59e0b' : '#10b981'
                }}
              />
              
              {/* "You are here" for other sections */}
              {currentRate < 50 && (
                <div className="absolute -top-8 left-1/4 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium relative">
                    You are here
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
                  </div>
                </div>
              )}
              
              {currentRate >= 80 && (
                <div className="absolute -top-8 right-1/4 transform translate-x-1/2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium relative">
                    You are here
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Goal Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Qualification Goal</DialogTitle>
            <DialogDescription>
              Set your target lead qualification rate for the next 6 months
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal">Goal Percentage (%)</Label>
              <Input
                id="goal"
                type="number"
                value={newGoal}
                onChange={(e) => setNewGoal(Number(e.target.value))}
                min="1"
                max="100"
                placeholder="Enter goal percentage"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleGoalUpdate}>
                Update Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeadQualificationGoal;
