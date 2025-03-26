import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useComments } from '../../context/comments.context';
import { Comment } from '../../types/comments.types';
import styled from 'styled-components';
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

// Define the missing styled components
const CommentUser = styled.strong`
  color: black;
  margin-right: 8px;
`;

const CommentTime = styled.span`
  color: #666;
  font-size: 0.9em;
`;

const ReplyFormContainer = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const CommentTextArea = styled(CommentInput)`
  width: 100%;
  min-height: 60px;
`;

const NewCommentTextArea = styled(CommentInput)`
  width: 100%;
  margin-top: 20px;
`;

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
                <SingleComment key={reply.id} data-reply={true}>
                  <CommentUser>{reply.author}</CommentUser>
                  <CommentTime>{formatDate(reply.timestamp)}</CommentTime>
                  <CommentText>{reply.text}</CommentText>
                </SingleComment>
              ))}

              {showReplyForm[comment.id] && (
                  <ReplyFormContainer>
                    <CommentTextArea
                      value={replyText[comment.id] || ''}
                      onChange={(e) => handleReplyChange(comment.id, e)}
                      placeholder={t('general.comment.replyPlaceholder')}
                      maxLength={MAX_COMMENT_LENGTH}
                    />
                    <CharacterCount data-near-limit={isNearLimit(getRemainingCharacters(replyText[comment.id] || ''))}>
                      {getRemainingCharacters(replyText[comment.id] || '')} {t('general.comment.charactersLeft')}
                    </CharacterCount>
                    <Button 
                      type="submit" 
                      disabled={(replyText[comment.id]?.length || 0) === 0 || (replyText[comment.id]?.length || 0) > MAX_COMMENT_LENGTH}
                    >
                      {t('comments.postReply')}
                    </Button>
                  </ReplyFormContainer>
              )}
            </SingleComment>
          ))}
            </SideSpacer>

          <NewCommentTextArea
            value={newComment}
            onChange={handleCommentChange}
            placeholder={t('general.comment.newCommentPlaceholder')}
            maxLength={MAX_COMMENT_LENGTH}
          />
          <CharacterCount data-near-limit={isNearLimit(getRemainingCharacters(newComment))}>
            {getRemainingCharacters(newComment)} {t('general.comment.charactersLeft')}
          </CharacterCount>
        
      </SideSpacer>
    </CommentContainer>
  );
};

export default CommentSection; 