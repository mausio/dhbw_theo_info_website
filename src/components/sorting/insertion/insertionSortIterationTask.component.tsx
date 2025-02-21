import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../context/user.context';

import { MarkedRedText, MarkedText, SingleTaskContainer } from '../../../styles/general/generic.style.ts';
import ConfettiComponent from '../../general/confetti.component.tsx';
import { calcArrayTaskContainerHeight, generateRandomArrayOfN } from '../../../utils/number.utils.ts';
import { printArray } from '../../general/print.component.tsx';
import { wait } from '../../../utils/promise.utils.ts';
import InsertionIterationComponent from './insertionIteration.component.tsx';
import { IterationsContainer } from '../../../styles/general/iteration.style.ts';
import { Button } from '../../../styles/general/generic.style.ts';

const InsertionSortIterationTaskComponent = () => {
  const { t } = useTranslation();
  const { addTask, updateTask, getTaskById } = useUser();
  const [initialData] = useState<number[]>(generateRandomArrayOfN(8));
  const [taskArray, setTaskArray] = useState<number[]>([...initialData]);
  const [iterations, setIterations] = useState<number[][]>([[...initialData]]);
  const [expectedArrays, setExpectedArrays] = useState<number[][]>([]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isRunningConfetti, setIsRunningConfetti] = useState<boolean>(false);
  const [isRecycling, setIsRecycling] = useState<boolean>(false);
  const [showPivot, setShowPivot] = useState<boolean>(false);

  const handleConfetti = async () => {
    setIsRecycling(true);
    setIsRunningConfetti(true);
    await wait(5000);
    setIsRecycling(false);
    await wait(10000);
    setIsRunningConfetti(false);
    return;
  };

  useEffect(() => {
    setExpectedArrays(insertionSort());
    // Initialize the task when component mounts
    addTask({
      task: 'Insertion Sort Task',
      taskId: 'insertionSort',
      points: 5,
      collectedPoints: 0
    });
  }, []);

  const handleCheck = (newTaskArray: number[], iterationIndex: number) => {
    const currentExpectedArray = expectedArrays[iterationIndex];

    if (JSON.stringify(currentExpectedArray) === JSON.stringify(newTaskArray)) {
      if (expectedArrays.length <= iterationIndex + 1) {
        setIsSolved(true);
        handleConfetti();
        
        // Check if points were already awarded
        const task = getTaskById('insertionSort');
        if (task && task.collectedPoints === 0) {
          // Only award points if they haven't been awarded yet
          updateTask('insertionSort', 5);
        }
        return;
      }

      setTaskArray([...newTaskArray]);
      setIterations([...[...expectedArrays.slice(0, iterationIndex + 1)], [...newTaskArray]]);
    }
  };

  const handleReset = () => {
    setTaskArray([...initialData]);
    setIterations([[...initialData]]);
    setIsSolved(false);
  };

  const insertionSort = () => {
    const sub = [...initialData];
    const output = [];

    for (let j = 1; j < sub.length; j++) {
      const key = sub[j];
      let i = j - 1;

      while (i >= 0 && sub[i] > key) {
        sub[i + 1] = sub[i];
        i = i - 1;
      }

      sub[i + 1] = key;
      output.push([...sub]);
    }

    return output;
  };

  // Check if points were already awarded
  const task = getTaskById('insertionSort');
  const hasEarnedPoints = task?.collectedPoints === 5;

  return (
    <SingleTaskContainer>
            <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>
          {t('sorting.insertion.task.title')} <MarkedRedText>A</MarkedRedText>
        </h2>
        <Button onClick={() => setShowPivot(!showPivot)}>
          {showPivot ? t('general.buttons.hidePivot') : t('general.buttons.showPivot')}
        </Button>
      </div>
      <p>{t('sorting.insertion.task.description')}</p>
      <p>
        {t('sorting.insertion.task.inputArray')} <MarkedText>[{printArray(initialData)}]</MarkedText>
      </p>
      <IterationsContainer
        style={{
          height: calcArrayTaskContainerHeight(iterations.length, 150),
          transition: 'ease 1s',
          filter: isSolved && 'brightness(0.8)',
        }}
      >
        {iterations.map((item, index) => (
          <InsertionIterationComponent
            key={`insertIterationComp.${index}`}
            expectedArray={expectedArrays[index]}
            setTaskArray={(updatedArray) => handleCheck(updatedArray, index)}
            taskArray={iterations.length === index + 1 ? taskArray : iterations[index]}
            iterations={index + 1}
            showPivot={showPivot}
          />
        ))}
        {isSolved && (
          <div style={{ textAlign: 'center', margin: "auto 40px"}}>
            {hasEarnedPoints ? (
              <p style={{color: "black"}}>
                  {t('sorting.insertion.task.alreadyCompleted', { 
                    points: task?.points,
                    taskName: task?.task
                  }).replace(
                    String(task?.points),
                    '[POINTS]'
                  ).replace(
                    task?.task,
                    task?.task.toUpperCase()
                  ).split('[POINTS]').map((part, i) => 
                    i === 1 ? <><span style={{color: 'inherit'}}><MarkedRedText style={{fontWeight: '900'}}>{task?.points}</MarkedRedText></span>{part}</> : part
                  )}
              </p>
            ) : (
              <>
                <p>

                    {t('sorting.insertion.task.pointsEarned', { 
                      points: task?.points,
                      taskName: task?.task
                    }).replace(
                      String(task?.points),
                      '[POINTS]'
                    ).replace(
                      task?.task,
                      task?.task.toUpperCase()
                    ).split('[POINTS]').map((part, i) => 
                      i === 1 ? <><span style={{color: 'inherit'}}><MarkedRedText style={{fontWeight: '900'}}>{task?.points}</MarkedRedText></span>{part}</> : part
                    )}
                </p>
                <Button onClick={handleReset}>
                  {t('sorting.insertion.task.tryAgain')}
                </Button>
              </>
            )}
          </div>
        )}
      </IterationsContainer>
    </SingleTaskContainer>
  );
};

export default InsertionSortIterationTaskComponent;
