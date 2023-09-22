import express from "express";
import * as ProductController from "../../controllers/product/product.controller";

const router = express.Router();

router.get("/", ProductController.getProducts);
router.get("/:productId", ProductController.getProduct);
router.post("/", ProductController.addProduct);
router.delete("/:productId", ProductController.deleteProduct);
router.put("/:productId", ProductController.updateProduct);

export default router;
