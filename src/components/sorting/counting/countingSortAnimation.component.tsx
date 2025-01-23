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
import { useTranslation } from 'react-i18next';

const initialData = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4];

const CountingSortAnimation = () => {
  const { t } = useTranslation();
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
  const [infoText, setInfoText] = useState<string>(t('sorting.animation.common.initialMessage'));

  const pauseRequestRef = useRef<boolean>(false);
  const shuffelingRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  const smoothShuffleBars = async () => {
    setIsShuffeling(true);
    setSelectedIndex(null);
    setComparingIndex(null);
    setInfoText(t('sorting.animation.common.shuffling'));

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
    setInfoText(t('sorting.animation.common.shufflingFinished'));
    shuffelingRequestRef.current = false;
  };

  const performCountingSort = async () => {
    setIsSorting(true);
    setInfoText(t('sorting.counting.animation.countingPhase'));
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    const maxValue = Math.max(...bars);
    const minValue = Math.min(...bars);

    const countArray = Array(maxValue - minValue + 1).fill(0);

    setInfoText(t('sorting.counting.animation.step1'));
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    // 1
    for (let i = 0; i < bars.length; i++) {
      setInfoText(t('sorting.counting.animation.accessingValue', { index: i + 1, value: bars[i] }));
      setComparingIndex(i);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      setInfoText(t('sorting.counting.animation.selectingArray', { index: bars[i] - minValue + 1 }));
      setSelectedIndex(bars[i] - minValue);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      countArray[bars[i] - minValue]++;
      setInfoText(t('sorting.counting.animation.incrementingCount', { 
        index: bars[i] - minValue + 1, 
        count: countArray[bars[i] - minValue] 
      }));
      setCountingBars([...countArray]);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }
      setSelectedIndex(null);
    }

    setComparingIndex(null);
    setSelectedIndex(null);

    setInfoText(t('sorting.counting.animation.summingTotals'));
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }
    //2
    for (let i = 1; i <= countArray.length - 1; i++) {
      setInfoText(t('sorting.counting.animation.calculatingSum', { 
        index: i + 1,
        prevIndex: i - 1 + 1
      }));
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

      setInfoText(t('sorting.counting.animation.sumResult', { index: i + 1, sum: countArray[i] }));
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }
    }

    setSelectedIndex(null);
    setPivotIndex(null);

    setInfoText(t('sorting.counting.animation.placingElements'));
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }

    const newSortedBars = [...sortedBars];
    const newBars = [...bars];
    // 3
    for (let i = bars.length - 1; i >= 0; i--) {
      const currentValue = bars[i];
      const position = countArray[currentValue - minValue] - 1;

      setComparingIndex(i);
      setInfoText(t('sorting.counting.animation.selectingElement', { index: i + 1 }));
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      setPivotIndex(currentValue - minValue);
      setInfoText(t('sorting.counting.animation.selectingCount', { index: currentValue - minValue + 1 }));
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      newSortedBars[position] = currentValue;
      setSortIndex(position);
      setInfoText(t('sorting.counting.animation.selectingPosition', { index: position + 1 }));
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      newBars[i] = 0;
      setBars([...newBars]);
      setSortedBars([...newSortedBars]);
      setInfoText(t('sorting.counting.animation.placingElement', { 
        sourceIndex: currentValue - minValue + 1,
        targetIndex: position + 1
      }));
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      countArray[currentValue - minValue]--;
      setCountingBars([...countArray]);
      setInfoText(t('sorting.counting.animation.decrementingCount', { index: currentValue - minValue + 1 }));
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      setSortIndex(null);
      setPivotIndex(null);
      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }
    }

    setInfoText(t('sorting.counting.animation.done'));
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
    setInfoText(t('sorting.counting.animation.sortingComplete'));
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
      setIsShuffeling(false)
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
            aria-label={t('sorting.animation.common.speedSlider')}
            defaultValue={1}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            disabled={isManual}
            step={0.25}
            min={0.5}
            max={4}
            sx={{ color: '#39576f' }}
          />
        </SliderPanel>
        <ButtonPanel>
          <Button onClick={smoothShuffleBars} disabled={isShuffelling || isSorting}>
            {t('sorting.animation.common.buttons.shuffle')}
          </Button>
          <Button onClick={makeChoice} disabled={isShuffelling || isSorted || isSorting}>
            {t('sorting.animation.common.buttons.sort')}
          </Button>

          {isManual || isPaused ? (
            <Button onClick={makeAStep} disabled={isShuffelling || isSorted || !isSorting || (isAnimated && !isPaused)}>
              {t('sorting.animation.common.buttons.step')}
            </Button>
          ) : (
            <Button onClick={startManual} disabled={isManual || isShuffelling || isSorted || !isSorting || isAnimated}>
              {t('sorting.animation.common.buttons.manual')}
            </Button>
          )}
          {isAnimated ? (
            isPaused ? (
              <Button onClick={continueSorting} disabled={isShuffelling || isSorted || !isSorting}>
                {t('sorting.animation.common.buttons.continue')}
              </Button>
            ) : (
              <Button onClick={pauseSorting} disabled={isShuffelling || isSorted || !isSorting}>
                {t('sorting.animation.common.buttons.pause')}
              </Button>
            )
          ) : (
            <Button onClick={startAnimated} disabled={isSorted || !isSorting || isAnimated}>
              {t('sorting.animation.common.buttons.animate')}
            </Button>
          )}
        </ButtonPanel>
      </ControlPanel>
    </AlgorithmSection>
  );
};

export default CountingSortAnimation;
