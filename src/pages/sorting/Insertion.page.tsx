import { GenericMainContainer } from '../../styles/generic.style.ts';
import * as React from 'react';
import { useEffect, useState } from 'react';
import BarChart from '../../components/barChart.component.tsx';
import { swapInArray } from '../../utils/shuffle.utils.ts';
import { Button, SpeedControl } from '../../styles/insertion.style.ts';
import IndexChart from '../../components/indexChart.component.tsx';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const InsertionPage = () => {
  const [bars, setBars] = useState<number[]>(initialData);
  const [positions, setPositions] = useState<number[]>([]);
  const [speed, setSpeed] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [comparingIndex, setComparingIndex] = useState<number | null>(null);
  const [key, setKey] = useState<number | null>(null);
  const [keyIndex, setKeyIndex] = useState<number | null>(null);

  useEffect(() => {
    setPositions(bars.map((_, index) => index));
  }, [bars]);

  const animateSwap = (i: number, j: number) => {
    const newPositions = [...positions];
    [newPositions[i], newPositions[j]] = [newPositions[j], newPositions[i]];
    setPositions(newPositions);
  };

  const smoothShuffleBars = async () => {
    const delay = 100;

    setIsRunning(true);
    const shuffledBars = [...bars];

    for (let i = shuffledBars.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      swapInArray(shuffledBars, i, randomIndex);
      animateSwap(i, randomIndex);
      setBars([...shuffledBars]);

      await new Promise((resolve) => setTimeout(resolve, delay / speed));
    }

    setSelectedIndex(null);
    setComparingIndex(null);
    setIsRunning(false);
  };

  const performInsertionSort = async () => {
    setIsRunning(true);
    const sortedBars = [...bars];
    const newPositions = [...positions];

    const delay = 2000;

    for (let j = 1; j < sortedBars.length; j++) {
      const key = sortedBars[j];
      await setKey(key);
      await setSelectedIndex(j);
      await setKeyIndex(j);
      await new Promise((resolve) => setTimeout(resolve, delay / speed));

      let i = j - 1;

      await setComparingIndex(i);
      await new Promise((resolve) => setTimeout(resolve, delay / speed));

      while (i >= 0) {
        if (sortedBars[i] < key) {
          break;
        }
        await setSelectedIndex(i + 1);
        await setComparingIndex(i);
        await new Promise((resolve) => setTimeout(resolve, delay / speed));

        sortedBars[i + 1] = sortedBars[i];
        newPositions[i + 1] = newPositions[i];

        await setBars([...sortedBars]);
        await setPositions([...newPositions]);

        await new Promise((resolve) => setTimeout(resolve, delay / speed));
        i--;
      }

      sortedBars[i + 1] = key;
      newPositions[i + 1] = key;

      await setBars([...sortedBars]);
      await setPositions([...newPositions]);
      await new Promise((resolve) => setTimeout(resolve, delay / speed));
      await setComparingIndex(null);
    }

    setKey(null);
    setSelectedIndex(null);
    setComparingIndex(null);
    setIsRunning(false);
  };

  return (
    <GenericMainContainer>
      <h1>Insertion Sort</h1>
      <p>current key: {key ? `${key}` : 'none'} </p>
      <br />
      <br />

      <BarChart bars={bars} positions={positions} selectedIndex={selectedIndex} comparingIndex={comparingIndex} />
      <IndexChart initialArray={initialData} positions={positions} selectedIndex={comparingIndex} />
      <SpeedControl>
        <Button onClick={smoothShuffleBars} disabled={isRunning}>
          Shuffle
        </Button>
        <Button onClick={performInsertionSort} disabled={isRunning}>
          Sort
        </Button>
      </SpeedControl>
      <br />
      <br />
    </GenericMainContainer>
  );
};

export default InsertionPage;
