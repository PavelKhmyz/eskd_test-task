import type { ZodType } from 'zod';
import type { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid request data',
        error: result.error,
      })
    }

    req.body = result.data;
    next();
  }
}
