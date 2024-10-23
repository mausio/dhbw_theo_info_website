import { AlgorithmSection, Button } from '../styles/generic.style.ts';
import {
  ButtonPanel,
  ChartAligner,
  ControlPanel,
  KeyIndexContainer,
  SliderPanel,
  Spacer,
} from '../styles/insertion.style.ts';
import BarChart from './barChart.component.tsx';
import IndexChart from './indexChart.component.tsx';
import { Slider } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { swapInArray } from '../utils/shuffle.utils.ts';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const InsertionSortAnimationComponent = () => {
  const delay = 1000;

  const [bars, setBars] = useState<number[]>(initialData);
  const [positions, setPositions] = useState<number[]>([]);
  const [isManual, setIsManual] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isShuffelling, setIsShuffeling] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [comparingIndex, setComparingIndex] = useState<number | null>(null);
  const [key, setKey] = useState<number | null>(null);
  const [infoText, setInfoText] = useState<string>('');

  const exitRequestRef = useRef<boolean>(false);
  const pauseRequestRef = useRef<boolean>(false);
  const shuffelingRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  useEffect(() => {
    setPositions(bars.map((_, index) => index));
  }, [bars]);

  const animateSwap = (i: number, j: number) => {
    const newPositions = [...positions];
    [newPositions[i], newPositions[j]] = [newPositions[j], newPositions[i]];
    setPositions(newPositions);
  };

  const smoothShuffleBars = async () => {
    setIsShuffeling(true);
    setSelectedIndex(null);
    setComparingIndex(null);

    const shuffledBars = [...bars];

    for (let r = 0; r < 3; r++) {
      for (let i = shuffledBars.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        swapInArray(shuffledBars, i, randomIndex);
        animateSwap(i, randomIndex);
        setBars([...shuffledBars]);
      }
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    setIsShuffeling(false);
    setIsSorted(false);
    shuffelingRequestRef.current = false;
  };

  const performInsertionSort = async () => {
    setIsSorting(true);
    const sortedBars = [...bars];
    const newPositions = [...positions];

    for (let j = 1; j < sortedBars.length; j++) {
      const key = sortedBars[j];
      setKey(key);
      setSelectedIndex(j);

      let i = j - 1;

      setComparingIndex(i);

      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait();
      }

      while (i >= 0) {
        if (sortedBars[i] < key) {
          break;
        }
        setSelectedIndex(i + 1);
        setComparingIndex(i);

        if (!stepRequestRef.current || pauseRequestRef.current) {
          await performPause();
        }
        if (!isManual) {
          await wait();
        }

        sortedBars[i + 1] = sortedBars[i];
        newPositions[i + 1] = newPositions[i];

        setBars([...sortedBars]);
        setPositions([...newPositions]);

        if (!stepRequestRef.current || pauseRequestRef.current) {
          await performPause();
        }
        if (!isManual) {
          await wait();
        }

        i--;
      }

      sortedBars[i + 1] = key;
      newPositions[i + 1] = key;

      setBars([...sortedBars]);
      setPositions([...newPositions]);

      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait();
      }
      if (exitRequestRef.current) {
        break;
      }
    }

    if (exitRequestRef.current) {
      return;
    }

    makeChartInactive();
    setIsSorting(false);
    setIsManual(false);
    setIsAnimated(false);
    setIsSorted(true);
  };

  const wait = async () => {
    await new Promise((resolve) => setTimeout(resolve, delay / speedRequestRef.current));
  };

  const makeChartInactive = () => {
    setKey(null);
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
      await performInsertionSort();
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
    await performInsertionSort();
  };

  const startAnimated = async () => {
    setIsShuffeling(false);
    setIsManual(false);
    setIsAnimated(true);
    stepRequestRef.current = true;
    pauseRequestRef.current = false;
    await performInsertionSort();
  };

  const makeAStep = async () => {
    stepRequestRef.current = true;
    await wait();
    stepRequestRef.current = false;
    pauseRequestRef.current = false;
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
        {/*<p style={{ color: 'red' }}>i:</p>*/}
        {/*<p style={{ color: 'red' }}>{comparingIndex ? comparingIndex + 1 : 'none'}</p>*/}
        {/*<Spacer></Spacer>*/}
        {/*<p>key:</p>*/}
        {/*<p>{key ? key : 'none'}</p>*/}
        {/*<Spacer></Spacer>*/}
        <p>{infoText}</p>
      </KeyIndexContainer>
      <ChartAligner>
        <BarChart bars={bars} positions={positions} selectedIndex={selectedIndex} comparingIndex={comparingIndex} />
        <IndexChart initialArray={initialData} positions={positions} selectedIndex={comparingIndex} />
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
            marks
            min={0.25}
            max={5}
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

          {isManual ? (
            <Button onClick={makeAStep} disabled={!isManual || isShuffelling || isSorted || !isSorting || isAnimated}>
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
            <Button onClick={startAnimated} disabled={isSorted || !isSorting || isAnimated || isManual}>
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

export default InsertionSortAnimationComponent;
