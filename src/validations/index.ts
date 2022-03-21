/* eslint-disable no-useless-escape */
import HttpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { Helper, ApiError } from '../utils';

const { errorResponse } = Helper;

const baseValidator = async (
  schema: any,
  req: Request,
  res: Response,
  next: NextFunction,
  type: string
): Promise<void | Response> => {
  try {
    const getReqType: Record<string, any> = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };
    getReqType[type] = await schema.validateAsync(getReqType[type]);
    return next();
  } catch (e: any) {
    const error = new ApiError({
      status: HttpStatus.BAD_REQUEST,
      message: e.message.replace(/[\"]/gi, ''),
    });
    return errorResponse(req, res, error);
  }
};

export default baseValidator;
