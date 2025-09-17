import type { Request, Response, NextFunction } from 'express';

export const asyncHandler = (routHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await routHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  }
};

