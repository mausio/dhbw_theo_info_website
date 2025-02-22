import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user.context';

import { Button } from '../../styles/general/generic.style';
import ConfettiComponent from './confetti.component';
import {
  AnswerButton,
  QuestionContainer,
  QuizButtonContainer,
  QuizContainer,
  QuizResultContainer,
  QuizTitle,
} from '../../styles/general/quiz.style';

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface AlgorithmQuizProps {
  translationKey: string;
}

const AlgorithmQuizComponent: React.FC<AlgorithmQuizProps> = ({ translationKey }) => {
  const { t } = useTranslation();
  const { addTask, updateTask, getTaskById } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [hasCompletedBefore, setHasCompletedBefore] = useState<boolean>(false);
  const [previousScore, setPreviousScore] = useState<number>(0);

  const questions: QuizQuestion[] = (t(`${translationKey}.quiz.questions`, { returnObjects: true }) ||
    []) as QuizQuestion[];
  const quizTaskId = `${translationKey.replace('.', '_')}_quiz`;

  useEffect(() => {
    const existingTask = getTaskById(quizTaskId);
    if (existingTask && existingTask.collectedPoints > 0) {
      setHasCompletedBefore(true);
      setPreviousScore(existingTask.collectedPoints);
    } else {
      addTask({
        task: `${translationKey} Quiz`,
        taskId: quizTaskId,
        points: questions.length * 2,
        collectedPoints: 0,
      });
    }
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showAnswer && !hasCompletedBefore) {
      setSelectedAnswer(selectedAnswer === answerIndex ? null : answerIndex);
    }
  };

  const submitQuizResults = useCallback(
    (totalCorrect: number) => {
      const finalPoints = totalCorrect * 2;

      const task = getTaskById(quizTaskId);
      if (task && task.collectedPoints === 0) {
        updateTask(quizTaskId, finalPoints);
      }

      setIsQuizComplete(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 20000);
    },
    [quizTaskId, getTaskById, updateTask]
  );

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

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    const newCorrectTotal = isCorrect ? correctAnswers + 1 : correctAnswers;
    setCorrectAnswers(newCorrectTotal);

    if (currentQuestionIndex === questions.length - 1) {
      submitQuizResults(newCorrectTotal);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (hasCompletedBefore) {
    return (
      <QuizContainer>
        <QuizTitle>{t('general.quiz.title')}</QuizTitle>
        <QuizResultContainer>
          <h3>
            {t('general.quiz.score', {
              correctTasks: previousScore,
              totalTasks: questions.length,
            })}
          </h3>
          <p>{t('general.quiz.points', { points: previousScore * 2 })}</p>
        </QuizResultContainer>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
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
              animation: isShaking ? 'shake 0.15s 2' : 'none',
            }}
          >
            {showAnswer
              ? currentQuestionIndex === questions.length - 1
                ? t('general.quiz.finish')
                : t('general.quiz.next')
              : t('general.quiz.check')}
          </Button>
        </QuestionContainer>
      ) : (
        <QuizResultContainer>
          <h3>
            {t('general.quiz.score', {
              correctTasks: correctAnswers * 2,
              totalTasks: questions.length,
            })}
          </h3>
          <p>{t('general.quiz.points', { points: correctAnswers * 4 })}</p>
        </QuizResultContainer>
      )}
    </QuizContainer>
  );
};

export default AlgorithmQuizComponent;
