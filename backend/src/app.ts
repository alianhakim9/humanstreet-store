import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(express.json());

// route
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

// error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "an uknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({
    error: errorMessage,
  });
});

export default app;
