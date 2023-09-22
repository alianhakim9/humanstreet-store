import express from "express";
import * as ProductController from "../../controllers/product/product.controller";

const router = express.Router();

router.get("/", ProductController.getProducts);

export default router;
