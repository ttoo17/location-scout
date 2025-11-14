
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { MessageSquare, Reply, User, Clock, Search, Filter, Mail, MailOpen, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  from: string;
  email: string;
  subject: string;
  message: string;
  property?: string;
  timestamp: string;
  status: "unread" | "read" | "replied";
  priority: "low" | "medium" | "high";
}

const MessageCenter = () => {
  const { toast } = useToast();
  
  // Pagination and filtering states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  // Mock data - in real app this would be much larger
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      from: "Sarah Johnson",
      email: "sarah@photoagency.com",
      subject: "Inquiry about Boracay Beach Resort",
      message: "Hi! I'm interested in booking your Boracay location for a fashion photoshoot next month. Could you provide more details about availability and pricing?",
      property: "Boracay Beach Resort",
      timestamp: "2 hours ago",
      status: "unread",
      priority: "high"
    },
    {
      id: "2",
      from: "Mike Chen",
      email: "mike@filmcorp.com",
      subject: "Mountain Location for Film Project",
      message: "We're scouting locations for an upcoming film and your Baguio property caught our attention. Would love to discuss rates for a 5-day shoot.",
      property: "Baguio Mountain View",
      timestamp: "1 day ago",
      status: "read",
      priority: "medium"
    },
    {
      id: "3",
      from: "Lisa Wong",
      email: "lisa@weddings.com",
      subject: "Wedding Photography Session",
      message: "Looking for a romantic beach location for a pre-wedding shoot. Your Boracay property seems perfect. What's your availability in February?",
      property: "Boracay Beach Resort",
      timestamp: "3 days ago",
      status: "replied",
      priority: "low"
    }
    // In real app, this would have thousands of messages
  ]);

  // Filter and pagination logic
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    // For timestamp, we'd use actual Date objects in real app
    if (sortBy === "timestamp") {
      return sortOrder === "desc" ? b.id - a.id : a.id - b.id;
    }
    
    const aValue = a[sortBy as keyof Message];
    const bValue = b[sortBy as keyof Message];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const totalPages = Math.ceil(sortedMessages.length / itemsPerPage);
  const paginatedMessages = sortedMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReply = (messageId: number) => {
    if (!replyText.trim()) return;
    
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status: "replied" as const } : msg
    ));
    
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully."
    });
    
    setReplyingTo(null);
    setReplyText("");
  };

  const markAsRead = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId && msg.status === "unread" 
        ? { ...msg, status: "read" as const } 
        : msg
    ));
  };

  const bulkMarkAsRead = () => {
    if (selectedMessages.length === 0) return;
    
    setMessages(messages.map(msg => 
      selectedMessages.includes(msg.id) 
        ? { ...msg, status: "read" as const }
        : msg
    ));
    
    setSelectedMessages([]);
    toast({ title: "Messages marked as read" });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread": return <Mail className="h-4 w-4 text-red-500" />;
      case "read": return <MailOpen className="h-4 w-4 text-yellow-500" />;
      case "replied": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Mail className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const unreadCount = messages.filter(msg => msg.status === "unread").length;

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-coral-500" />
                Messages ({filteredMessages.length})
              </CardTitle>
              {unreadCount > 0 && (
                <Badge className="bg-red-500">{unreadCount} unread</Badge>
              )}
            </div>
            
            {selectedMessages.length > 0 && (
              <div className="flex gap-2">
                <Button size="sm" onClick={bulkMarkAsRead}>
                  Mark as Read ({selectedMessages.length})
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedMessages([])}>
                  Clear Selection
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedMessages.length === paginatedMessages.length && paginatedMessages.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMessages(paginatedMessages.map(m => m.id));
                      } else {
                        setSelectedMessages([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMessages.map((message) => (
                <TableRow 
                  key={message.id} 
                  className={`hover:bg-muted/50 ${message.status === "unread" ? "bg-red-50/50" : ""}`}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(message.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMessages([...selectedMessages, message.id]);
                        } else {
                          setSelectedMessages(selectedMessages.filter(id => id !== message.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{getStatusIcon(message.status)}</TableCell>
                  <TableCell>
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(message.priority)}`} />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{message.from}</div>
                      <div className="text-sm text-muted-foreground">{message.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{message.subject}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                      {message.message}
                    </div>
                  </TableCell>
                  <TableCell>
                    {message.property && (
                      <Badge variant="outline" className="text-coral-600">
                        {message.property}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {message.timestamp}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {message.status === "unread" && (
                        <Button size="sm" variant="ghost" onClick={() => markAsRead(message.id)}>
                          <MailOpen className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setReplyingTo(message.id)}
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedMessages.length)} of {sortedMessages.length} messages
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                return (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Reply Modal */}
      {replyingTo && (
        <Card className="border-2 border-coral-500">
          <CardHeader>
            <CardTitle>Reply to Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
              className="mb-3"
            />
            <div className="flex gap-2">
              <Button 
                className="bg-coral-500 hover:bg-coral-600"
                onClick={() => handleReply(replyingTo)}
              >
                Send Reply
              </Button>
              <Button 
                variant="outline"
                onClick={() => setReplyingTo(null)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MessageCenter;
