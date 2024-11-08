import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { generateRandomArrayOfN } from '../../../utils/number.utils.ts';
import {
  BraceSpan,
  Button,
  ButtonTaskContainer,
  MarkedRedText,
  SingleTaskContainer,
} from '../../../styles/general/generic.style.ts';
import QuickSortEmptySpaceRecursion from './quickSortEmptySpacesRecursion.tsx';
import { partitionStep } from '../../../types/sorting/quick.type.ts';
import {
  ButtonIterationContainer,
  IterationTitle,
  RecursionContainer,
  SingleIterationContainer,
  SortableContainer,
} from '../../../styles/general/iteration.style.ts';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { SortableItem } from '../../general/draggable.component.tsx';
import { UUIDTypes } from 'uuid/dist/cjs/_types';
import { v4 as uuidv4 } from 'uuid';
import ConfettiComponent from '../../general/confetti.component.tsx';
import { wait } from '../../../utils/promise.utils.ts';

export type QuickSortSolvedLevel = {
  uuid: UUIDTypes;
  isSolved: boolean;
};

const QuickSortEmptySpacesTask = () => {
  const initialArrayLength = 10;
  const solvedLevelsArray = useRef<QuickSortSolvedLevel[]>([]);
  const [solvedList, setSolvedList] = useState<QuickSortSolvedLevel[]>([]);

  const quickSort = (array, low, high, steps, isLeftFirst, count) => {
    if (low < high) {
      const partitionResult = partition(array, low, high, steps, isLeftFirst, count);
      const { pivotIndex, leftPartitions, rightPartitions } = partitionResult;

      quickSort(array, low, pivotIndex - 1, leftPartitions, true, count + 1);
      quickSort(array, pivotIndex + 1, high, rightPartitions, false, count + 1);
    }
  };

  const partition = (array, low, high, steps, isLeftFirst, count) => {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (array[j] <= pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    const left = array.slice(low, i + 1);
    const pivotElement = [array[i + 1]];
    const right = array.slice(i + 2, high + 1);

    const partitionStep = {
      left,
      pivot: pivotElement,
      right,
      leftPartitions: [],
      rightPartitions: [],
      isLeftFirst,
      count,
      uuid: uuidv4(),
    };
    steps.push(partitionStep);

    // console.log('adding some solvedLevelsArray at QuickSort');
    // solvedLevelsArray.current = [...solvedLevelsArray.current, { uuid: partitionStep.uuid, isSolved: false }];

    return {
      pivotIndex: i + 1,
      leftPartitions: partitionStep.leftPartitions,
      rightPartitions: partitionStep.rightPartitions,
    };
  };

  const collectUUIDs = (partitions) => {
    const uuids = [];
    const traversePartitions = (steps) => {
      steps.forEach((step) => {
        uuids.push({ uuid: step.uuid, isSolved: false });
        if (step.leftPartitions.length > 0) traversePartitions(step.leftPartitions);
        if (step.rightPartitions.length > 0) traversePartitions(step.rightPartitions);
      });
    };
    traversePartitions(partitions);
    return uuids;
  };

  const handleNewSteps = (initialData) => {
    const steps = [];
    quickSort([...initialData], 0, initialData.length - 1, steps, true, 0);

    if (solvedLevelsArray.current && solvedList.length <= 0) {
      solvedLevelsArray.current = collectUUIDs(steps);
      setSolvedList(collectUUIDs(steps));
    }

    return steps;
  };

  const [initialData, setInitialData] = useState(generateRandomArrayOfN(initialArrayLength));
  const [partitionSteps, setPartitionSteps] = useState<partitionStep[]>(handleNewSteps(initialData));
  const [activeId, setActiveId] = useState<number | null>(null);
  const [workingArray, setWorkingArray] = useState<number[]>([...initialData]);
  const [isShowingPivots, setIsShowingPivots] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isProvideHelp, setIsProvideHelp] = useState<boolean>(true);
  const [triggerRerender, setTriggerRerender] = useState<number>(Math.floor(Math.random() * 99) + 1);
  const [isRunningConfetti, setIsRunningConfetti] = useState<boolean>(false);
  const [isRecycling, setIsRecycling] = useState<boolean>(false);

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id;

    if (typeof activeId === 'number') {
      setActiveId(activeId);
    } else {
      console.error('Active ID is not a number:', activeId);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (typeof active.id === 'number' && typeof over?.id === 'number') {
      setWorkingArray((items) => {
        let oldIndex;
        let newIndex;
        if (typeof active.id === 'number') {
          oldIndex = items.indexOf(active.id);
        }
        if (typeof over.id === 'number') {
          newIndex = items.indexOf(over.id);
        }
        return arrayMove(items, oldIndex, newIndex);
      });
    } else {
      console.error('IDs are not numbers:', active.id, over?.id);
    }

    setActiveId(null);
  };

  const handleWorkingArrayReset = () => {
    setWorkingArray([...initialData]);
  };

  //TODO: maybe record if the user decided to get some help
  const toggleShowPivot = () => setIsShowingPivots(!isShowingPivots);

  // const handleNewArray = async () => {
  //   const emptySolvedLevels = [];
  //   solvedLevelsArray.current = emptySolvedLevels;
  //   const emptyTrigger = 0;
  //   await setTriggerRerender(emptyTrigger);
  //   const emptySolved = [];
  //   await setSolvedList(emptySolved);
  //   const emptyPart = [];
  //   await setPartitionSteps(emptyPart);
  //   const emptyWork = [];
  //   await setWorkingArray(emptyWork);
  //   const isntSolved = false;
  //   setIsSolved(isntSolved);
  //
  //   await wait(1);
  //
  //   const initialData = generateRandomArrayOfN(initialArrayLength);
  //   await setInitialData(initialData);
  //
  //   const newSteps = handleNewSteps([...initialData]);
  //   await setPartitionSteps(newSteps);
  //
  //   await setWorkingArray(initialData);
  //   const num = Math.floor(Math.random() * 99) + 1;
  //   await setTriggerRerender(num);
  // };

  const checkStructure = () => {
    if (solvedList.every((level) => level.isSolved) && !isSolved) {
      setIsSolved(true);
      handleConfetti();
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    checkStructure();
  }, [solvedList, setSolvedList, solvedLevelsArray.current]);

  const handleSubmit = () => {};

  const handleConfetti = async () => {
    setIsRecycling(true);
    setIsRunningConfetti(true);
    await wait(3000);
    setIsRecycling(false);
  };

  return (
    <SingleTaskContainer>
      <ConfettiComponent run={isRunningConfetti} recycle={isRecycling} />
      <h2>Task 2 Quicksort Insights</h2>
      <p>
        Follow the template to describe the Quicksort process. The expected values are the partition results in each{' '}
        <MarkedRedText>QuickSort</MarkedRedText> function call.
      </p>
      <SingleIterationContainer style={{ margin: '30px 0' }}>
        <IterationTitle>Input Array:</IterationTitle>
        <SortableContainer>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <BraceSpan>[</BraceSpan>
            <SortableContext items={workingArray} strategy={horizontalListSortingStrategy}>
              <div style={{ display: 'flex', gap: '5px', margin: '20px 0', justifyContent: 'center' }}>
                {workingArray.map((item) => (
                  <SortableItem isDisabled={!isProvideHelp} key={item} id={item} />
                ))}
              </div>
            </SortableContext>
            <BraceSpan>]</BraceSpan>
          </DndContext>
        </SortableContainer>
        <ButtonIterationContainer>
          <Button onClick={handleWorkingArrayReset} disabled={!isProvideHelp}>
            Reset
          </Button>
        </ButtonIterationContainer>
      </SingleIterationContainer>
      <RecursionContainer>
        {triggerRerender && (
          <QuickSortEmptySpaceRecursion
            setSolvedList={setSolvedList}
            solvedList={solvedList}
            partitions={partitionSteps}
            showPivots={isShowingPivots}
            solvedLevelsArray={solvedLevelsArray}
          />
        )}
      </RecursionContainer>
      <ButtonTaskContainer>
        <Button onClick={toggleShowPivot} disabled={isSolved}>
          Help: Pivots
        </Button>
        <Button onClick={handleSubmit} disabled={!isSolved}>
          Submit
        </Button>
      </ButtonTaskContainer>
    </SingleTaskContainer>
  );
};

export default QuickSortEmptySpacesTask;
