import { SortTaskContainer } from '../../../styles/general/generic.style.ts';
import ConfettiComponent from '../../general/confetti.component.tsx';
import { IterationsContainer, MarkedRedText, MarkedText } from '../../../styles/sorting/insertion.style.ts';
import IterationArrayChildTask from '../insertion/insertionIteration.component.tsx';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { calcArrayTaskContainerHeight, generateRandomArrayOfN } from '../../../utils/number.utils.ts';
import { wait } from '../../../utils/promise.utils.ts';

const printArray = (array: number[]) => {
  return array.map((item, index) => (
    <span key={index}>
      {item}
      {index < array.length - 1 ? ', ' : ''}
    </span>
  ));
};

const MergeSortTaskOne = () => {
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
  };

  useEffect(() => {
    setExpectedArrays(insertionSort());
  }, []);

  const handleCheck = (newTaskArray: number[], iterationIndex: number) => {
    const currentExpectedArray = expectedArrays[iterationIndex];

    if (JSON.stringify(currentExpectedArray) === JSON.stringify(newTaskArray)) {
      if (expectedArrays.length <= iterationIndex + 1) {
        console.log('finished!');
        setIsSolved(true);
        handleConfetti();
        return;
      }

      setTaskArray([...newTaskArray]);

      setIterations([...[...expectedArrays.slice(0, iterationIndex + 1)], [...newTaskArray]]);
    } else {
      console.log('Incorrect array. Try again.');
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
    <SortTaskContainer>
      <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <h2>
        Task 1 Step-wise <MarkedRedText>A</MarkedRedText> value
      </h2>
      <p>Given the input array, fill in the values of array A after each for loop.</p>
      <p>
        Input array: <MarkedText>[{printArray(initialData)}]</MarkedText>
      </p>
      <IterationsContainer
        style={{
          height: calcArrayTaskContainerHeight(iterations.length, 150),
          transition: 'ease 1s',
          filter: isSolved && 'brightness(0.8)',
        }}
      >
        {iterations.map((item, index) => (
          <IterationArrayChildTask
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
            <p>Submit?</p>
          </>
        )}
      </IterationsContainer>
    </SortTaskContainer>
  );
};

export default MergeSortTaskOne;
