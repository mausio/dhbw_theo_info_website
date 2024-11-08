import { Button, MarkedRedText, MarkedText, SingleTaskContainer } from '../../../styles/general/generic.style.ts';
import ConfettiComponent from '../../general/confetti.component.tsx';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { generateRandomArrayOfNFromTo } from '../../../utils/number.utils.ts';
import { printArray } from '../../general/print.component.tsx';
import {
  CountingSortEntriesContainer,
  DiagramInput,
  DiagramIterationWrapper,
  DiagramName,
  FirstStepContainer,
  SingleDiagram,
} from '../../../styles/sorting/countingSort.style.ts';
import BarChart from '../../general/barChart.component.tsx';
import IndexChart from '../../general/indexChart.component.tsx';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { wait } from '../../../utils/promise.utils.ts';

export type CountingIteration = {
  countingArray: number[];
  sortableArray: number[];
  unsortedArray: number[];
  currentSortableArrayIndex: number;
  currentCountingArrayIndex: number;
  currentUnsortedArrayIndex: number;
};

const CountingSortDeterminationTask = () => {
  const [initialData] = useState<number[]>(generateRandomArrayOfNFromTo(10, 1, 5));
  const [accumulatingBarsSolution, setAccumulatingBarsSolution] = useState<number[]>([]);
  const [accumulatingBars, setAccumulatingBars] = useState<number[]>([]);
  const [countingBarsSolution, setCountingBarsSolution] = useState<number[]>([]);
  const [countingBars, setCountingBars] = useState<number[]>([]);
  const [sortedBars, setSortedBars] = useState<number[]>([]);
  const [sortingBars, setSortingBars] = useState<number[]>([]);
  const [unsortedBars, setUnsortedBars] = useState<number[]>([...initialData]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isAccumulatingBarsSolved, setIsAccumulatingBarsSolved] = useState<boolean>(true);
  const [isCountingBarsSolved, setIsCountingBarsSolved] = useState<boolean>(true);
  const [isRunningConfetti, setIsRunningConfetti] = useState<boolean>(false);
  const [isRecycling, setIsRecycling] = useState<boolean>(false);
  const [selectedBar, setSelectedBar] = useState<string>('');
  const [wrongAnswer, setWrongAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [placeHolder, setPlaceHolder] = useState<string | number>(null);
  const [barsIterationSolution, setBarsIterationSolution] = useState<CountingIteration[]>([]);

  function countingSort(inputArr) {
    if (inputArr.length === 0) return unsortedArray;

    const unsortedArray = [...inputArr];

    // Step 1: Find the maximum value in the array
    const maxValue = Math.max(...unsortedArray);
    const minValue = Math.min(...unsortedArray);

    // Step 2: Initialize the arrays with zeros
    const countArray = new Array(maxValue).fill(0);
    const sortedArray = new Array(unsortedArray.length).fill(0);

    // Step 3: Count the occurrences of each element
    for (let i = 0; i < unsortedArray.length; i++) {
      countArray[unsortedArray[i] - 1]++;
    }
    if (countingBarsSolution.length <= 0) {
      setCountingBarsSolution([...countArray]);
      setCountingBars(Array(countArray.length).fill(0));
    }

    // Step 4: Accumulate counts
    for (let i = 1; i < countArray.length; i++) {
      countArray[i] += countArray[i - 1];
    }
    if (accumulatingBarsSolution.length <= 0) {
      setAccumulatingBarsSolution([...countArray]);
      setAccumulatingBars(Array(countArray.length).fill(0));
    }

    const iterations: CountingIteration[] = [];

    // Step 5: Build the sorted array
    for (let i = unsortedArray.length - 1; i >= 0; i--) {
      const currentValue = unsortedArray[i];
      const position = countArray[currentValue - minValue] - 1;
      sortedArray[position] = currentValue;
      countArray[currentValue - minValue]--;

      unsortedArray[i] = 0;

      iterations.push({
        currentCountingArrayIndex: currentValue,
        currentSortableArrayIndex: position,
        currentUnsortedArrayIndex: i,
        countingArray: [...countArray],
        sortableArray: [...sortedArray],
        unsortedArray: [...unsortedArray],
      });
      console.log(currentValue, position, i, countArray, sortedArray, unsortedArray);
    }
    if (sortedBars.length <= 0) {
      setSortedBars(sortedArray);
      setSortingBars(Array(sortedArray.length).fill(0));
      setBarsIterationSolution([...iterations]);
    }

    console.log(iterations);
    return sortedArray;
  }

  useEffect(() => {
    countingSort(initialData);
  }, []);

  const handleUnsortedBarsUpdate = (array, index, event, correctId, wrongId) => {
    const newArr = performBarUpdate(array, index, event);

    if (!newArr) return;

    // checkBar(newArr[index], sortedBars[index], correctId, wrongId);

    setSelectedBar(null);
    setPlaceHolder(null);

    setUnsortedBars(newArr);
  };

  const handleSortingBarsUpdate = (array, index, event, correctId, wrongId) => {
    const newArr = performBarUpdate(array, index, event);

    if (!newArr) return;

    // checkBar(newArr[index], [index], correctId, wrongId);

    setSelectedBar(null);
    setPlaceHolder(null);

    setSortingBars(newArr);
  };

  const handleCountingBarsUpdate = (array, index, event, correctId, wrongId) => {
    const newArr = performBarUpdate(array, index, event);

    if (!newArr) return;

    checkBar(newArr[index], countingBarsSolution[index], correctId, wrongId);

    setSelectedBar(null);
    setPlaceHolder(null);

    setCountingBars(newArr);

    if (!isCountingBarsSolved) {
      setIsCountingBarsSolved(checkBars(newArr, countingBarsSolution));
    }
  };

  const handleAccumulatingBarsUpdate = (array, index, event, correctId, wrongId) => {
    const newArr = performBarUpdate(array, index, event);

    if (!newArr) return;

    checkBar(newArr[index], accumulatingBarsSolution[index], correctId, wrongId);

    setSelectedBar(null);
    setPlaceHolder(null);

    setAccumulatingBars(newArr);

    if (!isAccumulatingBarsSolved) {
      setIsAccumulatingBarsSolved(checkBars(newArr, countingBarsSolution));
    }
  };

  function performBarUpdate(array, index, event) {
    if (!(event.type == 'blur' || event.key == 'Enter' || event.type == 'abort')) return null;
    const newValue = sanitizeAndParse(event.target.value);

    if (0 <= newValue && newValue <= initialData.length + 1) {
      array[index] = newValue;
    }
    return array;
  }

  function sanitizeAndParse(input) {
    if (typeof input === 'number') {
      return input;
    } else if (typeof input === 'string') {
      if (input === '') {
        return 0;
      }

      const cleaned = input.replace(/[^0-9 ]/g, '').trim();
      const firstValue = cleaned.split(' ')[0];
      return parseInt(firstValue, 10);
    }
    return null;
  }

  const checkBars = (array, expectedArray) => JSON.stringify(array) == JSON.stringify(expectedArray);

  async function checkBar(a, b, correctId, wrongId) {
    console.log(a, b);
    if (JSON.stringify(a) == JSON.stringify(b)) {
      setCorrectAnswer(correctId);
    } else {
      setWrongAnswer(wrongId);
    }
    await wait(2000);
    setCorrectAnswer('');
    setWrongAnswer('');
  }

  return (
    <SingleTaskContainer>
      <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <h2 style={{ maxWidth: '88%' }}>
        Task 1: Determination of counting arrays and stepwise construction of a sorted array{' '}
        <MarkedRedText>B</MarkedRedText> with counting sort.
      </h2>
      <p>Stuff: Description</p>
      <p>
        Input array: <MarkedText>[{printArray(initialData)}]</MarkedText>
      </p>
      <CountingSortEntriesContainer>
        <FirstStepContainer>
          <SingleDiagram>
            <DiagramName>Counting Array</DiagramName>
            <BarChart barsHeight={10} height={120} bars={countingBars} doNotShowNumber={true} fullLength={true} />
            <DiagramIterationWrapper>
              {countingBars.map((bar, index) => {
                const id = `counting-bar-${index}`;
                const wrongId = `wrong-counting-bar-${index}`;
                const correctId = `correct-counting-bar-${index}`;
                return (
                  <DiagramInput
                    disabled={isCountingBarsSolved}
                    value={selectedBar === id ? placeHolder : bar}
                    onAbort={(e) => handleCountingBarsUpdate([...countingBars], index, e, correctId, wrongId)}
                    onBlur={(e) => handleCountingBarsUpdate([...countingBars], index, e, correctId, wrongId)}
                    onKeyDown={(e) => handleCountingBarsUpdate([...countingBars], index, e, correctId, wrongId)}
                    onChange={(e) => {
                      if (selectedBar !== id) {
                        setSelectedBar(id);
                      }
                      setPlaceHolder(e.target.value);
                    }}
                    style={{
                      width: `${70 / countingBars.length}%`,
                      left: `${(index / countingBars.length) * 100}%`,
                      animation:
                        wrongAnswer == wrongId
                          ? 'wrong 2s ease-in-out'
                          : correctAnswer == correctId
                            ? 'correct 2s ease-in-out'
                            : null,
                    }}
                  />
                );
              })}
            </DiagramIterationWrapper>
            <IndexChart initialArray={countingBars} fullLength={true} />
          </SingleDiagram>
          {isCountingBarsSolved && (
            <>
              <KeyboardDoubleArrowRightIcon style={{ fontSize: '1.75rem' }} />
              <SingleDiagram>
                <DiagramName>Accumulating Array</DiagramName>
                <BarChart
                  barsHeight={10}
                  height={120}
                  bars={accumulatingBars}
                  doNotShowNumber={true}
                  fullLength={true}
                />
                <DiagramIterationWrapper>
                  {accumulatingBars.map((bar, index) => {
                    const id = `accumulating-bar-${index}`;
                    const wrongId = `wrong-accumulating-bar-${index}`;
                    const correctId = `correct-accumulating-bar-${index}`;
                    return (
                      <DiagramInput
                        disabled={isSolved}
                        value={selectedBar === id ? placeHolder : bar}
                        onAbort={(e) =>
                          handleAccumulatingBarsUpdate([...accumulatingBars], index, e, correctId, wrongId)
                        }
                        onBlur={(e) =>
                          handleAccumulatingBarsUpdate([...accumulatingBars], index, e, correctId, wrongId)
                        }
                        onKeyDown={(e) =>
                          handleAccumulatingBarsUpdate([...accumulatingBars], index, e, correctId, wrongId)
                        }
                        onChange={(e) => {
                          if (selectedBar !== id) {
                            setSelectedBar(id);
                          }
                          setPlaceHolder(e.target.value);
                        }}
                        style={{
                          width: `${70 / countingBars.length}%`,
                          left: `${(index / countingBars.length) * 100}%`,
                          animation:
                            wrongAnswer == wrongId
                              ? 'wrong 2s ease-in-out'
                              : correctAnswer == correctId
                                ? 'correct 2s ease-in-out'
                                : null,
                        }}
                      />
                    );
                  })}
                </DiagramIterationWrapper>
                <IndexChart initialArray={accumulatingBars} fullLength={true} />
              </SingleDiagram>
            </>
          )}
        </FirstStepContainer>
        {isCountingBarsSolved && isAccumulatingBarsSolved && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SingleDiagram style={{ width: '100%' }}>
              <DiagramName>Sortable Array</DiagramName>
              <BarChart barsHeight={25} height={130} bars={sortingBars} doNotShowNumber={true} fullLength={true} />
              <DiagramIterationWrapper>
                {sortingBars.map((bar, index) => {
                  const id = `sorting-bar-${index}`;
                  const wrongId = `wrong-sorting-bar-${index}`;
                  const correctId = `correct-sorting-bar-${index}`;
                  return (
                    <DiagramInput
                      value={selectedBar === id ? placeHolder : bar}
                      onAbort={(e) => handleSortingBarsUpdate([...sortingBars], index, e, correctId, wrongId)}
                      onBlur={(e) => handleSortingBarsUpdate([...sortingBars], index, e, correctId, wrongId)}
                      onKeyDown={(e) => handleSortingBarsUpdate([...sortingBars], index, e, correctId, wrongId)}
                      onChange={(e) => {
                        if (selectedBar !== id) {
                          setSelectedBar(id);
                        }
                        setPlaceHolder(e.target.value);
                      }}
                      style={{
                        width: `${70 / sortingBars.length}%`,
                        left: `${(index / sortingBars.length) * 100}%`,
                        animation:
                          wrongAnswer == wrongId
                            ? 'wrong 2s ease-in-out'
                            : correctAnswer == correctId
                              ? 'correct 2s ease-in-out'
                              : null,
                      }}
                    />
                  );
                })}
              </DiagramIterationWrapper>
              <IndexChart initialArray={sortingBars} fullLength={true} />
            </SingleDiagram>
            <SingleDiagram style={{ width: '100%' }}>
              <DiagramName>Unsorted Array</DiagramName>
              <BarChart barsHeight={25} height={130} bars={unsortedBars} doNotShowNumber={true} fullLength={true} />
              <DiagramIterationWrapper>
                {unsortedBars.map((bar, index) => {
                  const id = `sorted-bar-${index}`;
                  const wrongId = `wrong-unsorted-bar-${index}`;
                  const correctId = `correct-unsorted-bar-${index}`;
                  return (
                    <DiagramInput
                      value={selectedBar === id ? placeHolder : bar}
                      onAbort={(e) => handleUnsortedBarsUpdate([...unsortedBars], index, e, correctId, wrongId)}
                      onBlur={(e) => handleUnsortedBarsUpdate([...unsortedBars], index, e, correctId, wrongId)}
                      onKeyDown={(e) => handleUnsortedBarsUpdate([...unsortedBars], index, e, correctId, wrongId)}
                      onChange={(e) => {
                        if (selectedBar !== id) {
                          setSelectedBar(id);
                        }
                        setPlaceHolder(e.target.value);
                      }}
                      style={{
                        width: `${70 / unsortedBars.length}%`,
                        left: `${(index / unsortedBars.length) * 100}%`,
                        animation:
                          wrongAnswer == wrongId
                            ? 'wrong 2s ease-in-out'
                            : correctAnswer == correctId
                              ? 'correct 2s ease-in-out'
                              : null,
                      }}
                    />
                  );
                })}
              </DiagramIterationWrapper>
              <IndexChart initialArray={unsortedBars} fullLength={true} />
            </SingleDiagram>
          </div>
        )}
      </CountingSortEntriesContainer>

      <Button disabled={!isSolved} style={{ position: 'absolute', right: 15, top: 15 }}>
        Submit
      </Button>
    </SingleTaskContainer>
  );
};
export default CountingSortDeterminationTask;
