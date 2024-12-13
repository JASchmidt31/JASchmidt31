import { Program } from './program/Program';

export enum DataType {
  PRORGRAM = 'PRORGRAM'
}

export type DataPayloadType = { dataType: DataType.PRORGRAM; data: Program[] };
