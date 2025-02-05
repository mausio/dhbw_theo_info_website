import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useComments } from '../../context/comments.context';
import { Comment } from '../../types/comments.types';
import {
  SideSpacer,
  CommentContainer,
  SingleComment,
  CommentForm,
  CommentInput,
  Button,
  DeleteButton,
  CommentHeader,
  CommentMetadata,
  CharacterCount,
  CommentText,
  ButtonGroup,
  CommentTitle
} from '../../styles/comment.styles';

interface CommentSectionProps {
  algorithmId: string;
}

const MAX_COMMENT_LENGTH = 500;

const CommentSection: React.FC<CommentSectionProps> = ({ algorithmId }) => {
  const { t } = useTranslation();
  const { comments, currentUser, addComment, deleteComment, addReply } = useComments();
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [showReplyForm, setShowReplyForm] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && newComment.length <= MAX_COMMENT_LENGTH) {
      addComment(algorithmId, {
        text: newComment,
        author: currentUser.name,
      });
      setNewComment('');
    }
  };

  const handleReply = (parentId: string) => {
    const replyContent = replyText[parentId];
    if (replyContent?.trim() && replyContent.length <= MAX_COMMENT_LENGTH) {
      addReply(algorithmId, parentId, {
        text: replyContent,
        author: currentUser.name,
      });
      setReplyText(prev => ({ ...prev, [parentId]: '' }));
      setShowReplyForm(prev => ({ ...prev, [parentId]: false }));
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_COMMENT_LENGTH) {
      setNewComment(value);
    }
  };

  const handleReplyChange = (parentId: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_COMMENT_LENGTH) {
      setReplyText(prev => ({ ...prev, [parentId]: value }));
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const getRemainingCharacters = (text: string) => {
    return MAX_COMMENT_LENGTH - text.length;
  };

  const isNearLimit = (remaining: number) => {
    return remaining <= 50;
  };

  return (
    <CommentContainer>
      <CommentTitle>Comments</CommentTitle>
      
        <SideSpacer>
        <SideSpacer>
          {comments[algorithmId]?.map((comment: Comment) => (
            <SingleComment key={comment.id}>
              <CommentHeader>
                <CommentMetadata>
                  <strong>{comment.author}</strong> • {formatDate(comment.timestamp)}
                </CommentMetadata>
                <ButtonGroup>
                  <Button onClick={() => setShowReplyForm(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}>
                    {t('comments.reply')}
                  </Button>
                  {comment.authorId === currentUser.id && (
                    <DeleteButton onClick={() => deleteComment(algorithmId, comment.id)}>
                      {t('comments.delete')}
                    </DeleteButton>
                  )}
                </ButtonGroup>
              </CommentHeader>
              
              <CommentText>{comment.text}</CommentText>

              {comment.replies?.map((reply: Comment) => (
                <SingleComment key={reply.id} isReply>
                  <CommentHeader>
                    <CommentMetadata>
                      <strong>{reply.author}</strong> • {formatDate(reply.timestamp)}
                    </CommentMetadata>
                    {reply.authorId === currentUser.id && (
                      <DeleteButton onClick={() => deleteComment(algorithmId, reply.id)}>
                        {t('comments.delete')}
                      </DeleteButton>
                    )}
                  </CommentHeader>
                  <CommentText>{reply.text}</CommentText>
                </SingleComment>
              ))}

              {showReplyForm[comment.id] && (
                  <CommentForm isReply onSubmit={(e) => { e.preventDefault(); handleReply(comment.id); }}>
                    <CommentInput
                      value={replyText[comment.id] || ''}
                      onChange={(e) => handleReplyChange(comment.id, e)}
                      placeholder={t('comments.replyPlaceholder')}
                      maxLength={MAX_COMMENT_LENGTH}
                    />
                    <CharacterCount isNearLimit={isNearLimit(getRemainingCharacters(replyText[comment.id] || ''))}>
                      {t('comments.charactersRemaining', { count: getRemainingCharacters(replyText[comment.id] || '') })}
                    </CharacterCount>
                    <Button 
                      type="submit" 
                      disabled={(replyText[comment.id]?.length || 0) === 0 || (replyText[comment.id]?.length || 0) > MAX_COMMENT_LENGTH}
                    >
                      {t('comments.postReply')}
                    </Button>
                  </CommentForm>
              )}
            </SingleComment>
          ))}
            </SideSpacer>

          <CommentForm onSubmit={handleSubmit}>
            <CommentInput
              value={newComment}
              onChange={handleCommentChange}
              placeholder={t('comments.writePlaceholder')}
              maxLength={MAX_COMMENT_LENGTH}
            />
            <CharacterCount isNearLimit={isNearLimit(getRemainingCharacters(newComment))}>
              {t('comments.charactersRemaining', { count: getRemainingCharacters(newComment) })}
            </CharacterCount>
            <Button type="submit" disabled={newComment.length === 0 || newComment.length > MAX_COMMENT_LENGTH}>
              {t('comments.postComment')}
            </Button>
          </CommentForm>
        
      </SideSpacer>
    </CommentContainer>
  );
};

export default CommentSection; 