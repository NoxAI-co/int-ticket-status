export interface CreateTaskPayload {
  name: string;
  markdown_description: string;
  priority: number;
  notify_all?: boolean;
}

export interface ClickUpTask {
  id: string;
  name: string;
  description?: string;
  status?: {
    status: string;
    color: string;
  };
  priority?: {
    priority: string;
    color: string;
  };
  attachments?: Array<{
    id: string;
    url: string;
    title: string;
    date: string;
    extension: string;
  }>;

  custom_fields?: Array<{
    id: string;
    name: string;
    type: string;
    value: string | number;
    type_config?: {
      sorting?: string;
      new_drop_down?: boolean;
      options?: Array<{
        id: string;
        name: string;
        color: string;
        orderindex: number;
      }>;
    };
  }>;

  due_date?: string;

  assignees?: Array<{
    id: number;
    username: string;
    email: string;
    profilePicture?: string;
  }>;
}

export interface ClickUpComment {
  id: string;
  comment:
    | Array<{
        text: string;
        attributes: Record<string, any>;
      }>
    | string;
  comment_text: string;
  user: {
    id: number;
    username: string;
    email: string;
    profilePicture?: string;
    color?: string | null;
    initials?: string;
  };
  date: string;
  reply_count?: number;
  reactions?: Array<any>;
  assignee?: any | null;
  group_assignee?: any | null;
}
