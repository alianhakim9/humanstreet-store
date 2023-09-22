import { NextFunction, Request, RequestHandler, Response } from "express";
import ProductModel from "../../models/product.schema";
import {
  checkIdIsValid,
  checkDataIsExist,
  checkProductRequestIsValid,
} from "../../utils/validation";
import createHttpError from "http-errors";

export const getProducts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.find().exec();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.productId;
  try {
    checkIdIsValid(productId);
    const product = await ProductModel.findById(productId).exec();
    checkDataIsExist(product);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

interface AddProductBody {
  productName?: string;
  description?: string;
  price?: number;
  stock?: number;
  weight?: number;
  productImage?: string;
}

export const addProduct: RequestHandler<
  unknown,
  unknown,
  AddProductBody,
  unknown
> = async (req, res: Response, next: NextFunction) => {
  const productName = req.body.productName;
  const description = req.body.description;
  const price = req.body.price;
  const stock = req.body.stock;
  const weight = req.body.weight;
  const productImage = req.body.productImage;
  try {
    checkProductRequestIsValid(
      productName,
      description,
      price,
      stock,
      weight,
      productImage
    );
    const newProduct = await ProductModel.create({
      productName: productName,
      description: description,
      price: price,
      stock: stock,
      weight: weight,
      productImage: productImage,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.productId;
  try {
    checkIdIsValid(productId);
    const product = await ProductModel.findById(productId).exec();
    checkDataIsExist(product);
    await product?.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

interface UpdateProductParams {
  productId: string;
}

interface UpdateProductBody {
  productName?: string;
  description?: string;
  price?: number;
  stock?: number;
  weight?: number;
  productImage?: string;
}

export const updateProduct: RequestHandler<
  UpdateProductParams,
  unknown,
  UpdateProductBody,
  unknown
> = async (req, res: Response, next: NextFunction) => {
  const productId = req.params.productId;
  const newProductName = req.body.productName;
  const newDescription = req.body.description;
  const newPrice = req.body.price;
  const newStock = req.body.stock;
  const newWeight = req.body.weight;
  const newProductImage = req.body.productImage;

  try {
    checkProductRequestIsValid(
      newProductName,
      newDescription,
      newPrice,
      newStock,
      newWeight,
      newProductImage
    );

    checkIdIsValid(productId);

    const product = await ProductModel.findById(productId).exec();

    checkDataIsExist(product);

    if (product) {
      product.productName = newProductName || product?.productName;
      product.description = newDescription || product?.description;
      product.price = newPrice || product?.price;
      product.stock = newStock || product?.stock;
      product.weight = newWeight || product?.weight;
      product.productImage = newProductImage || product?.productImage;
    }

    const updatedProduct = await product?.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
