import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  return res.status(500).json({
    code: 500,
    message: error.message ? error.message : 'Something went wrong'
  });
};
