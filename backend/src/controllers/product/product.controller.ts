import { NextFunction, Request, RequestHandler, Response } from "express";
import Product from "../../models/product.schema";

export const getProducts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().exec();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
