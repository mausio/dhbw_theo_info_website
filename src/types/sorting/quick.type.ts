import { UUIDTypes } from 'uuid';

export enum pos {
  left,
  right,
  pivot,
  null,
}

export type partitionStep = {
  uuid?: UUIDTypes;
  count?: number;
  isLeft?: boolean;
  left?: number[];
  leftPartitions?: partitionStep;
  pivot?: number[];
  right?: number[];
  rightPartitions?: partitionStep;
};

export type QuickSortTask = {
  id: UUIDTypes;
  task: string;
  taskId: string;
  points: number;
  collectedPoints: number;
};
