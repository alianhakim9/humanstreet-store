import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import productRoutes from "./routes/product/product.routes";

const app = express();

app.use(express.json());

// route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Humanstreet store API",
    version: 1.0,
  });
});
app.use("/api/products", productRoutes);

// error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});
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
