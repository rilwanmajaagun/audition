/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import baseValidator from '.';

export const addNewPhase = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    phaseId: Joi.number().required(),
    name: Joi.string().required(),
  });
  baseValidator(schema, req, res, next, 'body');
};

export const addTask = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    phaseId: Joi.number().required(),
    taskName: Joi.string().required(),
  });
  baseValidator(schema, req, res, next, 'body');
};

export const phaseIdTaskId = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    phaseId: Joi.number().required(),
    taskId: Joi.number().required(),
  });
  baseValidator(schema, req, res, next, 'params');
};

export const phaseId = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    phaseId: Joi.number().required(),
  });
  baseValidator(schema, req, res, next, 'params');
};
