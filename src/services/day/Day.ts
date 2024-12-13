import { DayData } from './DayType';

export class Day {
  id: number;
  name: string;
  program: number;

  constructor(data: DayData) {
    this.id = data.id;
    this.name = data.name;
    this.program = data.program;
  }
}
