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

const MergeSortAnimation = () => {
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
  const [infoText, setInfoText] = useState<string>('shuffle, then sort! :)');

  const exitRequestRef = useRef<boolean>(false);
  const pauseRequestRef = useRef<boolean>(false);
  const shuffelingRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  const performMergeSort = () => {
    mergeSort(bars);
  };

  function mergeSort(bars) {
    if (bars.length <= 1) {
      return bars;
    }

    const middle = Math.floor(bars.length / 2);
    const left = bars.slice(0, middle);
    const right = bars.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(left, right) {
    const sortedArray = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        sortedArray.push(left[i]);
        i++;
      } else {
        sortedArray.push(right[j]);
        j++;
      }
    }

    return sortedArray.concat(left.slice(i)).concat(right.slice(j));
  }

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
      await wait(350);
    }

    setIsShuffeling(false);
    setIsSorted(false);
    shuffelingRequestRef.current = false;
  };

  const makeChartInactive = () => {
    setSelectedIndex(null);
    setComparingIndex(null);
  };

  const performPause = async () => {
    if (pauseRequestRef.current || !stepRequestRef.current) {
      await wait(10);
      await performPause();
    }
  };

  const makeChoice = async () => {
    setIsSorting(true);

    if (!isManual && isAnimated) {
      exitRequestRef.current = false;
      pauseRequestRef.current = false;
      await performMergeSort();
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
    await performMergeSort();
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
      await performMergeSort();
    }
  };

  const makeAStep = async () => {
    pauseRequestRef.current = false;
    stepRequestRef.current = true;
    await wait(10);
    stepRequestRef.current = false;
  };

  const exitSorting = async () => {
    setIsShuffeling(false);
    setIsSorting(false);
    setIsSorted(false);
    makeChartInactive();
    exitRequestRef.current = true;
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
        <BarChart bars={bars} selectedIndex={selectedIndex} comparingIndex={comparingIndex} pivotIndex={null} />
        <IndexChart initialArray={initialData} selectedIndex={comparingIndex} />
      </ChartAligner>
      <ControlPanel>
        <SliderPanel>
          <Slider
            aria-label="Temperature"
            defaultValue={1}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            disabled={isManual}
            step={0.2}
            // marks
            min={0.2}
            max={2}
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

export default MergeSortAnimation;
