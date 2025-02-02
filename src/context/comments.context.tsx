import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initialComments } from '../../static/initialData/comments';
import { Comment } from '../types/comments.types';

interface CommentsContextType {
  comments: Record<string, Comment[]>;
  currentUser: { id: string; name: string };
  addComment: (algorithmId: string, comment: Omit<Comment, 'id' | 'timestamp' | 'authorId'>) => void;
  deleteComment: (algorithmId: string, commentId: string) => void;
  addReply: (algorithmId: string, parentId: string, reply: Omit<Comment, 'id' | 'timestamp' | 'parentId' | 'authorId'>) => void;
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

// In a real app, this would come from authentication
const currentUser = {
  id: 'anonymous_user',
  name: 'Anonymous User'
};

export const CommentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<Record<string, Comment[]>>(initialComments);

  const addComment = (algorithmId: string, comment: Omit<Comment, 'id' | 'timestamp' | 'authorId'>) => {
    setComments(prev => ({
      ...prev,
      [algorithmId]: [
        ...(prev[algorithmId] || []),
        {
          ...comment,
          id: uuidv4(),
          timestamp: new Date(),
          authorId: currentUser.id
        }
      ]
    }));
  };

  const deleteComment = (algorithmId: string, commentId: string) => {
    setComments(prev => ({
      ...prev,
      [algorithmId]: prev[algorithmId].filter(comment => {
        // Only allow deletion if the user owns the comment
        if (comment.id === commentId) {
          return comment.authorId !== currentUser.id;
        }
        if (comment.replies) {
          comment.replies = comment.replies.filter(reply => {
            if (reply.id === commentId) {
              return reply.authorId !== currentUser.id;
            }
            return true;
          });
        }
        return true;
      })
    }));
  };

  const addReply = (algorithmId: string, parentId: string, reply: Omit<Comment, 'id' | 'timestamp' | 'parentId' | 'authorId'>) => {
    setComments(prev => ({
      ...prev,
      [algorithmId]: prev[algorithmId].map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                ...reply,
                id: uuidv4(),
                timestamp: new Date(),
                parentId,
                authorId: currentUser.id
              }
            ]
          };
        }
        return comment;
      })
    }));
  };

  return (
    <CommentsContext.Provider value={{ comments, currentUser, addComment, deleteComment, addReply }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentsProvider');
  }
  return context;
}; 