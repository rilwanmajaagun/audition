import { PhaseStatus } from '../enums/phase.enum';
import { ITask } from './task.interface';

export interface IPhase {
  phaseId: number;
  phaseName: string;
  status: PhaseStatus;
  isDone: boolean;
  tasks: ITask[];
}
