import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: {
    message: string;
    stack: any;
    statusCode: any;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};

export default errorHandler;
