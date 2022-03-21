/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import HttpStatus from 'http-status';
import { ITask } from '../interfaces/task.interface';
import { IPhase } from '../interfaces/phase.interface';
import { PhaseStatus } from '../enums/phase.enum';
import { ApiError } from '../utils';
import { IAuditionService } from '../interfaces/auditionService.interface';

const phases: Array<IPhase> = [
  {
    phaseId: 1,
    phaseName: 'foundation',
    status: PhaseStatus.UNLOCKED,
    isDone: true,
    tasks: [
      {
        taskId: 1,
        taskName: 'set up virtual office',
        isComplete: true,
      },
      {
        taskId: 2,
        taskName: 'set mission and vision',
        isComplete: true,
      },
      {
        taskId: 3,
        taskName: 'select business name',
        isComplete: true,
      },
      {
        taskId: 4,
        taskName: 'buy domain name',
        isComplete: true,
      },
    ],
  },
  {
    phaseId: 2,
    phaseName: 'Discovery',
    status: PhaseStatus.LOCKED,
    isDone: false,
    tasks: [
      {
        taskId: 1,
        taskName: 'create road map',
        isComplete: false,
      },
      {
        taskId: 2,
        taskName: 'competitor analysis',
        isComplete: false,
      },
    ],
  },
  {
    phaseId: 3,
    phaseName: 'Delivery',
    status: PhaseStatus.LOCKED,
    isDone: false,
    tasks: [
      {
        taskId: 1,
        taskName: 'release marketing website',
        isComplete: false,
      },
      {
        taskId: 2,
        taskName: 'release mvp',
        isComplete: false,
      },
    ],
  },
];

export default class AuditionService implements IAuditionService {
  private phases: Array<IPhase>;

  constructor() {
    this.phases = phases;
  }

  async getPhases(): Promise<IPhase[]> {
    return this.phases;
  }

  async getPhaseTask(phaseId: number, taskId: number): Promise<ITask> {
    const data = await this.getPhase(phaseId);
    const task = data.tasks.find(el => el.taskId === Number(taskId));
    if (!task) {
      throw new ApiError({
        message: 'task not found',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return task;
  }

  async getPhase(phaseId: number): Promise<IPhase> {
    const data: IPhase | undefined = this.phases.find(phase => phase.phaseId === Number(phaseId));
    if (!data) {
      throw new ApiError({
        message: 'Phase not found',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return data;
  }

  async addPhase(name: string): Promise<IPhase> {
    const data = await this.getPhases();
    const newPhase: IPhase = {
      phaseId: data.length + 1,
      phaseName: name,
      status: data.length > 0 ? PhaseStatus.LOCKED : PhaseStatus.UNLOCKED,
      tasks: [],
      isDone: false,
    };

    this.phases.push(newPhase);
    return newPhase;
  }

  async addTaskToPhase(taskName: string, phaseId: number): Promise<IPhase> {
    const data = await this.getPhase(phaseId);
    if (data.isDone === true) {
      throw new ApiError({
        message: 'Task cannot be added to a completed phase. kindly create a new phase',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    const taskId: number = data.tasks.length + 1;
    data.tasks.push({
      taskId,
      taskName,
      isComplete: false,
    });
    data.isDone = false;
    return data;
  }

  async getPhaseIndex(data: IPhase): Promise<number> {
    return this.phases.findIndex(el => el.phaseId === data.phaseId);
  }

  async getNextPhase(data: IPhase): Promise<IPhase> {
    const phaseIndex = await this.getPhaseIndex(data);
    return this.phases[phaseIndex + 1];
  }

  async getPreviousPhase(data: IPhase): Promise<IPhase> {
    const index = await this.getPhaseIndex(data);
    return this.phases[index - 1];
  }

  async checkIfPerviousPhaseIsCompleted(previousPhase: IPhase): Promise<void> {
    if (previousPhase && !previousPhase.isDone === true) {
      throw new ApiError({
        message: 'Previous task must be completed to unlock this phase',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async updateTaskStatus(phaseId: number, taskId: number): Promise<ITask> {
    const phase = await this.getPhase(phaseId);

    if (phase.isDone === true) {
      throw new ApiError({
        message: 'Cannot update completed phase',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const task = await this.getPhaseTask(phase.phaseId, taskId);
    if (task.isComplete === true) {
      throw new ApiError({
        message: 'Task already completed',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const previousPhase = await this.getPreviousPhase(phase);
    const nextPhase = await this.getNextPhase(phase);
    await this.checkIfPerviousPhaseIsCompleted(previousPhase);
    task.isComplete = true;

    // unlock next phase if all current phase task is completed
    phase.isDone = phase.tasks.every(el => el.isComplete === true);
    if (nextPhase && phase.isDone) {
      nextPhase.status = PhaseStatus.UNLOCKED;
    }
    return task;
  }
}
