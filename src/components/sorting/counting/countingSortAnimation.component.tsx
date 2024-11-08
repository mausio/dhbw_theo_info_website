import { AlgorithmSection, Button } from '../../../styles/general/generic.style.ts';
import {
  ButtonPanel,
  ChartAligner,
  ControlPanel,
  KeyIndexContainer,
  SliderPanel,
} from '../../../styles/sorting/insertionSort.style.ts';
import BarChart from '../../general/barChart.component.tsx';
import IndexChart from '../../general/indexChart.component.tsx';
import { Slider } from '@mui/material';
import * as React from 'react';
import { useRef, useState } from 'react';
import { swapInArray } from '../../../utils/array.utils.ts';
import { wait } from '../../../utils/promise.utils.ts';
import { BarChartDivider } from '../../../styles/sorting/countingSort.style.ts';

const initialData = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4];

const CountingSortAnimation = () => {
  const delay = 1000;

  const [bars, setBars] = useState<number[]>(initialData);
  const [sortedBars, setSortedBars] = useState<number[]>(Array(initialData.length).fill(0));
  const [countingBars, setCountingBars] = useState<number[]>(
    Array(Math.max(...initialData) - Math.min(...initialData) + 1).fill(0)
  );
  const [isManual, setIsManual] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isShuffelling, setIsShuffeling] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [comparingIndex, setComparingIndex] = useState<number | null>(null);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [sortIndex, setSortIndex] = useState<number | null>(null);
  const [key, setKey] = useState<number | null>(null);
  const [infoText, setInfoText] = useState<string>('shuffle, then sort! :)');

  const exitRequestRef = useRef<boolean>(false);
  const pauseRequestRef = useRef<boolean>(false);
  const shuffelingRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  const smoothShuffleBars = async () => {
    setIsShuffeling(true);
    setSelectedIndex(null);
    setComparingIndex(null);

    const shuffledBars = [...bars];

    for (let r = 0; r < 3; r++) {
      for (let i = shuffledBars.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        swapInArray(shuffledBars, i, randomIndex);
        setBars([...shuffledBars]);
      }
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    setIsShuffeling(false);
    setIsSorted(false);
    shuffelingRequestRef.current = false;
  };

  const performCountingSort = async () => {
    setIsSorting(true);
    setInfoText(`Starting counting sort`);
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    const maxValue = Math.max(...bars);
    const minValue = Math.min(...bars);

    const countArray = Array(maxValue - minValue + 1).fill(0);

    setInfoText(`Next: counting phase`);
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    for (let i = 0; i < bars.length; i++) {
      setInfoText(`Accessing value A[${i + 1}] = ${bars[i]}`);
      setComparingIndex(i);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      setInfoText(`Selecting corresponding array B[${bars[i] - minValue + 1}]`);
      setSelectedIndex(bars[i] - minValue);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      countArray[bars[i] - minValue]++;
      setInfoText(`Incrementing count B[${bars[i] - minValue + 1}] = ${countArray[bars[i] - minValue]} `);
      setCountingBars([...countArray]);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }
      setSelectedIndex(null);
      if (exitRequestRef.current) {
        break;
      }
    }
    if (exitRequestRef.current) {
      return;
    }

    setComparingIndex(null);
    setSelectedIndex(null);

    setInfoText(`Next: summing up the totals`);
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    for (let i = 1; i <= maxValue - minValue; i++) {
      setInfoText(`B[${i + 1}] = B[${i - 1 + 1}] + B[${i + 1}] ...`);
      setSelectedIndex(i - 1);
      setPivotIndex(i);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      countArray[i] = countArray[i] + countArray[i - 1];
      setCountingBars([...countArray]);

      setInfoText(`... B[${i + 1}] = ${countArray[i]}`);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }
      if (exitRequestRef.current) {
        break;
      }
    }
    if (exitRequestRef.current) {
      return;
    }

    setSelectedIndex(null);
    setPivotIndex(null);

    setInfoText(`Next: placing elements in sorted array`);
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }
    if (exitRequestRef.current) {
      return;
    }

    const newSortedBars = [...sortedBars];
    const newBars = [...bars];

    for (let i = bars.length - 1; i >= 0; i--) {
      const currentValue = bars[i];
      const position = countArray[currentValue - minValue] - 1;

      setPivotIndex(currentValue - minValue);
      setInfoText(`Selecting counting element B[${currentValue - minValue}]`);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      setComparingIndex(i);
      setInfoText(`Selecting current element of unsorted A[${i + 1}]`);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      newSortedBars[position] = currentValue;
      setSortIndex(position);
      setInfoText(`Selecting new position C[${position + 1}]`);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      newBars[i] = 0;
      setBars([...newBars]);
      setSortedBars([...newSortedBars]);
      setInfoText(`Placing A[${currentValue - minValue + 1}] in C[${position + 1}]`);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      countArray[currentValue - minValue]--;
      setCountingBars([...countArray]);
      setInfoText(`Decrementing count for B[${currentValue - minValue + 1}]`);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      setComparingIndex(null);
      setSortIndex(null);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }
      if (exitRequestRef.current) {
        break;
      }
    }
    if (exitRequestRef.current) {
      return;
    }

    setInfoText('Done!');
    setSelectedIndex(null);
    setPivotIndex(null);
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    setIsSorting(false);
    setIsSorted(true);
    setComparingIndex(null);
    setCountingBars(Array(countingBars.length).fill(0));
    setInfoText('Array sorted!');
  };

  const performPause = async () => {
    if (pauseRequestRef.current || !stepRequestRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 5));
      await performPause();
    }
  };

  const makeChoice = async () => {
    setIsSorting(true);

    if (!isManual && isAnimated) {
      exitRequestRef.current = false;
      pauseRequestRef.current = false;
      await performCountingSort();
    }
  };

  const handleSliderChange = (event: Event, value: number) => {
    speedRequestRef.current = value;
  };

  const startManual = async () => {
    setIsShuffeling(false);
    setIsManual(true);
    setIsAnimated(false);
    stepRequestRef.current = false;
    pauseRequestRef.current = false;
    speedRequestRef.current = 5;
    await performCountingSort();
  };

  const startAnimated = async () => {
    if (isManual) {
      setIsManual(false);
      setIsShuffeling(false);
      setIsAnimated(true);
      stepRequestRef.current = true;
      pauseRequestRef.current = false;
      speedRequestRef.current = 1;
    } else {
      setIsShuffeling(false);
      setIsAnimated(true);
      stepRequestRef.current = true;
      pauseRequestRef.current = false;
      await performCountingSort();
    }
  };

  const makeAStep = async () => {
    pauseRequestRef.current = false;
    stepRequestRef.current = true;
    await wait(10);
    stepRequestRef.current = false;
  };

  const exitSorting = async () => {
    exitRequestRef.current = true;
    await wait(100);
    setIsShuffeling(false);
    setIsSorted(false);
    setIsManual(false);
    setIsSorting(false);
    setPivotIndex(null);
    setIsAnimated(false);
    setSelectedIndex(null);
    setComparingIndex(null);
    setBars(initialData);
    setCountingBars(Array(Math.max(...initialData) - Math.min(...initialData) + 1).fill(0));
    setSortedBars(Array(initialData.length).fill(0));
    exitRequestRef.current = false;
    stepRequestRef.current = false;
    pauseRequestRef.current = false;
    setInfoText(`shuffle, then sort! :)`);
  };

  const pauseSorting = async () => {
    setIsPaused(true);
    pauseRequestRef.current = true;
    stepRequestRef.current = false;
  };

  const continueSorting = async () => {
    setIsShuffeling(false);
    setIsAnimated(true);
    setIsSorting(true);
    pauseRequestRef.current = false;
    stepRequestRef.current = true;
    setIsPaused(false);
  };

  return (
    <AlgorithmSection style={{ height: 650 }}>
      <KeyIndexContainer>
        <p>{infoText}</p>
      </KeyIndexContainer>
      <ChartAligner>
        <div>
          <BarChart
            barsHeight={10}
            height={120}
            bars={countingBars}
            comparingIndex={selectedIndex}
            pivotIndex={pivotIndex}
          />
          {/*Switching comparingIndex with selectedIndex, so the animation is better*/}
          <IndexChart initialArray={countingBars} />
        </div>
        <BarChartDivider />
        <div>
          <BarChart barsHeight={15} height={90} comparingIndex={sortIndex} bars={sortedBars} />
          {/*Setting comparingIndex with sortIndex, so the animation is better*/}
          <IndexChart initialArray={initialData} pivotIndex={sortIndex} />
        </div>
        <BarChartDivider />
        <div>
          <BarChart barsHeight={15} height={90} bars={bars} comparingIndex={comparingIndex} />
          <IndexChart initialArray={initialData} />
        </div>
      </ChartAligner>
      <ControlPanel>
        <SliderPanel>
          <Slider
            aria-label="Temperature"
            defaultValue={1}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            disabled={isManual}
            step={0.25}
            min={0.25}
            max={3}
            sx={{ color: '#39576f' }}
          />
        </SliderPanel>
        <ButtonPanel>
          <Button onClick={smoothShuffleBars} disabled={isShuffelling || isSorting}>
            Shuffle
          </Button>
          <Button onClick={makeChoice} disabled={isShuffelling || isSorted || isSorting}>
            Sort
          </Button>

          {isManual || isPaused ? (
            <Button onClick={makeAStep} disabled={isShuffelling || isSorted || !isSorting || (isAnimated && !isPaused)}>
              Step
            </Button>
          ) : (
            <Button onClick={startManual} disabled={isManual || isShuffelling || isSorted || !isSorting || isAnimated}>
              Manual
            </Button>
          )}
          {isAnimated ? (
            isPaused ? (
              <Button onClick={continueSorting} disabled={isShuffelling || isSorted || !isSorting}>
                Continue
              </Button>
            ) : (
              <Button onClick={pauseSorting} disabled={isShuffelling || isSorted || !isSorting}>
                Pause
              </Button>
            )
          ) : (
            <Button onClick={startAnimated} disabled={isSorted || !isSorting || isAnimated}>
              Animate
            </Button>
          )}
          <Button onClick={exitSorting} disabled={isShuffelling || isSorted || !isSorting || !isAnimated || isPaused}>
            Exit
          </Button>
        </ButtonPanel>
      </ControlPanel>
    </AlgorithmSection>
  );
};

export default CountingSortAnimation;
