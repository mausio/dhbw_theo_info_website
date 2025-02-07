import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as React from 'react';

export const SortableItem = ({ id: id, isDisabled: isDisabled, width: width, height: height }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    resizeObserverConfig: undefined,
    disabled: isDisabled,
    id,
  });

  return (
    <p
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        border: isDragging || isDisabled ? '1px solid #000' : '1px solid #ddd',
        backgroundColor: isDragging || isDisabled ? 'lightgray' : 'whitesmoke',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
        width: width ? width : '40px',
        height: height ? height : '40px',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
      {...attributes}
      {...listeners}
    >
      {id}
    </p>
  );
};
