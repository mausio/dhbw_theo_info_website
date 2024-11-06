import { UUIDTypes } from 'uuid/dist/cjs/_types';

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
