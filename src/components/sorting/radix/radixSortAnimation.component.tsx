import { Slider } from '@mui/material';
import * as React from 'react';
import { useRef, useState } from 'react';
import { AlgorithmSection, Button } from '../../../styles/general/generic.style.ts';
import { wait } from '../../../utils/promise.utils.ts';
import {
  ButtonPanel,
  ControlPanel,
  KeyIndexContainer,
  SliderPanel,
} from '../../../styles/sorting/insertionSort.style.ts';
import { DiagrammsContainer } from '../../../styles/sorting/radixSort.style.ts';
import RadixSortDiagram from './radixSortDiagram.component.tsx';
import { generateRandomArrayOfNFromTo } from '../../../utils/number.utils.ts';
import { swapInArray } from '../../../utils/array.utils.ts';

const RadixSortAnimation = () => {
  const delay = 1000;

  const [initialData] = useState<number[]>(generateRandomArrayOfNFromTo(10, 1, 9999).sort((a, b) => a - b));
  const [initialEmptyData] = useState<number[]>(Array(initialData.length).fill(null));
  const [mainRadixArray, setMainRadixArray] = useState<number[]>(initialData);
  const [secondaryRadixArray, setSecondaryRadixArray] = useState<number[]>(initialEmptyData);
  const [isManual, setIsManual] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isShuffling, setIsShuffeling] = useState<boolean>(false);
  const [isColorFaderOn, setIsColorFaderOn] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [infoText, setInfoText] = useState<string>('shuffle, then sort! :)');
  const [selectedColumn, setSelectedColumn] = useState<number>(null);
  const [selectedSecondaryRadixArrayRow, setSelectedSecondaryRadixArrayRow] = useState<number>(null);
  const [selectedMainRadixArrayRow, setSelectedMainRadixArrayRow] = useState<number>(null);

  const exitRequestRef = useRef<boolean>(false);
  const pauseRequestRef = useRef<boolean>(false);
  const shuffelingRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  const performShuffle = async () => {
    setInfoText('Shuffling!');
    setIsColorFaderOn(true);
    setIsShuffeling(true);

    await wait(500);

    const shuffleArray = [...mainRadixArray];
    setIsColorFaderOn(false);
    await wait(200);

    for (let r = 0; r < 5; r++) {
      for (let i = shuffleArray.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        swapInArray(shuffleArray, i, randomIndex);
        setMainRadixArray([...shuffleArray]);
        await wait(15);
      }
    }
    await wait(500);

    setIsColorFaderOn(true);
    setIsShuffeling(false);
    setIsSorted(false);
    await wait(300);

    setIsColorFaderOn(false);
    setInfoText('Shuffling finished. Start sorting!');
  };

  const radixSort = async () => {
    let unsortedArray = [...mainRadixArray];
    let secondaryArray = [...secondaryRadixArray];

    for (let digitIndex = 3; digitIndex >= 0; digitIndex--) {
      setInfoText(`Selecting digit Nr. ${digitIndex + 1}`);
      setSelectedColumn(digitIndex);

      await stepPauseWaitRequest();

      const newIndex = [];

      const digitInfo = unsortedArray.map((num, idx) => {
        const digit = num.toString().split('');
        const stringDigit = Array(4 - digit.length).fill('0');
        const concatStringDigit = stringDigit.concat(digit);

        const lastDigit = Number(concatStringDigit[digitIndex]);

        return { num, lastDigit, originalIndex: idx };
      });

      digitInfo.sort((a, b) => a.lastDigit - b.lastDigit);

      const digits = digitInfo.map((item) => item.lastDigit);

      setInfoText(`Sorting([${digits}])`);

      digitInfo.forEach((item, newIdx) => {
        newIndex[item.originalIndex] = newIdx;
      });

      for (let i = unsortedArray.length - 1; i >= 0; i--) {
        setSelectedMainRadixArrayRow(i);
        setSelectedSecondaryRadixArrayRow(newIndex[i]);

        await stepPauseWaitRequest();

        secondaryArray[newIndex[i]] = unsortedArray[i];
        unsortedArray[i] = null;

        setMainRadixArray([...unsortedArray]);
        setSecondaryRadixArray([...secondaryArray]);

        await stepPauseWaitRequest();
        setSelectedMainRadixArrayRow(null);
        setSelectedSecondaryRadixArrayRow(null);
      }

      await stepPauseWaitRequest();

      setInfoText(`Finished sorting based on digit Nr.${digitIndex + 1}`);
      setMainRadixArray([...secondaryArray]);
      setSecondaryRadixArray([...unsortedArray]);
      await stepPauseWaitRequest();

      const swapper = [...secondaryArray];
      secondaryArray = [...unsortedArray];
      unsortedArray = [...swapper];
      setSelectedColumn(null);
    }

    setSelectedColumn(null);
  };

  const performRadixSort = async () => {
    setIsSorting(true);
    setIsSorted(false);
    await stepPauseWaitRequest();

    await radixSort();

    setIsManual(false);
    setIsAnimated(false);
    setIsSorting(false);
    exitRequestRef.current = false;
    pauseRequestRef.current = false;
    setIsPaused(false);
    setInfoText('Sorting complete!');
  };

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

  const performMakeChoice = async () => {
    setIsSorting(true);

    if (!isManual && isAnimated) {
      exitRequestRef.current = false;
      pauseRequestRef.current = false;
      await performRadixSort();
    }
  };

  const handleSliderChange = (event: Event, value: number) => {
    speedRequestRef.current = value;
  };

  const performStartManual = async () => {
    setIsShuffeling(false);
    setIsManual(true);
    setIsAnimated(false);
    stepRequestRef.current = false;
    pauseRequestRef.current = false;
    speedRequestRef.current = 5;
    await performRadixSort();
  };

  const performStartAnimating = async () => {
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
      await performRadixSort();
    }
  };

  const performMakeAStep = async () => {
    pauseRequestRef.current = false;
    stepRequestRef.current = true;
    await wait(10);
    stepRequestRef.current = false;
  };

  const performPauseSorting = async () => {
    setIsPaused(true);
    pauseRequestRef.current = true;
    stepRequestRef.current = false;
  };

  const performContinueSorting = async () => {
    setIsShuffeling(false);
    setIsAnimated(true);
    setIsSorting(true);
    pauseRequestRef.current = false;
    stepRequestRef.current = true;
    setIsPaused(false);
  };

  return (
    <AlgorithmSection style={{ height: 600 }}>
      <KeyIndexContainer>
        <p>{infoText}</p>
      </KeyIndexContainer>
      <DiagrammsContainer>
        <RadixSortDiagram
          radixData={mainRadixArray}
          isShuffling={isShuffling}
          isColorFaderOn={isColorFaderOn}
          selectedColumn={selectedColumn}
          selectedRow={selectedMainRadixArrayRow}
        />
        <RadixSortDiagram
          radixData={secondaryRadixArray}
          selectedColumn={selectedColumn}
          selectedRow={selectedSecondaryRadixArrayRow}
        />
      </DiagrammsContainer>
      <ControlPanel>
        <SliderPanel>
          <Slider
            aria-label="Temperature"
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
          <Button onClick={performShuffle} disabled={isShuffling || isSorting}>
            Shuffle
          </Button>
          <Button onClick={performMakeChoice} disabled={isShuffling || isSorted || isSorting}>
            Sort
          </Button>

          {isManual || isPaused ? (
            <Button
              onClick={performMakeAStep}
              disabled={isShuffling || isSorted || !isSorting || (isAnimated && !isPaused)}
            >
              Step
            </Button>
          ) : (
            <Button
              onClick={performStartManual}
              disabled={isManual || isShuffling || isSorted || !isSorting || isAnimated}
            >
              Manual
            </Button>
          )}
          {isAnimated ? (
            isPaused ? (
              <Button onClick={performContinueSorting} disabled={isShuffling || isSorted || !isSorting}>
                Continue
              </Button>
            ) : (
              <Button onClick={performPauseSorting} disabled={isShuffling || isSorted || !isSorting}>
                Pause
              </Button>
            )
          ) : (
            <Button onClick={performStartAnimating} disabled={isSorted || !isSorting || isAnimated}>
              Animate
            </Button>
          )}
        </ButtonPanel>
      </ControlPanel>
    </AlgorithmSection>
  );
};

export default RadixSortAnimation;
