import * as React from 'react';
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/user.context';
import { useTranslation } from 'react-i18next';

import { Button, MarkedRedText, MarkedText, SingleTaskContainer } from '../../../styles/general/generic.style.ts';
import { TaskTitle, TaskDescription, TaskInputArray } from '../../../styles/general/task.style.ts';
import ConfettiComponent from '../../general/confetti.component.tsx';
import { calcArrayTaskContainerHeight, generateRandomArrayOfN } from '../../../utils/number.utils.ts';
import { printArray } from '../../general/print.component.tsx';
import { wait } from '../../../utils/promise.utils.ts';
import QuickSortIteration from './quickSortIteration.component.tsx';
import { IterationsContainer } from '../../../styles/general/iteration.style.ts';

const QuickSortPartitionTasks = () => {
  const { t } = useTranslation();
  const { addTask, updateTask, getTaskById } = useUser();
  const [initialData] = useState<number[]>(generateRandomArrayOfN(7));
  const [taskArray, setTaskArray] = useState<number[]>([...initialData]);
  const [iterations, setIterations] = useState<number[][]>([[...initialData]]);
  const [pivotArray, setPivotArray] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isRunningConfetti, setIsRunningConfetti] = useState<boolean>(false);
  const [isRecycling, setIsRecycling] = useState<boolean>(false);
  const [expectedArrays, setExpectedArrays] = useState<number[][]>([]);
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

  const handleCheck = (newTaskArray: number[], iterationIndex: number) => {
    const currentExpectedArray = expectedArrays[iterationIndex];

    if (JSON.stringify(currentExpectedArray) === JSON.stringify(newTaskArray)) {
      if (expectedArrays.length <= iterationIndex + 1) {
        setIsSolved(true);
        handleConfetti();
        
        const task = getTaskById('quickSortPartition');
        if (task && task.collectedPoints === 0) {
          updateTask('quickSortPartition', 10);
        }
        return;
      }

      setTaskArray([...newTaskArray]);
      setIterations([...[...expectedArrays.slice(0, iterationIndex + 1)], [...newTaskArray]]);
    } 
  };

  const handlePiv = async (arr) => {
    setPivotArray(arr);
  };

  const iterativeQuickSort = () => {
    const array = [...initialData];
    const pivots: number[] = [];
    const output = [];
    const stack = [];
    stack.push(0);
    stack.push(array.length - 1);

    while (stack.length) {
      const end = stack.pop();
      const start = stack.pop();

      if (start < end) {
        const pivot = array[end];
        const partitionIndex = partition(array, start, end);

        stack.push(partitionIndex + 1);
        stack.push(end);

        stack.push(start);
        stack.push(partitionIndex - 1);

        if (output.length == 0 || JSON.stringify([...output[output.length - 1]]) != JSON.stringify([...array])) {
          output.push([...array]);
          pivots.push(pivot);
        }
      }
    }
    handlePiv([...pivots]);
    return [...output];
  };

  const partition = (array, start, end) => {
    const pivot = array[end];
    let i = start - 1;
    for (let j = start; j <= end - 1; j++) {
      if (array[j] <= pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    [array[i + 1], array[end]] = [array[end], array[i + 1]];
    return i + 1;
  };

  //TODO: maybe record if the user decided to get some help
  const toggleShowPivot = () => setShowPivot(!showPivot);

  useEffect(() => {
    setExpectedArrays(iterativeQuickSort());
    addTask({
      task: 'Quick Sort Partition Task',
      taskId: 'quickSortPartition',
      points: 10,
      collectedPoints: 0
    });
  }, []);

  const task = getTaskById('quickSortPartition');
  const hasEarnedPoints = task?.collectedPoints === 10;

  return (
    <SingleTaskContainer>
      <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <TaskTitle>
        {t('sorting.quick.task.title')} <MarkedRedText>A</MarkedRedText>
      </TaskTitle>
      <TaskDescription>{t('sorting.quick.task.description')}</TaskDescription>
      <TaskInputArray>
        {t('sorting.quick.task.inputArray')} <MarkedText>[{printArray(initialData)}]</MarkedText>
      </TaskInputArray>
      <Button onClick={toggleShowPivot} disabled={isSolved} style={{ position: 'absolute', right: 10, top: 10 }}>
        {t('general.buttons.showPivot')}
      </Button>
      <IterationsContainer
        style={{
          height: calcArrayTaskContainerHeight(iterations.length, 150),
          transition: 'ease 1s',
          filter: isSolved && 'brightness(0.8)',
        }}
      >
        {iterations.map((item, index) => (
          <QuickSortIteration
            key={`insertIterationComp.${index}`}
            expectedArray={expectedArrays[index]}
            setTaskArray={(updatedArray) => handleCheck(updatedArray, index)}
            taskArray={iterations.length === index + 1 ? taskArray : iterations[index]}
            nrOfIteration={index}
            pivotArray={showPivot ? pivotArray : []}
          />
        ))}
        {isSolved && (
          <div style={{ textAlign: 'center', margin: "auto 40px"}}>
            {hasEarnedPoints ? (
              <p style={{color: "black"}}>
                {t('sorting.quick.task.alreadyCompleted', { 
                  task: task?.task.toUpperCase(),
                  points: task?.points
                })}
              </p>
            ) : (
              <>
                <p>
                  {t('sorting.quick.task.pointsEarned', { 
                    task: task?.task.toUpperCase(),
                    points: task?.points
                  })}
                </p>
              </>
            )}
          </div>
        )}
      </IterationsContainer>
    </SingleTaskContainer>
  );
};

export default QuickSortPartitionTasks;
