import * as React from 'react';

export const printArray = (array: number[] | string[]) => {
  return array.map((item, index) => (
    <span key={index}>
      {item}
      {index < array.length - 1 ? ', ' : ''}
    </span>
  ));
};
