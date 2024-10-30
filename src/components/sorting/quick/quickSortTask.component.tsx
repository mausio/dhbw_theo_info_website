import * as React from 'react';
import { useEffect, useState } from 'react';

import { IterationsContainer, MarkedRedText, MarkedText } from '../../../styles/sorting/insertion.style.ts';
import { Button, SortTaskContainer } from '../../../styles/general/generic.style.ts';
import ConfettiComponent from '../../general/confetti.component.tsx';
import { calcArrayTaskContainerHeight, generateRandomArrayOfN } from '../../../utils/number.utils.ts';
import { printArray } from '../../general/print.component.tsx';
import { wait } from '../../../utils/promise.utils.ts';
import QuickSortIteration from './quickSortIteration.component.tsx';

const QuickSortTaskOne = () => {
  const [initialData] = useState<number[]>(generateRandomArrayOfN(8));
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

  const handlePiv = async (arr) => {
    setPivotArray(arr);
  };

  const iterativeQuickSort = () => {
    const array = [...initialData];
    const pivots: [] = [];
    const output = [];
    const stack = [];
    stack.push(0);
    stack.push(array.length - 1);

    while (stack.length) {
      const end = stack.pop();
      const start = stack.pop();

      if (start < end) {
        pivots.push(array[end]);
        const partitionIndex = partition(array, start, end);

        stack.push(partitionIndex + 1);
        stack.push(end);

        stack.push(start);
        stack.push(partitionIndex - 1);

        if (output.length == 0 || JSON.stringify([...output[output.length - 1]]) != JSON.stringify([...array])) {
          output.push([...array]);
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
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
    }
    [array[i + 1], array[end]] = [array[end], array[i + 1]]; // Place pivot in the correct position
    return i + 1;
  };

  //TODO: maybe record if the user decided to get some help
  const toggleShowPivot = () => setShowPivot(!showPivot);

  useEffect(() => {
    setExpectedArrays(iterativeQuickSort());
  }, []);

  return (
    <SortTaskContainer>
      <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <h2>
        Task 1 Step-wise <MarkedRedText>A</MarkedRedText> value of partition
      </h2>
      <p>Given the input array, fill in the values of array A after each partition</p>
      <p>
        Input array: <MarkedText>[{printArray(initialData)}]</MarkedText>
      </p>
      <Button onClick={toggleShowPivot} disabled={isSolved} style={{ position: 'absolute', right: 95, top: 15 }}>
        Help: Pivots
      </Button>
      <Button disabled={!isSolved} style={{ position: 'absolute', right: 15, top: 15 }}>
        Submit
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
        {/*//TODO: Hier ein Interaktionsfenster erstellen für again, submit*/}
      </IterationsContainer>
    </SortTaskContainer>
  );
};

export default QuickSortTaskOne;
