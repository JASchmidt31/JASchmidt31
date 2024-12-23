import { ProgramData as TrainingProgramData } from './TraininigProgramType';

export class TrainingProgram {
  id: number;
  name: string;

  constructor(data: TrainingProgramData) {
    this.id = data.id;
    this.name = data.name;
  }
}
