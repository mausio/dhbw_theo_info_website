import * as React from 'react';
import { useState } from 'react';

import { MarkedRedText, MarkedText, SingleTaskContainer } from '../../../styles/general/generic.style.ts';
import ConfettiComponent from '../../general/confetti.component.tsx';
import { calcArrayTaskContainerHeight } from '../../../utils/number.utils.ts';
import { printArray } from '../../general/print.component.tsx';
import { wait } from '../../../utils/promise.utils.ts';
import { IterationsContainer } from '../../../styles/general/iteration.style.ts';
import { generateRandomEasyStringArray } from '../../../utils/string.utils.ts';
import RadixWordsIterationComponent from './radixSortWordsIteration.component.tsx';

const RadixSortWordsIterationTask = () => {
  const maxChars = 3;
  const [initialData] = useState<string[]>(generateRandomEasyStringArray(4, maxChars));
  const [taskArray, setTaskArray] = useState<string[]>([...initialData]);
  const [iterations, setIterations] = useState<string[][]>([[...initialData]]);
  const [expectedArrays, setExpectedArrays] = useState<string[][]>(radixSort());
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isRunningConfetti, setIsRunningConfetti] = useState<boolean>(false);
  const [isRecycling, setIsRecycling] = useState<boolean>(false);

  const handleConfetti = async () => {
    setIsRecycling(true);
    setIsRunningConfetti(true);
    await wait(2000);
    setIsRecycling(false);
    await wait(10000);
    setIsRunningConfetti(false);
    return;
  };

  const handleCheck = (newTaskArray: string[], iterationIndex: number) => {
    const currentExpectedArray = expectedArrays[iterationIndex];

    if (JSON.stringify(currentExpectedArray) === JSON.stringify(newTaskArray)) {
      if (expectedArrays.length <= iterationIndex + 1) {
        setIsSolved(true);
        handleConfetti();

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
    const maxChars = 3; // Assuming each string is of length 3 (e.g., "ABC")

    for (let charIndex = maxChars - 1; charIndex >= 0; charIndex--) {
      const newIndex = [];

      // Get character info at the current index for each word
      const charInfo = unsortedArray.map((str, idx) => {
        const char = str[charIndex] || ''; // Handle any possible padding if strings vary in length
        const charCode = char ? char.charCodeAt(0) : 0; // Use 0 as a fallback for missing chars

        return { str, charCode, originalIndex: idx };
      });

      // Sort the characters by their char code
      charInfo.sort((a, b) => a.charCode - b.charCode);

      // Track the new indices for the sorted array
      charInfo.forEach((item, newIdx) => {
        newIndex[item.originalIndex] = newIdx;
      });

      // Apply the sorted indices to unsortedArray
      const swapper = [...unsortedArray];
      for (let i = unsortedArray.length - 1; i >= 0; i--) {
        unsortedArray[newIndex[i]] = swapper[i];
      }

      expectedArray.push([...unsortedArray]);
    }

    return expectedArray;
  }

  return (
    <SingleTaskContainer>
      <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <h2>
        Task 2 Step-wise <MarkedRedText>B</MarkedRedText> value, words
      </h2>
      <p>
        Given the input array, fill in the values of array <MarkedRedText>B</MarkedRedText> after each for loop.
      </p>
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
          <RadixWordsIterationComponent
            key={`insertIterationComp.${index}`}
            expectedArray={expectedArrays[index]}
            setTaskArray={(updatedArray) => handleCheck(updatedArray, index)}
            taskArray={iterations.length === index + 1 ? taskArray : iterations[index]}
            iterations={index + 1}
          />
        ))}
        {/*//TODO: Hier ein Interaktionsfenster erstellen für again, submit*/}
      </IterationsContainer>
    </SingleTaskContainer>
  );
};

export default RadixSortWordsIterationTask;
