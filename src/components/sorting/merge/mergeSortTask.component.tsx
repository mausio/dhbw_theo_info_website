import * as React from 'react';
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/user.context';
import { MarkedRedText, SingleTaskContainer } from '../../../styles/general/generic.style.ts';
import ConfettiComponent from '../../general/confetti.component.tsx';
import { wait } from '../../../utils/promise.utils.ts';

const MergeSortTask = () => {
  const { addTask, updateTask, getTaskById } = useUser();
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isRunningConfetti, setIsRunningConfetti] = useState<boolean>(false);
  const [isRecycling, setIsRecycling] = useState<boolean>(false);

  useEffect(() => {
    addTask({
      task: 'Merge Sort Task',
      taskId: 'mergeSortTask',
      points: 10,
      collectedPoints: 0
    });
  }, []);

  const handleConfetti = async () => {
    setIsRecycling(true);
    setIsRunningConfetti(true);
    await wait(3000);
    setIsRecycling(false);
  };

  const task = getTaskById('mergeSortTask');
  const hasEarnedPoints = task?.collectedPoints === 10;

  return (
    <SingleTaskContainer>
      <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <h2>Merge Sort Task</h2>
      <p>Coming soon...</p>
      {isSolved && (
        <div style={{ textAlign: 'center', margin: "20px auto"}}>
          {hasEarnedPoints ? (
            <p style={{color: "black"}}>
              You have already completed {task?.task.toUpperCase()} and earned <MarkedRedText style={{fontWeight: '900'}}>{task?.points}</MarkedRedText> points!
            </p>
          ) : (
            <p>
              Congratulations! You completed {task?.task.toUpperCase()} and earned <MarkedRedText style={{fontWeight: '900'}}>{task?.points}</MarkedRedText> points!
            </p>
          )}
        </div>
      )}
    </SingleTaskContainer>
  );
};

export default MergeSortTask; 