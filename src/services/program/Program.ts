import { ProgramData } from './ProgramType';

export class Program {
  id: number;
  name: string;

  constructor(data: ProgramData) {
    this.id = data.id;
    this.name = data.name;
  }
}
