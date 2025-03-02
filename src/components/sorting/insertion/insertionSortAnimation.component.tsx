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
import { useEffect, useRef, useState } from 'react';
import { swapInArray } from '../../../utils/array.utils.ts';
import { wait } from '../../../utils/promise.utils.ts';
import { useTranslation } from 'react-i18next';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const InsertionSortAnimationComponent = () => {
  const { t } = useTranslation();
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
  const [infoText, setInfoText] = useState<string>(t('sorting.insertion.animation.initialMessage'));

  const pauseRequestRef = useRef<boolean>(false);
  const shuffelingRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  useEffect(() => {
    setPositions(bars.map((_, index) => index));
  }, [bars]);

  const smoothShuffleBars = async () => {
    setIsShuffeling(true);
    setSelectedIndex(null);
    setComparingIndex(null);
    setInfoText(t('sorting.insertion.animation.shuffling'));

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

  const performInsertionSort = async () => {
    setIsSorting(true);
    const sortedBars = [...bars];
    const newPositions = [...positions];

    for (let j = 1; j < sortedBars.length; j++) {
      const key = sortedBars[j];
      setKey(key);
      setInfoText(t('sorting.insertion.animation.key', { index: j + 1, value: key }));

      setSelectedIndex(j);

      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      let i = j - 1;

      while (i >= 0) {
        setComparingIndex(i);
        setSelectedIndex(i + 1);

        setInfoText(
          t('sorting.insertion.animation.comparison', {
            index: i + 1,
            value: sortedBars[i],
            comparison: sortedBars[i] < key ? t('sorting.insertion.animation.smaller') : t('sorting.insertion.animation.greater'),
            key: key
          })
        );

        if (!stepRequestRef.current || pauseRequestRef.current) {
          await performPause();
        }
        if (!isManual) {
          await wait(delay / speedRequestRef.current);
        }
        if (sortedBars[i] < key) {
          break;
        }

        setInfoText(t('sorting.insertion.animation.propagating'));

        sortedBars[i + 1] = sortedBars[i];
        newPositions[i + 1] = newPositions[i];

        await updateBarsAndPositions([...sortedBars], [...newPositions]);

        if (!stepRequestRef.current || pauseRequestRef.current) {
          await performPause();
        }
        if (!isManual) {
          await wait(delay / speedRequestRef.current);
        }

        i--;
      }

      setInfoText(t('sorting.insertion.animation.placingKey', { key: key, index: i + 1 }));

      sortedBars[i + 1] = key;
      newPositions[i + 1] = key;

      await updateBarsAndPositions([...sortedBars], [...newPositions]);

      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }

      setInfoText(t('sorting.insertion.animation.nextKey'));

      setSelectedIndex(initialData.length + 1);
      setComparingIndex(initialData.length + 1);

      if (!stepRequestRef.current || pauseRequestRef.current) {
        await performPause();
      }
      if (!isManual) {
        await wait(delay / speedRequestRef.current);
      }
    }

    makeChartInactive();
    setIsSorting(false);
    setIsManual(false);
    setIsAnimated(false);
    setIsSorted(true);
    setInfoText(t('sorting.insertion.animation.sortingCompleted'));
  };

  const updateBarsAndPositions = async (newBars: number[], newPositions: number[]) => {
    if (JSON.stringify(bars) != JSON.stringify(newBars)) {
      await setBars(newBars);
    }
    if (JSON.stringify(positions) != JSON.stringify(newPositions)) {
      await setPositions(newPositions);
    }
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
    speedRequestRef.current = 5;
    await performInsertionSort();
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
      await performInsertionSort();
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
        <BarChart 
          bars={bars} 
          selectedIndex={selectedIndex} 
          comparingIndex={comparingIndex} 
          pivotIndex={null}
          height={120}
          barsHeight={15}
          doNotShowNumber={false}
          fullLength={true}
        />
        <IndexChart 
          initialArray={initialData} 
          selectedIndex={comparingIndex}
          comparingIndex={null}
          pivotIndex={null}
          start={null}
          end={null}
          fullLength={true}
          height={25}
        />
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
            min={0.25}
            max={3}
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

export default InsertionSortAnimationComponent;
