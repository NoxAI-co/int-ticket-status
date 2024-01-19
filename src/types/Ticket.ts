export interface Ticket {
  name: string;
  description: string;
  status: TicketStatus;
  date_created: number;
  date_updated: string;
  assignees: User[];
  priority: TicketPriority;
}

interface TicketStatus {
  status: string;
  color: string;
  orderindex: number;
  type: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

interface TicketPriority {
  priority: string;
  color: string;
  orderindex: number;
}

export interface TicketCommentResponse {
  comments: TicketComment[];
}

export interface TicketComment {
  comment_text: string;
  date: number;
  id: number;
  user: User;
}

