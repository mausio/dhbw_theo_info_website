import {
  ButtonIterationContainer,
  IterationTitle,
  SingleIterationContainer,
  SortableArrayContainer,
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
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BraceSpan, Button, MarkedRedText } from '../../../styles/general/generic.style.ts';
import { SortableItem } from '../../general/draggable.component.tsx';
import { wait } from '../../../utils/promise.utils.ts';

interface InsertionIterationProps {
  expectedArray: number[];
  taskArray: number[];
  setTaskArray: (array: number[]) => void;
  iterations: number;
  showPivot?: boolean;
}

const InsertionIterationComponent: React.FC<InsertionIterationProps> = ({ 
  expectedArray, 
  taskArray, 
  setTaskArray, 
  iterations: nrOfIteration,
  showPivot = false 
}) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [workingArray, setWorkingArray] = useState<number[]>(taskArray);
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);
  const [isTrueAnswer, setIsTrueAnswer] = useState<boolean>(false);

  // Get the pivot value for the current iteration
  const pivotValue = taskArray[nrOfIteration];

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor));

  useEffect(() => {
    setWorkingArray(taskArray);
  }, [taskArray]);

  const handleReset = () => {
    (expectedArray);
    setWorkingArray(taskArray);
  };

  const handleCheck = async () => {
    if (JSON.stringify(expectedArray) === JSON.stringify(workingArray)) {
      setIsWrongAnswer(false);
      setIsTrueAnswer(true);
      setTaskArray([...workingArray]);
    } else {
      setIsWrongAnswer(true);
      await wait(500);
      setIsWrongAnswer(false);
    }
  };

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

  console.log(expectedArray)

  return (
    <SingleIterationContainer>
      <IterationTitle>
        After Iteration Nr <MarkedRedText>{nrOfIteration}</MarkedRedText>
      </IterationTitle>
      <SortableContainer>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <BraceSpan>[</BraceSpan>
          <SortableContext items={workingArray} strategy={horizontalListSortingStrategy}>
            <SortableArrayContainer>
              {workingArray.map((item) => (
                <SortableItem 
                  key={item} 
                  id={item} 
                  isDisabled={isTrueAnswer || isWrongAnswer}
                  isPivot={showPivot && item === pivotValue} 
                />
              ))}
            </SortableArrayContainer>
          </SortableContext>
          <BraceSpan>]</BraceSpan>
        </DndContext>
      </SortableContainer>
      <ButtonIterationContainer>
        <Button onClick={handleReset} style={{ minWidth: 55, width: 55 }} disabled={isTrueAnswer || isWrongAnswer}>
          Reset
        </Button>
        <Button
          style={{
            minWidth: 55,
            width: 55,
            animation: isWrongAnswer ? 'shake 0.15s 2' : 'none',
            background: isWrongAnswer ? 'indianred' : isTrueAnswer ? 'rgba(45, 255, 196, 0.5)' : '',
          }}
          onClick={handleCheck}
          disabled={isWrongAnswer || isTrueAnswer}
        >
          Check
        </Button>
      </ButtonIterationContainer>
    </SingleIterationContainer>
  );
};

export default InsertionIterationComponent;
