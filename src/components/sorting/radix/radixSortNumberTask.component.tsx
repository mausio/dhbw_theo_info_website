import * as React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '../../../context/user.context';

import { Button, MarkedRedText, MarkedText, SingleTaskContainer } from '../../../styles/general/generic.style.ts';
import ConfettiComponent from '../../general/confetti.component.tsx';
import { calcArrayTaskContainerHeight, generateRandomArrayOfNFromTo } from '../../../utils/number.utils.ts';
import { printArray } from '../../general/print.component.tsx';
import { wait } from '../../../utils/promise.utils.ts';
import { IterationsContainer } from '../../../styles/general/iteration.style.ts';
import RadixNumberIterationComponent from './radixSortNumberIteration.component.tsx';
import { useTranslation } from 'react-i18next';

const RadixSortNumberIterationTask = () => {
  const { t } = useTranslation();
  const { addTask, updateTask, getTaskById } = useUser();
  const [initialData] = useState<number[]>(generateRandomArrayOfNFromTo(5, 1, 9999));
  const [taskArray, setTaskArray] = useState<number[]>([...initialData]);
  const [iterations, setIterations] = useState<number[][]>([[...initialData]]);
  const [expectedArrays, setExpectedArrays] = useState<number[][]>(radixSort());
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isRunningConfetti, setIsRunningConfetti] = useState<boolean>(false);
  const [isRecycling, setIsRecycling] = useState<boolean>(false);

  useEffect(() => {
    addTask({
      task: 'Radix Sort Number Task',
      taskId: 'radixSortNumber',
      points: 10,
      collectedPoints: 0
    });
  }, []);

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

        const task = getTaskById('radixSortNumber');
        if (task && task.collectedPoints === 0) {
          updateTask('radixSortNumber', 10);
        }
        return;
      }

      setTaskArray([...newTaskArray]);
      setIterations([...[...expectedArrays.slice(0, iterationIndex + 1)], [...newTaskArray]]);
    } else {
      ('Incorrect array. Try again.');
    }
  };

  function radixSort() {
    const unsortedArray = [...initialData];
    const expectedArray = [];

    for (let digitIndex = 3; digitIndex >= 0; digitIndex--) {
      const newIndex = [];

      const digitInfo = unsortedArray.map((num, idx) => {
        const digit = num.toString().split('');
        const stringDigit = Array(4 - digit.length).fill('0');
        const concatStringDigit = stringDigit.concat(digit);

        const lastDigit = Number(concatStringDigit[digitIndex]);

        return { num, lastDigit, originalIndex: idx };
      });

      digitInfo.sort((a, b) => a.lastDigit - b.lastDigit);

      digitInfo.forEach((item, newIdx) => {
        newIndex[item.originalIndex] = newIdx;
      });

      const swapper = [...unsortedArray];
      for (let i = unsortedArray.length - 1; i >= 0; i--) {
        unsortedArray[newIndex[i]] = swapper[i];
      }

      expectedArray.push([...unsortedArray]);
    }

    return expectedArray;
  }

  const task = getTaskById('radixSortNumber');
  const hasEarnedPoints = task?.collectedPoints === 10;

  return (
    <SingleTaskContainer>
      <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <h2>
        {t('sorting.radix.task.numbers.title')} <MarkedRedText>A</MarkedRedText>
      </h2>
      <p>
        {t('sorting.radix.task.numbers.description')} <MarkedRedText>A</MarkedRedText>
      </p>
      <p>
        {t('sorting.radix.task.numbers.inputArray')} <MarkedText>[{printArray(initialData)}]</MarkedText>
      </p>
      <IterationsContainer
        style={{
          height: calcArrayTaskContainerHeight(iterations.length, 150),
          transition: 'ease 1s',
          filter: isSolved && 'brightness(0.8)',
        }}
      >
        {iterations.map((item, index) => (
          <RadixNumberIterationComponent
            key={`insertIterationComp.${index}`}
            expectedArray={expectedArrays[index]}
            setTaskArray={(updatedArray) => handleCheck(updatedArray, index)}
            taskArray={iterations.length === index + 1 ? taskArray : iterations[index]}
            iterations={index + 1}
          />
        ))}

      </IterationsContainer>
      {isSolved && (
          <div style={{ textAlign: 'center', margin: "auto 40px"}}>
            {hasEarnedPoints ? (
              <p style={{color: "black"}}>
                You have already completed {task?.task.toUpperCase()} and earned <MarkedRedText style={{fontWeight: '900'}}>{task?.points}</MarkedRedText> points!
              </p>
            ) : (
              <p>
                {t('sorting.general.pointsEarned', {
                  task: task?.task.toUpperCase(),
                  points: <MarkedRedText style={{fontWeight: '900'}}>{task?.points}</MarkedRedText>
                })}
              </p>
            )}
          </div>
        )}
    </SingleTaskContainer>
  );
};

export default RadixSortNumberIterationTask;
