import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export const QuizContainer = styled.div`
  width: auto;
  margin: 20px 0;
  padding: 25px;
  border-radius: 25px;
  background: white;
  box-shadow: 
    rgb(0, 0, 0, 0.4) 1px 1px 4px 0px inset,
    rgb(0, 0, 0, 0.1) -1px -1px 2px 0px inset;
  background: radial-gradient(white, color-mix(in srgb, var(--primary), white 90%) 95%);
`;

export const QuizTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 35px;
  text-align: center;
  color: #1a1a1a;
  font-weight: 600;
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 25px;
  background: white;
  border-radius: 15px;
  box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 3px 0px inset,
      rgb(0, 0, 0, 0.1) -1px -1px 2px 0px inset;
  background: white;

  h3 {
    text-align: center;
    margin-bottom: 10px;
    color: #1a1a1a;
    font-size: 24px;
    font-weight: 500;
  }
`;

export const QuizButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 600px;
`;

interface AnswerButtonProps {
  selected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
}

export const AnswerButton = styled.button<AnswerButtonProps>`
  padding: 16px 20px;
  border: 1px solid #d0d0d0;
  border-radius: 12px;
  background: white;
  color: #1a1a1a;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  font-size: 16px;
  text-align: left;
  box-shadow: ${props => {
    if (props.isCorrect) return '#4CAF50 0px 0px 15px 3px';
    if (props.isWrong) return 'rgba(226, 0, 26, 1.0) 0px 0px 12px 3px';
    if (props.selected) return '#3a576f 0px 0px 12px 3px';
    return 'rgba(0, 0, 0, 0.15) 0px 2px 4px';
  }};
  transform: ${props => {
    if (props.disabled) return 'scale(1.0)';
    return (!props.isCorrect && !props.isWrong && props.selected) ? 'scale(1.01)' : 'none';
  }};

  &:hover:not(:disabled) {
    background: ${props => {
      if (props.isCorrect || props.isWrong) return 'white';
      return '#f5f5f5';
    }};
    border-color: #b0b0b0;
    transform: ${props => props.isCorrect || props.isWrong ? 'none' : 'translateY(-2px)'};
  }

  &:disabled {
    opacity: ${props => props.selected ? 1 : 0.7};
  }
`;

export const QuizResultContainer = styled.div`
  text-align: center;
  padding: 30px;
  background: color-mix(in srgb, var(--tertiary), white 20%);
  border-radius: 15px;
  box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 3px 0px inset;

  h3 {
    color: #1a1a1a;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
  }

  p {
    font-size: 18px;
    margin-bottom: 25px;
    color: #1a1a1a;
  }
`; 