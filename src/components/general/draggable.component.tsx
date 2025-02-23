import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as React from 'react';
import { styled } from 'styled-components';

const ItemTag = styled.p`

@media(max-width: 480px){
  width: 30px !important;
  height: 30px !important;
}
`;

interface SortableItemProps {
  id: number | string;
  isDisabled: boolean;
  width?: string;
  height?: string;
  isPivot?: boolean;
}

export const SortableItem: React.FC<SortableItemProps> = ({ 
  id, 
  isDisabled, 
  width, 
  height,
  isPivot = false 
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    resizeObserverConfig: undefined,
    disabled: isDisabled,
    id,
  });

  return (
    <ItemTag
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        border: isDragging || isDisabled ? '1px solid #000' : '1px solid #ddd',
        backgroundColor: isDragging || isDisabled ? 'lightgray' : 'whitesmoke',
        color: isPivot ? '#ff0000' : 'inherit',
        fontWeight: isPivot ? 'bold' : 'normal',
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
    </ItemTag>
  );
};
