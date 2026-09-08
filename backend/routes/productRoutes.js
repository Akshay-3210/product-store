import express from "express";
import { createProducts, getProducts,getAllProducts,updateProducts,deleteProducts } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router=express.Router();
router.get("/",getAllProducts);
router.get("/:id",getProducts);
router.post("/", authMiddleware, createProducts);
router.put("/:id", authMiddleware, updateProducts);
router.delete("/:id", authMiddleware, deleteProducts);

export default router;