import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowUpDown, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Segment } from "./SegmentManager";

interface Lead {
  id: number;
  email: string;
  type: string;
  score: string;
  qualified: boolean;
  region: string;
  industry: string;
  title: string;
}

interface LeadTableProps {
  leads: Lead[];
  activeSegment: string | null;
  segments: Segment[];
  onQualifyLead: (leadId: number) => void;
}

type SortField = keyof Lead;
type SortDirection = 'asc' | 'desc';

const LeadTable = ({ leads, activeSegment, segments, onQualifyLead }: LeadTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [qualifiedFilter, setQualifiedFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>('email');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const filteredAndSortedLeads = useMemo(() => {
    let filtered = leads;

    // Apply segment filter
    if (activeSegment) {
      const segment = segments.find(s => s.id === activeSegment);
      if (segment) {
        filtered = filtered.filter(lead => {
          if (segment.filters.emailType && lead.type !== segment.filters.emailType) return false;
          if (segment.filters.score && lead.score !== segment.filters.score) return false;
          if (segment.filters.region && lead.region !== segment.filters.region) return false;
          if (segment.filters.industry && lead.industry !== segment.filters.industry) return false;
          if (segment.filters.qualified !== undefined && lead.qualified !== segment.filters.qualified) return false;
          return true;
        });
      }
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (typeFilter && typeFilter !== "all") {
      filtered = filtered.filter(lead => lead.type === typeFilter);
    }

    // Apply score filter
    if (scoreFilter && scoreFilter !== "all") {
      filtered = filtered.filter(lead => lead.score === scoreFilter);
    }

    // Apply qualified filter
    if (qualifiedFilter && qualifiedFilter !== "all") {
      const isQualified = qualifiedFilter === 'qualified';
      filtered = filtered.filter(lead => lead.qualified === isQualified);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === 'boolean') {
        aValue = aValue ? 1 : 0;
        bValue = bValue ? 1 : 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [leads, activeSegment, segments, searchTerm, typeFilter, scoreFilter, qualifiedFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getScoreBadge = (score: string) => {
    const colors = {
      High: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-red-100 text-red-800"
    };
    return <Badge className={colors[score as keyof typeof colors]}>{score}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      Business: "bg-blue-100 text-blue-800",
      Personal: "bg-purple-100 text-purple-800",
      Abusive: "bg-red-100 text-red-800"
    };
    return <Badge variant="outline" className={colors[type as keyof typeof colors]}>{type}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Breakdown with Advanced Filtering</CardTitle>
        <CardDescription>
          Filter, sort, and segment your leads with advanced controls
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Abusive">Abusive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={scoreFilter} onValueChange={setScoreFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Scores" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scores</SelectItem>
              <SelectItem value="High">High Score</SelectItem>
              <SelectItem value="Medium">Medium Score</SelectItem>
              <SelectItem value="Low">Low Score</SelectItem>
            </SelectContent>
          </Select>

          <Select value={qualifiedFilter} onValueChange={setQualifiedFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="unqualified">Unqualified</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredAndSortedLeads.length} of {leads.length} leads
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('email')}
                    className="h-auto p-0 font-medium"
                  >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('type')}
                    className="h-auto p-0 font-medium"
                  >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('score')}
                    className="h-auto p-0 font-medium"
                  >
                    Score
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('qualified')}
                    className="h-auto p-0 font-medium"
                  >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('region')}
                    className="h-auto p-0 font-medium"
                  >
                    Region
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('industry')}
                    className="h-auto p-0 font-medium"
                  >
                    Industry
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('title')}
                    className="h-auto p-0 font-medium"
                  >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.email}</TableCell>
                  <TableCell>{getTypeBadge(lead.type)}</TableCell>
                  <TableCell>{getScoreBadge(lead.score)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {lead.qualified ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={lead.qualified ? "text-green-600" : "text-red-600"}>
                        {lead.qualified ? "Qualified" : "Unqualified"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{lead.region}</TableCell>
                  <TableCell>{lead.industry}</TableCell>
                  <TableCell>{lead.title}</TableCell>
                  <TableCell>
                    {!lead.qualified && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onQualifyLead(lead.id)}
                        className="text-xs"
                      >
                        Mark as Qualified
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadTable;
