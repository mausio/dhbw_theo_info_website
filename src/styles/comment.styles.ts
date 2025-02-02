import styled from 'styled-components';
import { GenericMainContainer } from './general/generic.style';

export const SideSpacer = styled.div`
  width: auto;
  margin: 0 40px;
`;

export const CommentContainer = styled(GenericMainContainer)`
  width: 80%;
  min-width: 300px;
  max-width: 1100px; 
  height: 100%;
  inset: 0;
  margin: 5px auto 25px auto;
  padding: 35px 20px;
  border-radius: 5px;
  backdrop-filter: brightness(100) opacity(1);

  -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);

  overflow: hidden;
`;

export const SingleComment = styled.div<{ isReply?: boolean }>`
  padding: 15px 20px;
  margin: ${props => props.isReply ? '10px 0 10px 50px' : '15px 0'};
  border-radius: 10px;
  border: 1px solid darkgray;
  box-shadow: rgb(0, 0, 0, 0.5) 2px 2px 5px 0px inset;
  
  ${props => props.isReply ? `
    background: white;
  ` : `
    background: radial-gradient(white, color-mix(in srgb, var(--primary), white 92%) 95%);
  `}
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid darkgray;
  box-shadow: rgb(0, 0, 0, 0.1) 2px 2px 5px 0px;
`;

export const CommentInput = styled.textarea`
  width: auto;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 80px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
    background: radial-gradient(white, color-mix(in srgb, var(--primary), white 95%) 95%);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary), white 80%);
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid var(--primary);
  border-radius: 8px;
  background: white;
  color: var(--black);
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  box-shadow: rgb(0, 0, 0, 0.9) 1.5px 1.5px 1px 0px;

  &:hover:not(:disabled) {
    background: color-mix(in srgb, var(--primary), white 90%);
  }

  &:active:not(:disabled) {
    box-shadow: rgb(0, 0, 0, 0.9) 2px 2px 1px 0px inset;
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  border-color: #dc3545;
  padding: 4px 12px;
  font-size: 0.85em;

  &:hover:not(:disabled) {
    background-color: #c82333;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const CommentMetadata = styled.div`
  color: #666;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 8px;

  strong {
    color: black;
  }
`;

export const CharacterCount = styled.div<{ isNearLimit: boolean }>`
  text-align: right;
  font-size: 0.8em;
  color: ${props => props.isNearLimit ? '#dc3545' : '#666'};
  margin: -5px 0 5px 0;
`;

export const CommentText = styled.p`
  margin: 0;
  line-height: 1.5;
  color: var(--black);
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const CommentTitle = styled.h3`
  color: var(--black);
  margin: 0 0 20px 0;
  font-size: 1.5em;
`; 