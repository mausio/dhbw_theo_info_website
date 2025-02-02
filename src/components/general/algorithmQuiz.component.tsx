import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../../styles/general/generic.style';
import ConfettiComponent from './confetti.component';
import { AnswerButton, QuestionContainer, QuizButtonContainer, QuizContainer, QuizResultContainer, QuizTitle } from '../../styles/general/quiz.style';

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface AlgorithmQuizProps {
  translationKey: string; // Key for the specific algorithm in translation files
}

const AlgorithmQuizComponent: React.FC<AlgorithmQuizProps> = ({ translationKey }) => {
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // Get questions from translation based on the algorithm key
  const questions: QuizQuestion[] = (t(`${translationKey}.quiz.questions`, { returnObjects: true }) || []) as QuizQuestion[];

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showAnswer) {
      setSelectedAnswer(selectedAnswer === answerIndex ? null : answerIndex);
    }
  };

  const handleNextQuestion = () => {
    if (!showAnswer) {
      if (selectedAnswer === null) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        return;
      }
      setShowAnswer(true);
      return;
    }

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setIsQuizComplete(true);
      if (score + (selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 1 : 0) === questions.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizComplete(false);
    setShowConfetti(false);
    setShowAnswer(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <QuizContainer>
      <ConfettiComponent run={showConfetti} recycle={false} />
      <QuizTitle>{t('general.quiz.title')}</QuizTitle>
      
      {!isQuizComplete ? (
        <QuestionContainer>
          <h3>{currentQuestion.question}</h3>
          <QuizButtonContainer>
            {currentQuestion.answers.map((answer, index) => (
              <AnswerButton
                key={index}
                onClick={() => handleAnswerSelect(index)}
                selected={selectedAnswer === index}
                disabled={showAnswer}
                isCorrect={showAnswer && selectedAnswer === currentQuestion.correctAnswer && selectedAnswer === index}
                isWrong={showAnswer && selectedAnswer !== currentQuestion.correctAnswer && index === currentQuestion.correctAnswer}
              >
                {answer}
              </AnswerButton>
            ))}
          </QuizButtonContainer>
          <Button
            onClick={handleNextQuestion}
            disabled={showAnswer ? selectedAnswer === null : false}
            style={{ 
              marginTop: '20px',
              animation: isShaking ? 'shake 0.15s 2' : 'none'
            }}
          >
            {showAnswer 
              ? (currentQuestionIndex + 1 === questions.length 
                ? t('general.quiz.finish') 
                : t('general.quiz.next'))
              : t('general.quiz.check')}
          </Button>
        </QuestionContainer>
      ) : (
        <QuizResultContainer>
          <h3>{t('general.quiz.completed')}</h3>
          <p>
            {t('general.quiz.score', { 
              score: score, 
              total: questions.length 
            })}
          </p>
          <Button onClick={restartQuiz}>
            {t('general.quiz.restart')}
          </Button>
        </QuizResultContainer>
      )}
    </QuizContainer>
  );
};

export default AlgorithmQuizComponent; 