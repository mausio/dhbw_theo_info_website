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
  SecondStepContainer,
  SingleDiagramContainer,
} from '../../../styles/sorting/countingSort.style.ts';
import BarChart from '../../general/barChart.component.tsx';
import IndexChart from '../../general/indexChart.component.tsx';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { wait } from '../../../utils/promise.utils.ts';
import { useTranslation } from 'react-i18next';

export type CountingIteration = {
  countingArray: number[];
  sortableArray: number[];
  unsortedArray: number[];
  currentSortableArrayIndex: number;
  currentCountingArrayIndex: number;
  currentUnsortedArrayIndex: number;
};

//TODO: Hier ist ein Bug. testen&testen&testen und finden =>

const CountingSortDeterminationTask = () => {
  const { t } = useTranslation();
  const n = 10;
  const [initialData] = useState<number[]>(generateRandomArrayOfNFromTo(n, 1, 5));
  const [accumulatingBarsSolution, setAccumulatingBarsSolution] = useState<number[]>([]);
  const [accumulatingBars, setAccumulatingBars] = useState<number[]>([]);
  const [countingBarsSolution, setCountingBarsSolution] = useState<number[]>([]);
  const [countingBars, setCountingBars] = useState<number[]>([]);
  const [sortedBars, setSortedBars] = useState<number[]>([]);
  const [sortableBars, setSortableBars] = useState<number[]>([]);
  const [unsortedBars, setUnsortedBars] = useState<number[]>([...initialData]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isAccumulatingBarsSolved, setIsAccumulatingBarsSolved] = useState<boolean>(false);
  const [isCountingBarsSolved, setIsCountingBarsSolved] = useState<boolean>(false);
  const [isRunningConfetti, setIsRunningConfetti] = useState<boolean>(false);
  const [isRecycling, setIsRecycling] = useState<boolean>(false);
  const [selectedBar, setSelectedBar] = useState<string>('');
  const [wrongAnswer, setWrongAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [placeHolder, setPlaceHolder] = useState<string | number>(null);
  const [barsIterationSolution, setBarsIterationSolution] = useState<CountingIteration[]>([]);
  const [iterationNr, setIterationNr] = useState<number>(0);
  const [markedCount, setMarkedCount] = useState<number>(null);
  const [markedUnsorted, setMarkedUnsorted] = useState<number>(null);
  const [markedSortable, setMarkedSortable] = useState<number>(null);

  const handleConfetti = async () => {
    setIsRecycling(true);
    setIsRunningConfetti(true);
    await wait(3000);
    setIsRecycling(false);
    await wait(10000);
    setIsRunningConfetti(false);
  };

  function countingSort(inputArr) {
    if (inputArr.length === 0) return unsortedArray;

    const unsortedArray = [...inputArr];

    const maxValue = Math.max(...unsortedArray);

    const countArray = new Array(maxValue).fill(0);
    const sortedArray = new Array(unsortedArray.length).fill(0);

    // 1
    for (let i = 0; i < unsortedArray.length; i++) {
      countArray[unsortedArray[i] - 1]++;
    }
    if (countingBarsSolution.length <= 0) {
      setCountingBarsSolution([...countArray]);
      setCountingBars(Array(countArray.length).fill(0));
    }

    // 2
    for (let i = 1; i <= maxValue - 1; i++) {
      countArray[i] += countArray[i - 1];
    }
    if (accumulatingBarsSolution.length <= 0) {
      setAccumulatingBarsSolution([...countArray]);
      setAccumulatingBars(Array(countArray.length).fill(0));
    }

    const iterations: CountingIteration[] = [];

    // 3
    for (let i = unsortedArray.length - 1; i >= 0; i--) {
      const currentValue = unsortedArray[i];

      const position = countArray[currentValue - 1] - 1;

      sortedArray[position] = currentValue;

      countArray[currentValue - 1]--;

      unsortedArray[i] = 0;

      iterations.push({
        currentCountingArrayIndex: currentValue - 1,
        currentSortableArrayIndex: position,
        currentUnsortedArrayIndex: i,
        countingArray: [...countArray],
        sortableArray: [...sortedArray],
        unsortedArray: [...unsortedArray],
      });
    }

    console.log(iterations);

    if (sortedBars.length <= 0) {
      setSortedBars(sortedArray);
      setSortableBars(Array(sortedArray.length).fill(0));
      setBarsIterationSolution([...iterations]);
    }
  }

  useEffect(() => {
    countingSort(initialData);
  }, []);

  const handleUnsortedBarsUpdate = (array, index, event, correctId, wrongId) => {
    const newArr = performBarUpdate(array, index, event);

    if (!newArr) return;

    setUnsortedBars(newArr);

    setSelectedBar(null);
    setPlaceHolder(null);

    checkIterationSolution(accumulatingBars, sortableBars, newArr);
    checkBar(newArr[index], barsIterationSolution[iterationNr].unsortedArray[index], correctId, wrongId);
  };

  const handleSortableBarsUpdate = (array, index, event, correctId, wrongId) => {
    const newArr = performBarUpdate(array, index, event);

    if (!newArr) return;

    setSelectedBar(null);
    setPlaceHolder(null);

    setSortableBars(newArr);

    checkIterationSolution(accumulatingBars, newArr, unsortedBars);
    checkBar(newArr[index], barsIterationSolution[iterationNr].sortableArray[index], correctId, wrongId);
  };

  const handleCountingBarsUpdate = (array, index, event, correctId, wrongId) => {
    const newArr = performBarUpdate(array, index, event);

    if (!newArr) return;

    setSelectedBar(null);
    setPlaceHolder(null);

    checkBar(newArr[index], countingBarsSolution[index], correctId, wrongId);
    setCountingBars(newArr);

    if (!isCountingBarsSolved) {
      setIsCountingBarsSolved(checkBarsArray(newArr, countingBarsSolution));
    }
  };

  const handleAccumulatingBarsUpdate = async (array, index, event, correctId, wrongId) => {
    const newArr = performBarUpdate(array, index, event);

    if (!newArr) return;

    setSelectedBar(null);
    setPlaceHolder(null);

    setAccumulatingBars(newArr);

    if (isAccumulatingBarsSolved) {
      checkIterationSolution(newArr, sortableBars, unsortedBars);
      checkBar(newArr[index], barsIterationSolution[iterationNr].countingArray[index], correctId, wrongId);
    }

    if (!isAccumulatingBarsSolved) {
      checkBar(newArr[index], accumulatingBarsSolution[index], correctId, wrongId);
      setIsAccumulatingBarsSolved(checkBarsArray(newArr, accumulatingBarsSolution));
      if (checkBarsArray(newArr, accumulatingBarsSolution)) {
        setMarkedElements();
      }
    }
  };

  function performBarUpdate(array, index, event) {
    if (!(event.type == 'blur' || event.key == 'Enter' || event.type == 'abort')) return null;
    const newValue = sanitizeAndParse(event.target.value);

    if (0 <= newValue && newValue <= n + 1) {
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

  const checkBarsArray = (array, expectedArray) => JSON.stringify(array) == JSON.stringify(expectedArray);

  async function checkBar(a, b, correctId, wrongId) {
    if (JSON.stringify(a) == JSON.stringify(b)) {
      setCorrectAnswer(correctId);
    } else {
      setWrongAnswer(wrongId);
    }
    await wait(2000);
    setCorrectAnswer('');
    setWrongAnswer('');

    return JSON.stringify(a) == JSON.stringify(b);
  }

  function setMarkedElements(num?) {
    console.log('marking at iteration nr', num, iterationNr);
    if ((num ? num : iterationNr) < barsIterationSolution.length) {
      setMarkedCount(barsIterationSolution[num ? num : iterationNr].currentCountingArrayIndex);
      setMarkedSortable(barsIterationSolution[num ? num : iterationNr].currentSortableArrayIndex);
      setMarkedUnsorted(barsIterationSolution[num ? num : iterationNr].currentUnsortedArrayIndex);
    } else {
      setMarkedCount(null);
      setMarkedSortable(null);
      setMarkedUnsorted(null);
    }
  }

  function checkIterationSolution(accumulatingBars, sortableBars, unsortedBars) {
    if (handleCheck(sortableBars, sortedBars)) {
      return;
    }

    if (
      checkBarsArray(accumulatingBars, barsIterationSolution[iterationNr].countingArray) &&
      checkBarsArray(sortableBars, barsIterationSolution[iterationNr].sortableArray) &&
      checkBarsArray(unsortedBars, barsIterationSolution[iterationNr].unsortedArray)
    ) {
      setMarkedElements(iterationNr + 1);
      setIterationNr(iterationNr + 1);
      return;
    }

    setMarkedElements();
  }

  function handleCheck(sortableBars, expectedSolution) {
    if (JSON.stringify(sortableBars) == JSON.stringify(expectedSolution)) {
      console.log('done!');
      setIsSolved(true);
      setCountingBars(Array(countingBars.length).fill(0));
      setAccumulatingBars(Array(accumulatingBars.length).fill(0));
      handleConfetti();
      return true;
    }

    return false;
  }

  return (
    <SingleTaskContainer>
      <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <h2 style={{ maxWidth: '88%' }}>
        {t('sorting.counting.task.title')} <MarkedRedText>B</MarkedRedText>
      </h2>
      <p>{t('sorting.counting.task.description')}</p>
      <p>
        {t('sorting.counting.task.inputArray')} <MarkedText>[{printArray(initialData)}]</MarkedText>
      </p>
      <CountingSortEntriesContainer>
        <FirstStepContainer>
          <SingleDiagramContainer>
            <DiagramName>
              <MarkedRedText>{t('sorting.counting.task.arrays.counting')}</MarkedRedText>
            </DiagramName>
            <BarChart barsHeight={10} height={120} bars={countingBars} doNotShowNumber={true} fullLength={true} />
            <DiagramIterationWrapper>
              {countingBars.map((bar, index) => {
                const id = `counting-bar-${index}`;
                const wrongId = `wrong-counting-bar-${index}`;
                const correctId = `correct-counting-bar-${index}`;
                return (
                  <DiagramInput
                    disabled={isCountingBarsSolved || isSolved}
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
          </SingleDiagramContainer>
          {isCountingBarsSolved && (
            <>
              <KeyboardDoubleArrowRightIcon style={{ fontSize: '1.75rem', color: 'gray' }} />
              <SingleDiagramContainer>
                <DiagramName>
                  <MarkedRedText>{t('sorting.counting.task.arrays.accumulating')}</MarkedRedText>
                </DiagramName>
                <BarChart
                  pivotIndex={markedCount}
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
                          borderColor: markedCount == index && 'indianred',
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
                <IndexChart pivotIndex={markedCount} initialArray={accumulatingBars} fullLength={true} />
              </SingleDiagramContainer>
            </>
          )}
        </FirstStepContainer>
        {isCountingBarsSolved && isAccumulatingBarsSolved && (
          <SecondStepContainer>
            <SingleDiagramContainer style={{ width: '100%' }}>
              <DiagramName>
                <MarkedRedText>{t('sorting.counting.task.arrays.sortable')}</MarkedRedText>
              </DiagramName>
              <BarChart
                selectedIndex={markedSortable}
                barsHeight={25}
                height={130}
                bars={sortableBars}
                doNotShowNumber={true}
                fullLength={true}
              />
              <DiagramIterationWrapper>
                {sortableBars.map((bar, index) => {
                  const id = `sorting-bar-${index}`;
                  const wrongId = `wrong-sorting-bar-${index}`;
                  const correctId = `correct-sorting-bar-${index}`;
                  return (
                    <DiagramInput
                      disabled={isSolved}
                      value={selectedBar === id ? placeHolder : bar}
                      onAbort={(e) => handleSortableBarsUpdate([...sortableBars], index, e, correctId, wrongId)}
                      onBlur={(e) => handleSortableBarsUpdate([...sortableBars], index, e, correctId, wrongId)}
                      onKeyDown={(e) => handleSortableBarsUpdate([...sortableBars], index, e, correctId, wrongId)}
                      onChange={(e) => {
                        if (selectedBar !== id) {
                          setSelectedBar(id);
                        }
                        setPlaceHolder(e.target.value);
                      }}
                      style={{
                        width: `${70 / sortableBars.length}%`,
                        left: `${(index / sortableBars.length) * 100}%`,
                        borderColor: markedSortable == index && 'lightslategray',
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
              <IndexChart selectedIndex={markedSortable} initialArray={sortableBars} fullLength={true} />
            </SingleDiagramContainer>
            <SingleDiagramContainer style={{ width: '100%' }}>
              <DiagramName>
                <MarkedRedText>{t('sorting.counting.task.arrays.unsorted')}</MarkedRedText>
              </DiagramName>
              <BarChart
                comparingIndex={markedUnsorted}
                barsHeight={25}
                height={130}
                bars={unsortedBars}
                doNotShowNumber={true}
                fullLength={true}
              />
              <DiagramIterationWrapper>
                {unsortedBars.map((bar, index) => {
                  const id = `sorted-bar-${index}`;
                  const wrongId = `wrong-unsorted-bar-${index}`;
                  const correctId = `correct-unsorted-bar-${index}`;
                  return (
                    <DiagramInput
                      disabled={isSolved}
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
                        borderColor: markedUnsorted == index && 'lightslategray',
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
              <IndexChart selectedIndex={markedUnsorted} initialArray={unsortedBars} fullLength={true} />
            </SingleDiagramContainer>
          </SecondStepContainer>
        )}
      </CountingSortEntriesContainer>

      <Button disabled={!isSolved} style={{ position: 'absolute', right: 15, top: 15 }}>
        {t('sorting.counting.task.submit')}
      </Button>
    </SingleTaskContainer>
  );
};
export default CountingSortDeterminationTask;
