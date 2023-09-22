import mongoose from "mongoose";
import createHttpError from "http-errors";

export function checkIdIsValid(id: string) {
  if (!mongoose.isValidObjectId(id)) {
    throw createHttpError(404, "invalid id");
  }
}

export function checkDataIsExist<T>(data: T) {
  if (!data) {
    throw createHttpError(404, "Data not found");
  }
}

export function checkProductRequestIsValid(
  productName?: string,
  description?: string,
  price?: number,
  stock?: number,
  weight?: number,
  productImage?: string
) {
  if (
    !productName ||
    !description ||
    !price ||
    !stock ||
    !weight ||
    !productImage
  ) {
    throw createHttpError(400, "Please fill the data");
  }
  if (stock <= -1 || weight <= -1 || stock <= -1) {
    throw createHttpError(404, "invalid value, minus value is not allowed");
  }
}
