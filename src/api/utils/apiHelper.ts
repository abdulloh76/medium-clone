import { NextFunction, Request, Response } from "express";

export const asyncWrapper = (requestHandler: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return requestHandler(req, res, next).catch(next);
  };
};

export const customErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({ message: error.message });
};
