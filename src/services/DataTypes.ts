import { Program } from './program/Program';

export enum DataType {
  PROGRAM = 'PROGRAM'
}

export type DataPayloadType = { dataType: DataType.PROGRAM; data: Program[] };
