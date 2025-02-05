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

const RadixWordsIterationComponent = ({ expectedArray, taskArray, setTaskArray, iterations: nrOfIteration }) => {
  const [activeId, setActiveId] = useState<string>(null);
  const [workingArray, setWorkingArray] = useState<string[]>(taskArray);
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);
  const [isTrueAnswer, setIsTrueAnswer] = useState<boolean>(false);

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
    setActiveId(`${event.active.id}`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id && over?.id) {
      setWorkingArray((items) => {
        let oldIndex;
        let newIndex;
        if (typeof active.id === 'string') {
          oldIndex = items.indexOf(active.id);
        }
        if (typeof over.id === 'string') {
          newIndex = items.indexOf(over.id);
        }
        return arrayMove(items, oldIndex, newIndex);
      });
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
          <BraceSpan>[</BraceSpan>
          <SortableContext items={workingArray} strategy={horizontalListSortingStrategy}>
            <SortableArrayContainer>
              {workingArray.map((item) => (
                <SortableItem width={'55px'} key={item} id={item} isDisabled={isTrueAnswer || isWrongAnswer} />
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

export default RadixWordsIterationComponent;
