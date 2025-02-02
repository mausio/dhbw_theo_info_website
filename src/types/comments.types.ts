export interface Comment {
  id: string;
  text: string;
  author: string;
  authorId: string;
  timestamp: Date;
  parentId?: string;
  replies?: Comment[];
} 