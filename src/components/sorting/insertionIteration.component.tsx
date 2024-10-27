import {
  IterationTitle,
  MarkedRedText,
  SingleIterationContainer,
  SortableContainer,
} from '../../styles/insertion.style.ts';
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
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../../styles/generic.style.ts';

const InsertionIterationComponent = ({ expectedArray, taskArray, setTaskArray, iterations: nrOfIteration }) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [workingArray, setWorkingArray] = useState<number[]>(taskArray);
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);
  const [isTrueAnswer, setIsTrueAnswer] = useState<boolean>(false);

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor));

  useEffect(() => {
    // Sync workingArray with taskArray from parent when taskArray changes
    setWorkingArray(taskArray);
  }, [taskArray]);

  const handleReset = () => {
    console.log(taskArray);
    setWorkingArray(taskArray);
  };

  const handleCheck = async () => {
    if (JSON.stringify(expectedArray) === JSON.stringify(workingArray)) {
      setIsWrongAnswer(false);
      setIsTrueAnswer(true);
      setTaskArray([...workingArray]); // Update taskArray in parent
    } else {
      setIsWrongAnswer(true);
      await wait();
      setIsWrongAnswer(false);
    }
  };

  const wait = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
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
          <span
            style={{
              fontWeight: 'lighter',
              fontSize: '60px',
              position: 'relative',
              bottom: '3px',
              paddingLeft: '2px',
              color: 'white',
            }}
          >
            [
          </span>
          <SortableContext items={workingArray} strategy={horizontalListSortingStrategy}>
            <div style={{ display: 'flex', gap: '5px', margin: '20px 0', justifyContent: 'center' }}>
              {workingArray.map((item) => (
                <SortableItem key={item} id={item} isDisabled={isTrueAnswer || isWrongAnswer} />
              ))}
            </div>
          </SortableContext>
          <span
            style={{
              fontWeight: 'lighter',
              fontSize: '60px',
              position: 'relative',
              bottom: '3px',
              paddingRight: '2px',
              color: 'white',
            }}
          >
            ]
          </span>
        </DndContext>
      </SortableContainer>
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', columnGap: 5 }}>
        <Button onClick={handleReset} style={{ minWidth: 55, width: 55 }} disabled={isTrueAnswer || isWrongAnswer}>
          Reset
        </Button>
        <Button
          style={{
            minWidth: 55,
            width: 55,
            animation: isWrongAnswer ? 'shake 0.15s 2' : 'none',
            background: isWrongAnswer ? 'indianred' : isTrueAnswer ? '#39576f' : '',
          }}
          onClick={handleCheck}
          disabled={isWrongAnswer || isTrueAnswer}
        >
          Check
        </Button>
      </div>
    </SingleIterationContainer>
  );
};

const SortableItem = ({ id: id, isDisabled: isDisabled }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    resizeObserverConfig: undefined,
    disabled: isDisabled,
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        padding: '10px',
        border: isDragging || isDisabled ? '1px solid #000' : '1px solid #ddd',
        backgroundColor: isDragging || isDisabled ? 'lightgray' : 'whitesmoke',
        display: 'inline-block',
        textAlign: 'center',
        borderRadius: '5px',
        width: '40px',
        height: '40px',
        boxSizing: 'border-box',
      }}
      {...attributes}
      {...listeners}
    >
      {id}
    </div>
  );
};

export default InsertionIterationComponent;
