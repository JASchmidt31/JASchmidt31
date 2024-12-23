import { DayData as TrainingDayData } from './TrainingDayType';

export class TrainingDay {
  id: number;
  name: string;
  program: number;

  constructor(data: TrainingDayData) {
    this.id = data.id;
    this.name = data.name;
    this.program = data.program;
  }
}
