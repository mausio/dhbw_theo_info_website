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
import { MainArrayContainer, SingleTempArrayContainer, TempArraysContainer } from '../../../styles/sorting/mergeSort.style.ts';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MergeSortAnimation = () => {
  const { t } = useTranslation();
  const delay = 1250;

  const [bars, setBars] = useState<number[]>(initialData);
  const [leftArray, setLeftArray] = useState<number[]>(Array(5).fill(0));
  const [rightArray, setRightArray] = useState<number[]>(Array(5).fill(0));
  const [isManual, setIsManual] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isShuffelling, setIsShuffeling] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [comparingIndex, setComparingIndex] = useState<number | null>(null);
  const [leftSelectedIndex, setLeftSelectedIndex] = useState<number | null>(null);
  const [rightSelectedIndex, setRightSelectedIndex] = useState<number | null>(null);
  const [infoText, setInfoText] = useState<string>(t('sorting.animation.common.initialMessage'));
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);

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
    setLeftSelectedIndex(null);
    setRightSelectedIndex(null);
    setLeftArray(Array(5).fill(0));
    setRightArray(Array(5).fill(0));
    setInfoText(t('sorting.merge.animation.sortingComplete'));
  };

  async function mergeSort(arr: number[], left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      setInfoText(t('sorting.merge.animation.lookingAtRange', { start: left + 1, end: right + 1 }));
      setStart(left);
      setEnd(right);
      await stepPauseWaitRequest();

      setInfoText(t('sorting.merge.animation.findingMiddle', { middle: mid + 1 }));
      setPivotIndex(mid);
      await stepPauseWaitRequest();

      setInfoText(t('sorting.merge.animation.dividing', { 
        leftStart: left + 1, 
        leftEnd: mid + 1,
        rightStart: mid + 2,
        rightEnd: right + 1
      }));
      await stepPauseWaitRequest();

      setPivotIndex(null);
      await stepPauseWaitRequest();

      setInfoText(t('sorting.merge.animation.sortingLeft', { start: left + 1, end: mid + 1 }));
      setStart(left);
      setEnd(mid);
      await stepPauseWaitRequest();
      await mergeSort(arr, left, mid);

      setInfoText(t('sorting.merge.animation.sortingRight', { start: mid + 2, end: right + 1 }));
      setStart(mid + 1);
      setEnd(right);
      await stepPauseWaitRequest();
      await mergeSort(arr, mid + 1, right);

      setInfoText(t('sorting.merge.animation.mergingRanges', {
        leftStart: left + 1,
        leftEnd: mid + 1,
        rightStart: mid + 2,
        rightEnd: right + 1
      }));
      setStart(left);
      setEnd(right);
      await stepPauseWaitRequest();
      await merge(arr, left, mid, right);
    }
  }

  async function merge(arr: number[], left: number, mid: number, right: number) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = new Array(n1);
    const R = new Array(n2);
    const newLeftArray = Array(5).fill(0);
    const newRightArray = Array(5).fill(0);
    const mainArray = [...arr];

    setInfoText(t('sorting.merge.animation.preparingArrays'));
    await stepPauseWaitRequest();

    setInfoText(t('sorting.merge.animation.copyingLeft', { start: left + 1, end: mid + 1 }));
    setStart(left);
    setEnd(mid);
    await stepPauseWaitRequest();

    for (let i = 0; i < n1; i++) {
      setSelectedIndex(left + i);
      setLeftSelectedIndex(i);
      setInfoText(t('sorting.merge.animation.copyingElement', {
        index: left + i + 1,
        value: arr[left + i],
        array: 'L',
        targetIndex: i + 1
      }));
      await stepPauseWaitRequest();
      
      L[i] = arr[left + i];
      newLeftArray[i] = L[i];
      
      setInfoText(t('sorting.merge.animation.removingElement', { index: left + i + 1 }));
      mainArray[left + i] = 0;
      
      setLeftArray([...newLeftArray]);
      setBars([...mainArray]);
      await stepPauseWaitRequest();
      setSelectedIndex(null);
      setLeftSelectedIndex(null);
    }

    setInfoText(t('sorting.merge.animation.copyingRight', { start: mid + 2, end: right + 1 }));
    setStart(mid + 1);
    setEnd(right);
    await stepPauseWaitRequest();

    for (let j = 0; j < n2; j++) {
      setSelectedIndex(mid + 1 + j);
      setRightSelectedIndex(j);
      setInfoText(t('sorting.merge.animation.copyingElement', {
        index: mid + 1 + j + 1,
        value: arr[mid + 1 + j],
        array: 'R',
        targetIndex: j + 1
      }));
      await stepPauseWaitRequest();
      
      R[j] = arr[mid + 1 + j];
      newRightArray[j] = R[j];
      
      setInfoText(t('sorting.merge.animation.removingElement', { index: mid + 1 + j + 1 }));
      mainArray[mid + 1 + j] = 0;
      
      setRightArray([...newRightArray]);
      setBars([...mainArray]);
      await stepPauseWaitRequest();
      setSelectedIndex(null);
      setRightSelectedIndex(null);
    }

    setSelectedIndex(null);
    setLeftSelectedIndex(null);
    setRightSelectedIndex(null);
    setPivotIndex(null);
    setComparingIndex(null);

    setInfoText(t('sorting.merge.animation.mergingBack', { start: left + 1, end: right + 1 }));
    setStart(left);
    setEnd(right);
    await stepPauseWaitRequest();

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      setLeftSelectedIndex(i);
      setRightSelectedIndex(j);
      setInfoText(t('sorting.merge.animation.comparing', {
        leftIndex: i + 1,
        leftValue: L[i],
        rightIndex: j + 1,
        rightValue: R[j]
      }));
      await stepPauseWaitRequest();

      if (L[i] <= R[j]) {
        setInfoText(t('sorting.merge.animation.placingLeft', {
          index: i + 1,
          value: L[i],
          position: k + 1
        }));
        mainArray[k] = L[i];
        setSelectedIndex(k);
        setRightSelectedIndex(null);
        await stepPauseWaitRequest();
        
        setBars([...mainArray]);
        setLeftArray(prev => {
          const updatedLeftArray = [...prev];
          updatedLeftArray[i] = 0;
          return updatedLeftArray;
        });
        await stepPauseWaitRequest();
        setSelectedIndex(null);
        setLeftSelectedIndex(null);
        i++;
      } else {
        setInfoText(t('sorting.merge.animation.placingRight', {
          index: j + 1,
          value: R[j],
          position: k + 1
        }));
        mainArray[k] = R[j];
        setSelectedIndex(k);
        setLeftSelectedIndex(null);
        await stepPauseWaitRequest();

        setBars([...mainArray]);
        setRightArray(prev => {
          const updatedRightArray = [...prev];
          updatedRightArray[j] = 0;
          return updatedRightArray;
        });
        await stepPauseWaitRequest();
        setSelectedIndex(null);
        setRightSelectedIndex(null);
        j++;
      }
      k++;
    }

    while (i < n1) {
      setInfoText(t('sorting.merge.animation.placingRemaining', {
        array: 'L',
        index: i + 1,
        value: L[i],
        position: k + 1
      }));
      setSelectedIndex(k);
      setLeftSelectedIndex(i);
      await stepPauseWaitRequest();
      
      mainArray[k] = L[i];
      setBars([...mainArray]);
      setLeftArray(prev => {
        const updatedLeftArray = [...prev];
        updatedLeftArray[i] = 0;
        return updatedLeftArray;
      });
      await stepPauseWaitRequest();
      
      setSelectedIndex(null);
      setLeftSelectedIndex(null);
      i++;
      k++;
    }

    while (j < n2) {
      setInfoText(t('sorting.merge.animation.placingRemaining', {
        array: 'R',
        index: j + 1,
        value: R[j],
        position: k + 1
      }));
      setSelectedIndex(k);
      setRightSelectedIndex(j);
      await stepPauseWaitRequest();
      
      mainArray[k] = R[j];
      setBars([...mainArray]);
      setRightArray(prev => {
        const updatedRightArray = [...prev];
        updatedRightArray[j] = 0;
        return updatedRightArray;
      });
      await stepPauseWaitRequest();
      
      setSelectedIndex(null);
      setRightSelectedIndex(null);
      j++;
      k++;
    }

    setInfoText(t('sorting.merge.animation.clearingArrays'));
    setSelectedIndex(null);
    setComparingIndex(null);
    setPivotIndex(null);
    setLeftSelectedIndex(null);
    setRightSelectedIndex(null);
    setStart(null);
    setEnd(null);
    setLeftArray(Array(5).fill(0));
    setRightArray(Array(5).fill(0));
    await stepPauseWaitRequest();
    
    setInfoText(t('sorting.merge.animation.updatingMainArray'));
    arr.splice(left, right - left + 1, ...mainArray.slice(left, right + 1));
    setBars([...arr]);
    await stepPauseWaitRequest();
  }

  const smoothShuffleBars = async () => {
    setIsShuffeling(true);
    setSelectedIndex(null);
    setComparingIndex(null);
    setPivotIndex(null);
    setLeftSelectedIndex(null);
    setRightSelectedIndex(null);
    setLeftArray(Array(5).fill(0));
    setRightArray(Array(5).fill(0));
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
    setPivotIndex(null);
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
    <AlgorithmSection style={{ height: 625}}>
      <KeyIndexContainer>
        <p>{infoText}</p>
      </KeyIndexContainer>
      <ChartAligner>
        <MainArrayContainer style={{ position: 'relative' , top: 5}}>
          <BarChart 
            bars={bars} 
            selectedIndex={selectedIndex} 
            comparingIndex={comparingIndex} 
            pivotIndex={pivotIndex}
            height={160}
            barsHeight={15}
            doNotShowNumber={false}
            fullLength={bars.length}
          />
          <IndexChart 
            initialArray={initialData} 
            selectedIndex={selectedIndex}
            comparingIndex={comparingIndex}
            pivotIndex={pivotIndex}
            start={start}
            end={end}
            fullLength={bars.length}
            height={20}
          />
        </MainArrayContainer>
        <TempArraysContainer style={{ position: 'relative' , top: 20}}>
          <SingleTempArrayContainer>
            <BarChart 
              bars={leftArray} 
              selectedIndex={leftSelectedIndex} 
              comparingIndex={null} 
              pivotIndex={null}
              height={160}
              barsHeight={15}
              doNotShowNumber={false}
              fullLength={5}
            />
            <IndexChart 
              initialArray={[1,2,3,4,5]} 
              selectedIndex={leftSelectedIndex}
              comparingIndex={null}
              pivotIndex={null}
              start={null}
              end={null}
              height={20}
              fullLength={5}
            />
          </SingleTempArrayContainer>
          <SingleTempArrayContainer>
            <BarChart 
              bars={rightArray} 
              selectedIndex={rightSelectedIndex} 
              comparingIndex={null} 
              pivotIndex={null}
              height={160}
              barsHeight={15}
              doNotShowNumber={false}
              fullLength={5}
            />
            <IndexChart 
              initialArray={[1,2,3,4,5]} 
              selectedIndex={rightSelectedIndex}
              comparingIndex={null}
              pivotIndex={null}
              start={null}
              end={null}
              height={20}
              fullLength={5}
            />
          </SingleTempArrayContainer>
        </TempArraysContainer>
      </ChartAligner>
      <ControlPanel>
        <SliderPanel>
          <Slider
            aria-label={t('sorting.animation.common.speedSlider')}
            defaultValue={1}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            disabled={isManual}
            step={0.1}
            min={0.1}
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

export default MergeSortAnimation;

