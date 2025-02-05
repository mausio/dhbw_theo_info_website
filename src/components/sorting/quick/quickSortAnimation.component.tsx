import { AlgorithmSection, Button } from '../../../styles/general/generic.style.ts';
import {
  ButtonPanel,
  ChartAligner,
  ControlPanel,
  KeyIndexContainer,
  SliderPanel,
} from '../../../styles/sorting/insertionSort.style.ts';
import * as React from 'react';
import { useRef, useState } from 'react';
import BarChart from '../../general/barChart.component.tsx';
import IndexChart from '../../general/indexChart.component.tsx';
import { Slider } from '@mui/material';
import { swapInArray } from '../../../utils/array.utils.ts';
import { wait } from '../../../utils/promise.utils.ts';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const QuickSortAnimation = () => {
  const delay = 1000;

  const [bars, setBars] = useState<number[]>(initialData);
  const [isManual, setIsManual] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isShuffelling, setIsShuffeling] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [comparingIndex, setComparingIndex] = useState<number | null>(null);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [infoText, setInfoText] = useState<string>('shuffle, then sort! :)');
  const [isStart, setIsStart] = useState<number | null>(null);
  const [isEnd, setIsEnd] = useState<number | null>(null);

  const exitRequestRef = useRef<boolean>(false);
  const pauseRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  const performQuicksort = async () => {
    const arr = [...bars];
    setIsSorting(true);
    setIsSorted(false);
    await wait(delay / speedRequestRef.current);
    await quickSort(arr, 0, arr.length - 1);
    setIsSorted(true);
    setIsSorting(false);

    exitRequestRef.current = false;
    pauseRequestRef.current = false;
    setIsPaused(false);
    setPivotIndex(null);
    setSelectedIndex(null);
    setComparingIndex(null);
    setIsStart(null);
    setIsEnd(null);
    setInfoText('Sorting complete!');
  };

  async function quickSort(A, start, end) {
    if (start < end && !exitRequestRef.current) {
      setInfoText(`Sorting range: [${start + 1} - ${end + 1}]`);
      setIsStart(start);
      setIsEnd(end);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      const q = await partition(A, start, end);

      await quickSort(A, start, q - 1);
      await quickSort(A, q + 1, end);
    }
    setBars([...A]);
  }

  async function partition(A, start, end) {
    const pivotValue = A[end];
    let i = start - 1;

    setPivotIndex(end);
    setInfoText(`A[${end + 1}]=${A[end]} is pivot`);
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    for (let j = start; j <= end - 1; j++) {
      setSelectedIndex(j);
      setInfoText(`Comparing A[${j + 1}]=${A[j]} with the pivot A[${end + 1}]=${pivotValue}`);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      if (A[j] <= pivotValue) {
        setInfoText(`A[${j + 1}]=${A[j]} is smaller than pivot A[${end + 1}]=${pivotValue}`);

        if (!stepRequestRef.current || pauseRequestRef.current) {
          await performPause();
        }
        if (!isManual) {
          await wait(delay / speedRequestRef.current);
        }

        i++;

        setComparingIndex(i);
        if (i != j) {
          setInfoText(`Selecting last bigger A[${i + 1}]=${A[i]} than pivot`);

          if (!stepRequestRef.current || pauseRequestRef.current) {
            await performPause();
          }
          if (!isManual) {
            await wait(delay / speedRequestRef.current);
          }
        }

        [A[i], A[j]] = [A[j], A[i]];
        setBars([...A]);
        if (i !== j) {
          (i, j);
          setInfoText(`Swapped A[${i + 1}] and A[${j + 1}]`);
        } else {
          setInfoText(`Nothing to swap`);
        }
        if (!stepRequestRef.current || pauseRequestRef.current) {
          await performPause();
        }
        if (!isManual) {
          await wait(delay / speedRequestRef.current);
        }
        setComparingIndex(null);
      }
    }

    setComparingIndex(i + 1);
    setSelectedIndex(null);
    if (A[i] != null) setInfoText(`Selecting last bigger A[${i + 1}]=${A[i]} than pivot`);
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    if (A[i + 1] != A[end]) {
      setInfoText(`Swapping pivot A[${i + 2}]=${A[i + 1]} with A[${end}]=${A[end]}`);
    } else {
      setInfoText('Leaving pivot as it is');
    }
    [A[i + 1], A[end]] = [A[end], A[i + 1]];
    setBars([...A]);
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    setSelectedIndex(null);
    setComparingIndex(null);
    setPivotIndex(null);
    setInfoText('Moving on recursively, if not finished');
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    return i + 1;
  }

  const smoothShuffleBars = async () => {
    setIsShuffeling(true);
    setSelectedIndex(null);
    setComparingIndex(null);
    setInfoText('Shuffling array...');

    const shuffledBars = [...bars];

    for (let r = 0; r < 3; r++) {
      for (let i = shuffledBars.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        swapInArray(shuffledBars, i, randomIndex);
        setBars([...shuffledBars]);
      }
      await wait(350);
    }

    setIsShuffeling(false);
    setIsSorted(false);
    setInfoText('Array shuffled! Ready to sort.');
  };
  const makeChartInactive = () => {
    setSelectedIndex(null);
    setComparingIndex(null);
  };

  const performPause = async () => {
    if (pauseRequestRef.current || !stepRequestRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      await performPause();
    }
  };

  const makeChoice = async () => {
    setIsSorting(true);

    if (!isManual && isAnimated) {
      exitRequestRef.current = false;
      pauseRequestRef.current = false;
      await performQuicksort();
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
    await performQuicksort();
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
      await performQuicksort();
    }
  };

  const makeAStep = async () => {
    pauseRequestRef.current = false;
    stepRequestRef.current = true;
    await wait(10);
    stepRequestRef.current = false;
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
    <AlgorithmSection>
      <KeyIndexContainer>
        <p>{infoText}</p>
      </KeyIndexContainer>
      <ChartAligner>
        <BarChart bars={bars} selectedIndex={selectedIndex} comparingIndex={comparingIndex} pivotIndex={pivotIndex} />
        <IndexChart
          initialArray={initialData}
          selectedIndex={selectedIndex}
          pivotIndex={pivotIndex}
          start={isStart}
          end={isEnd}
        />
      </ChartAligner>
      <ControlPanel>
        <SliderPanel>
          <Slider
            aria-label="Speed"
            defaultValue={1}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            disabled={isManual}
            step={0.1}
            min={0.2}
            max={4}
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
        </ButtonPanel>
      </ControlPanel>
    </AlgorithmSection>
  );
};

export default QuickSortAnimation;
