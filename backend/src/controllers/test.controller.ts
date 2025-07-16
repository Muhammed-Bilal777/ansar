import { Request, Response } from 'express';

export const testController = (req: any, res: Response) => {
  res.status(200).send({
    message: 'testing route',
  });
};
