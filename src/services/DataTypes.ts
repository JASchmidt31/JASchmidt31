import { Day } from './day/Day';
import { Execution } from './execution/Execution';
import { Program } from './program/Program';

export enum DataType {
  PROGRAM = 'PROGRAM',
  DAY = 'DAY',
  EXECUTION = 'EXECUTION'
}

export type DataPayloadType =
  | { dataType: DataType.PROGRAM; data: Program[] }
  | { dataType: DataType.DAY; data: Day[] }
  | { dataType: DataType.EXECUTION; data: Execution[] };
