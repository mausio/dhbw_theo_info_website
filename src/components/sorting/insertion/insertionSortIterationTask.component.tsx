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

const InsertionSortIterationTaskComponent = () => {
  const { t } = useTranslation();
  const { addTask, updateTask } = useUser();
  const [initialData] = useState<number[]>(generateRandomArrayOfN(8));
  const [taskArray, setTaskArray] = useState<number[]>([...initialData]);
  const [iterations, setIterations] = useState<number[][]>([[...initialData]]);
  const [expectedArrays, setExpectedArrays] = useState<number[][]>([]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isRunningConfetti, setIsRunningConfetti] = useState<boolean>(false);
  const [isRecycling, setIsRecycling] = useState<boolean>(false);

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
      points: 10,
      collectedPoints: 0
    });
  }, []);

  const handleCheck = (newTaskArray: number[], iterationIndex: number) => {
    const currentExpectedArray = expectedArrays[iterationIndex];

    if (JSON.stringify(currentExpectedArray) === JSON.stringify(newTaskArray)) {
      if (expectedArrays.length <= iterationIndex + 1) {
        ('finished!');
        setIsSolved(true);
        handleConfetti();
        // Update task completion when solved
        updateTask('insertionSort', 10);
        return;
      }

      setTaskArray([...newTaskArray]);

      setIterations([...[...expectedArrays.slice(0, iterationIndex + 1)], [...newTaskArray]]);
    } else {
      ('Incorrect array. Try again.');
    }
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

  return (
    <SingleTaskContainer>
      <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <h2>
        {t('sorting.insertion.task.title')} <MarkedRedText>A</MarkedRedText>
      </h2>
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
          />
        ))}
        {/*//TODO: Hier ein Interaktionsfenster erstellen für again, submit*/}
        {isSolved && (
          <>
            <p>{t('sorting.insertion.task.submit')}</p>
          </>
        )}
      </IterationsContainer>
    </SingleTaskContainer>
  );
};

export default InsertionSortIterationTaskComponent;
