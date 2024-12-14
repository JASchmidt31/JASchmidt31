import { ExerciseData } from './ExerciseType';

export class Exercise {
  id: number;
  name: string;

  constructor(data: ExerciseData) {
    this.id = data.id;
    this.name = data.name;
  }
}
