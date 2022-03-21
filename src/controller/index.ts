import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status';
import { IAuditionService } from '../interfaces/auditionService.interface';
import { IPhase } from '../interfaces/phase.interface';
import AuditionService from '../service';
import { Helper, constants } from '../utils';

const { successResponse } = Helper;
const { RESOURCE_FETCH_SUCCESS, RESOURCE_CREATE_SUCCESS, RESOURCE_UPDATE_SUCCESS } = constants;

class AuditionController {
  constructor(private readonly auditionService: IAuditionService) {
    this.auditionService = auditionService;
  }

  getPhases = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<IPhase[]>> => {
    try {
      const data = await this.auditionService.getPhases();
      return successResponse(res, {
        code: HttpStatus.OK,
        message: RESOURCE_FETCH_SUCCESS('Phases'),
        data,
      });
    } catch (e) {
      return next(e);
    }
  };

  getPhase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        params: { phaseId },
      } = req;
      const data = await this.auditionService.getPhase(Number(phaseId));
      return successResponse(res, {
        code: HttpStatus.OK,
        message: RESOURCE_FETCH_SUCCESS('Phase'),
        data,
      });
    } catch (e) {
      return next(e);
    }
  };

  addNewPhase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        body: { name },
      } = req;
      const data = await this.auditionService.addPhase(name);
      return successResponse(res, {
        code: HttpStatus.CREATED,
        message: RESOURCE_CREATE_SUCCESS('Phase'),
        data,
      });
    } catch (e) {
      return next(e);
    }
  };

  addTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        body: { taskName, phaseId },
      } = req;
      const data = await this.auditionService.addTaskToPhase(taskName, phaseId);
      return successResponse(res, {
        code: HttpStatus.CREATED,
        message: RESOURCE_CREATE_SUCCESS('Task'),
        data,
      });
    } catch (e) {
      return next(e);
    }
  };

  getPhaseTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        params: { phaseId, taskId },
      } = req;
      const data = await this.auditionService.getPhaseTask(Number(phaseId), Number(taskId));
      return successResponse(res, {
        code: HttpStatus.OK,
        message: RESOURCE_FETCH_SUCCESS('Task'),
        data,
      });
    } catch (e) {
      return next(e);
    }
  };

  updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        params: { phaseId, taskId },
      } = req;
      const data = await this.auditionService.updateTaskStatus(Number(phaseId), Number(taskId));
      return successResponse(res, {
        code: HttpStatus.OK,
        message: RESOURCE_UPDATE_SUCCESS('Task'),
        data,
      });
    } catch (e) {
      return next(e);
    }
  };
}

export default new AuditionController(new AuditionService());
