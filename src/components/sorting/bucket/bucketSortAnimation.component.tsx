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
import { BarChartDivider } from '../../../styles/sorting/countingSort.style.ts';
import {
  AllBucketsFrame,
  BucketNumber,
  BucketsContainer,
  LittleBucket,
} from '../../../styles/sorting/bucketSort.style.ts';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const initialBuckets = [
  { from: 1, to: 2, items: [] },
  { from: 3, to: 4, items: [] },
  {
    from: 5,
    to: 6,
    items: [],
  },
  { from: 7, to: 8, items: [] },
  { from: 9, to: 10, items: [] },
];

export type Bucket = {
  from: number;
  to: number;
  items: number[];
};

const BucketSortAnimation = () => {
  const delay = 1000;

  const [bars, setBars] = useState<number[]>(initialData);
  const [isManual, setIsManual] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isShuffelling, setIsShuffeling] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedBucketIndex, setSelectedBucketIndex] = useState<number | null>(null);
  const [barsComparingIndex, setBarsComparingIndex] = useState<number | null>(null);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [infoText, setInfoText] = useState<string>('shuffle, then sort! :)');
  const [isStart, setIsStart] = useState<number | null>(null);
  const [isEnd, setIsEnd] = useState<number | null>(null);
  const [buckets, setBuckets] = useState<Bucket[]>(initialBuckets);

  const exitRequestRef = useRef<boolean>(false);
  const pauseRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  const performBucketSort = async () => {
    setIsSorting(true);
    setIsSorted(false);

    await wait(1000);

    await bucketSort(initialBuckets);

    setIsSorted(true);
    setIsSorting(false);
    exitRequestRef.current = false;
    pauseRequestRef.current = false;
    setIsManual(false);
    setIsAnimated(false);
    setIsPaused(false);
    setPivotIndex(null);
    setSelectedBucketIndex(null);
    setBarsComparingIndex(null);
    setIsStart(null);
    setIsEnd(null);
    setInfoText('Sorting complete!');
  };

  const smoothShuffleBars = async () => {
    setIsShuffeling(true);
    setSelectedBucketIndex(null);
    setBarsComparingIndex(null);
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

  async function bucketSort(initalBuckets) {
    const bucketSize = 2;

    if (initialData.length === 0) {
      return;
    }

    const minValue = Math.min(...initialData);

    const tempBuckets = [...initalBuckets];
    const tempBars = [...bars];

    setInfoText('Step 1: filling the buckets');

    await stepPauseWaitRequest();

    for (let i = 0; i < bars.length; i++) {
      const bucketIndex = Math.floor((tempBars[i] - minValue) / bucketSize);

      setInfoText(`Selecting A[${i + 1}]=${bars[i]}`);
      setBarsComparingIndex(i);

      await stepPauseWaitRequest();

      setInfoText(
        `A[${i + 1}]=${bars[i]} fits in bucket Nr. ${i + 1} (${tempBuckets[bucketIndex].from}-${tempBuckets[bucketIndex].to})`
      );
      setSelectedBucketIndex(bucketIndex);
      await stepPauseWaitRequest();

      setInfoText(`Moving it into bucket...`);
      if (!tempBuckets[bucketIndex].items.includes(tempBars[i])) {
        tempBuckets[bucketIndex].items.push(tempBars[i]);
      }
      setBuckets([...tempBuckets]);

      tempBars[i] = 0;
      setBars([...tempBars]);
      await stepPauseWaitRequest();
      setSelectedBucketIndex(null);
    }

    setInfoText('Step 2: sorting buckets');
    setBarsComparingIndex(null);
    setSelectedBucketIndex(null);

    await stepPauseWaitRequest();

    for (let i = 0; i < tempBuckets.length; i++) {
      setInfoText(`Selecting bucket Nr. ${i + 1} (${tempBuckets[i].from}-${tempBuckets[i].to})`);
      setSelectedBucketIndex(i);
      await stepPauseWaitRequest();

      setInfoText('Bucket sorted using insertion sort!');
      tempBuckets[i].items = tempBuckets[i].items.sort((a, b) => a - b);
      setBuckets([...tempBuckets]);
      await stepPauseWaitRequest();
    }

    setInfoText('Step 3: concatenating arrays, step by step');
    setSelectedBucketIndex(null);

    await stepPauseWaitRequest();

    let concatArray = [];

    for (let i = 0; i < tempBuckets.length; i++) {
      const max = Math.max(...tempBuckets[i].items);
      const min = Math.min(...tempBuckets[i].items);

      setSelectedBucketIndex(i);
      setIsStart(min - 1);
      setIsEnd(max - 1);

      setInfoText(`Selecting bucket Nr. ${i + 1} (${min}-${max})`);
      await stepPauseWaitRequest();

      setInfoText(`Concatenating existing array with current bucket`);
      concatArray = concatArray.concat(tempBuckets[i].items);
      const updateArray = concatArray.concat(Array(initialData.length - concatArray.length).fill(0));

      setBars([...updateArray]);
      tempBuckets[i].items = [];
      await stepPauseWaitRequest();
    }

    setSelectedBucketIndex(null);
    setIsStart(null);
    setIsEnd(null);
  }

  const performPause = async () => {
    if (pauseRequestRef.current || !stepRequestRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 10));
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
      exitRequestRef.current = false;
      pauseRequestRef.current = false;
      await performBucketSort();
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
    await performBucketSort();
  };

  const startAnimated = async () => {
    setIsAnimated(true);

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
      await wait(1000);

      await performBucketSort();
    }
  };

  const makeAStep = async () => {
    pauseRequestRef.current = false;
    stepRequestRef.current = true;
    await wait(10);
    stepRequestRef.current = false;
  };

  const pauseSorting = async () => {
    setIsManual(true);
    setIsAnimated(false);
    setIsPaused(true);
    pauseRequestRef.current = true;
    stepRequestRef.current = false;
  };

  const continueSorting = async () => {
    setIsShuffeling(false);
    setIsAnimated(true);
    setIsManual(false);
    setIsSorting(true);
    pauseRequestRef.current = false;
    stepRequestRef.current = true;
    setIsPaused(false);
  };

  return (
    <AlgorithmSection style={{ height: 550 }}>
      <KeyIndexContainer>
        <p>{infoText}</p>
      </KeyIndexContainer>
      <ChartAligner>
        <div>
          <BarChart height={140} barsHeight={10} bars={bars} comparingIndex={barsComparingIndex} />
          <IndexChart initialArray={initialData} comparingIndex={barsComparingIndex} start={isStart} end={isEnd} />
        </div>
        <BarChartDivider />
        <AllBucketsFrame>
          {buckets.map((bucket, bucketIndex) => {
            return (
              <BucketsContainer style={{ backgroundColor: selectedBucketIndex == bucketIndex && 'palevioletred' }}>
                <BucketNumber
                  style={{
                    color: selectedBucketIndex == bucketIndex && 'white',
                    fontWeight: selectedBucketIndex == bucketIndex && 'bold',
                  }}
                >
                  {bucket.from}-{bucket.to}
                </BucketNumber>
                {bucket.items &&
                  bucket.items.map((item, itemIndex) => {
                    return <LittleBucket>{item}</LittleBucket>;
                  })}
                <LittleBucket>/</LittleBucket>
              </BucketsContainer>
            );
          })}
        </AllBucketsFrame>
      </ChartAligner>
      <ControlPanel>
        <SliderPanel>
          <Slider
            aria-label="Speed"
            defaultValue={1}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            disabled={isManual}
            step={0.25}
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

export default BucketSortAnimation;
