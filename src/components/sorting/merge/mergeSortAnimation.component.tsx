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
import { useTranslation } from 'react-i18next';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MergeSortAnimation = () => {
  const { t } = useTranslation();
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
  const [infoText, setInfoText] = useState<string>(t('sorting.animation.common.initialMessage'));

  const pauseRequestRef = useRef<boolean>(false);
  const shuffelingRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  const performMergeSort = async () => {
    setIsSorting(true);
    setIsSorted(false);
    await mergeSort(bars, 0, bars.length - 1);
    setIsSorted(true);
    setIsSorting(false);
    setIsManual(false);
    setIsAnimated(false);
    setIsPaused(false);
    setSelectedIndex(null);
    setComparingIndex(null);
    setInfoText(t('sorting.animation.common.sortingComplete'));
  };

  async function mergeSort(arr: number[], left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      setInfoText(`Dividing array from index ${left + 1} to ${right + 1}`);
      setSelectedIndex(left);
      setComparingIndex(right);
      await stepPauseWaitRequest();

      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  }

  async function merge(arr: number[], left: number, mid: number, right: number) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = new Array(n1);
    const R = new Array(n2);

    setInfoText(`Merging subarrays: [${left + 1}-${mid + 1}] and [${mid + 2}-${right + 1}]`);
    await stepPauseWaitRequest();

    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
      setSelectedIndex(left + i);
      await stepPauseWaitRequest();
    }

    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j];
      setComparingIndex(mid + 1 + j);
      await stepPauseWaitRequest();
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      setInfoText(`Comparing L[${i + 1}]=${L[i]} and R[${j + 1}]=${R[j]}`);
      setSelectedIndex(left + i);
      setComparingIndex(mid + 1 + j);
      await stepPauseWaitRequest();

      if (L[i] <= R[j]) {
        setInfoText(`Placing ${L[i]} at position ${k + 1}`);
        arr[k] = L[i];
        i++;
      } else {
        setInfoText(`Placing ${R[j]} at position ${k + 1}`);
        arr[k] = R[j];
        j++;
      }
      setBars([...arr]);
      await stepPauseWaitRequest();
      k++;
    }

    while (i < n1) {
      setInfoText(`Placing remaining left element ${L[i]} at position ${k + 1}`);
      setSelectedIndex(k);
      arr[k] = L[i];
      setBars([...arr]);
      await stepPauseWaitRequest();
      i++;
      k++;
    }

    while (j < n2) {
      setInfoText(`Placing remaining right element ${R[j]} at position ${k + 1}`);
      setComparingIndex(k);
      arr[k] = R[j];
      setBars([...arr]);
      await stepPauseWaitRequest();
      j++;
      k++;
    }

    setSelectedIndex(null);
    setComparingIndex(null);
  }

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
      await wait(350);
    }

    setIsShuffeling(false);
    setIsSorted(false);
    setInfoText(t('sorting.animation.common.shufflingFinished'));
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

  const stepPauseWaitRequest = async () => {
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }
    await wait(10);
  };

  const makeChoice = async () => {
    setIsSorting(true);

    if (!isManual && isAnimated) {
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
          height={150}
          barsHeight={15}
          doNotShowNumber={false}
          fullLength={bars.length}
        />
        <IndexChart 
          initialArray={initialData} 
          selectedIndex={selectedIndex}
          comparingIndex={comparingIndex}
          pivotIndex={null}
          start={null}
          end={null}
          fullLength={bars.length}
          height={30}
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
            step={0.2}
            min={0.2}
            max={2}
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

export default MergeSortAnimation;
