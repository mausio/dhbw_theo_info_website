import { GenericMainContainer } from '../../styles/generic.style.ts';
import * as React from 'react';
import { useEffect, useState } from 'react';
import BarChart from '../../components/graphs.component.tsx';
import { swapInArray } from '../../utils/shuffle.utils.ts';
import { Button, SpeedControl } from '../../styles/insertion.style.ts';

const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const InsertionPage = () => {
  const [bars, setBars] = useState<number[]>(initialData);
  const [positions, setPositions] = useState<number[]>([]);
  const [speed, setSpeed] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [comparingIndex, setComparingIndex] = useState<number | null>(null);
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

    const delay = 3000;

    for (let j = 1; j < sortedBars.length; j++) {
      const key = sortedBars[j];
      setKeyIndex(j);

      let i = j - 1;

      setSelectedIndex(j);
      setComparingIndex(i);

      await new Promise((resolve) => setTimeout(resolve, delay / speed));

      while (i >= 0) {
        if (sortedBars[i] < key) {
          break;
        }
        setComparingIndex(i);

        newPositions[i + 1] = newPositions[i];
        setPositions([...newPositions]);

        sortedBars[i + 1] = sortedBars[i];
        setBars([...sortedBars]);

        await new Promise((resolve) => setTimeout(resolve, delay / speed));

        i--;
      }

      sortedBars[i + 1] = key;
      setBars([...sortedBars]);

      newPositions[i + 1] = positions[j];
      setPositions([...newPositions]);

      await new Promise((resolve) => setTimeout(resolve, delay / speed));
    }

    setSelectedIndex(null);
    setComparingIndex(null);
    setIsRunning(false);
  };

  return (
    <GenericMainContainer>
      <h1>Insertion Sort</h1>
      <p>current key element: {keyIndex ? `${bars[keyIndex]}` : 'none'} </p>
      <p>current element in selection: {selectedIndex ? `${bars[selectedIndex]}` : 'none'} </p>
      <p>current element for comparison: {comparingIndex ? `${bars[comparingIndex]}` : 'none'} </p>
      <br />
      <br />

      <BarChart bars={bars} positions={positions} selectedIndex={selectedIndex} comparingIndex={comparingIndex} />
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
