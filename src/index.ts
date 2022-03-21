/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express';
import router from './routes';
import { Helper, genericErrors, constants } from '@src/utils';

const { successResponse, errorResponse } = Helper;
const { notFoundApi } = genericErrors;
const { WELCOME, v1 } = constants;

const port = 8000;
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get(v1, (req: Request, res: Response) => successResponse(res, { message: WELCOME }));
app.use(v1, router);
app.use((req, res, next) => next(notFoundApi));
app.use((err: any, req: Request, res: Response, next: NextFunction) => errorResponse(req, res, err));
app.listen(port, () => {
  console.log('Application listing on port 8000');
});

export default app;
