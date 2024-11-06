import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as React from 'react';

export const SortableItem = ({ id: id, isDisabled: isDisabled }) => {
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
        userSelect: 'none',
      }}
      {...attributes}
      {...listeners}
    >
      {id}
    </div>
  );
};
