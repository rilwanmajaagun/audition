/* eslint-disable no-unused-vars */
import { IPhase } from './phase.interface';
import { ITask } from './task.interface';

export interface IAuditionService {
  getPhaseTask(phaseId: number, taskId: number): Promise<ITask>;
  getPhases(): Promise<IPhase[]>;
  getPhase(phaseId: number): Promise<IPhase>;
  addPhase(name: string): Promise<IPhase>;
  addTaskToPhase(taskName: string, phaseId: number): Promise<IPhase>;
  getPhaseIndex(currentPhase: IPhase): Promise<number>;
  getNextPhase(currentPhase: IPhase): Promise<IPhase>;
  getPreviousPhase(currentPhase: IPhase): Promise<IPhase>;
  checkIfPerviousPhaseIsCompleted(previousPhase: IPhase): Promise<void>;
  updateTaskStatus(phaseId: number, taskId: number): Promise<ITask>;
}
