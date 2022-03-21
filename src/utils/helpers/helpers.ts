/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { IResponse } from '../../interfaces/response.interface';
import { IError } from '../../interfaces/error.interface';
import constants from '../constants';
import genericError from '../error/generic';

const { serverError } = genericError;
const { FAIL, SUCCESS, SUCCESS_RESPONSE } = constants;

class Helper {
  static successResponse(res: Response, { data, message = SUCCESS_RESPONSE, code = 200 }: IResponse): Response<any> {
    return res.status(code).json({
      status: SUCCESS,
      message,
      data,
    });
  }

  static errorResponse(req: Request, res: Response, error: IError): Response {
    const aggregateError = { ...serverError, ...error };
    Helper.apiErrLogMessager(aggregateError, req);
    return res.status(aggregateError.status).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors,
    });
  }

  static apiErrLogMessager(error: any, req: Request): void {
    console.log(`${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }
}

export default Helper;
