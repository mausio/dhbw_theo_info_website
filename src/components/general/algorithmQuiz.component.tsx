import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user.context';

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
  const { addTask, updateTask } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // Get questions from translation based on the algorithm key
  const questions: QuizQuestion[] = (t(`${translationKey}.quiz.questions`, { returnObjects: true }) || []) as QuizQuestion[];

  useEffect(() => {
    // Initialize the quiz task when component mounts
    const quizTaskId = `${translationKey.split('.').pop()}Quiz`;
    addTask({
      task: `${translationKey.split('.').pop()} Quiz`,
      taskId: quizTaskId,
      points: 10,
      collectedPoints: 0
    });
  }, []);

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

    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizComplete(true);
      setShowConfetti(true);
      // Update quiz completion when all questions are answered
      const quizTaskId = `${translationKey.split('.').pop()}Quiz`;
      const scorePercentage = (score / questions.length) * 10;
      updateTask(quizTaskId, scorePercentage);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizComplete(false);
    setShowAnswer(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <QuizContainer>
      <ConfettiComponent run={showConfetti} recycle={false} />
      <QuizTitle>{t(`${translationKey}.quiz.title`)}</QuizTitle>
      
      {!isQuizComplete ? (
        <QuestionContainer isShaking={isShaking}>
          <h3>{currentQuestion.question}</h3>
          <QuizButtonContainer>
            {currentQuestion.answers.map((answer, index) => (
              <AnswerButton
                key={index}
                onClick={() => handleAnswerSelect(index)}
                selected={selectedAnswer === index}
                isCorrect={showAnswer && index === currentQuestion.correctAnswer}
                isWrong={showAnswer && selectedAnswer === index && selectedAnswer !== currentQuestion.correctAnswer}
                disabled={showAnswer}
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
              ? (currentQuestionIndex === questions.length - 1 
                ? t('quiz.finish') 
                : t('quiz.next'))
              : t('quiz.check')}
          </Button>
        </QuestionContainer>
      ) : (
        <QuizResultContainer>
          <h3>
            {t('quiz.score')}: {score}/{questions.length}
          </h3>
          <Button onClick={restartQuiz}>
            {t('quiz.restart')}
          </Button>
        </QuizResultContainer>
      )}
    </QuizContainer>
  );
};

export default AlgorithmQuizComponent; 