import express from "express";
import { createProducts, getProducts,getAllProducts,updateProducts,deleteProducts } from "../controllers/productController.js";

const router=express.Router();
router.get("/",getAllProducts);
router.get("/:id",getProducts);
router.post("/",createProducts);
router.put("/:id",updateProducts);
router.delete("/:id",deleteProducts);

export default router;