import { sql } from "../config/db.js";

export const getAllProducts = async(req,res)=>{
    try {
        const products= await sql`
        SELECT * FROM products ORDER BY created_at DESC
        `;
        // console.log("fetched products",products);
        
        res.status(200).json({success:true,data:products});

    } catch (error) {
        console.log("error during getallproducts",error);
        res.status(500).json({success:false,message:"internal server error"});
    }
};
export const getProducts = async(req,res)=>{
    const { id }=req.params

    try {
        const product=await sql`
        SELECT * FROM products WHERE id=${id}
        `
        res.status(200).json({success:true,data:product[0]})
    } catch (error) {
        console.log("error in getproduct",error);
        res.status(500).json({success: false,message:"internal server"})
    }

};
export const createProducts = async(req,res)=>{
    const {name,price,image}=req.body
    if(!name || !price || !image){
        res.status(400).json({success:false,message:"all fields are mandatory"})
    }
    try {
        const newProduct=await sql`
        INSERT INTO products (name,price,image) VALUES (${name},${price},${image})
        RETURNING *
        `
        console.log("new product added",newProduct);

        res.status(201).json({success:true,data:newProduct[0]});
        
        
    } catch (error) {
        console.log("error in create product",error);
        res.status(500).json({success: false,message:"internal server"})
    }
};
export const deleteProducts = async(req,res)=>{
    const { id }=req.params;

    try {
        const deleteProduct=await sql`
            DELETE FROM products WHERE id=${id}
            RETURNING *
        `;
        if(deleteProduct.length===0){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            })
        }
        res.status(200).json({success:true,data:deleteProduct[0]});
    } catch (error) {
        console.log("error in delete ",error);
        
    }

};
export const updateProducts = async(req,res)=>{
    const { id }=req.params;
    const { name,price,image }=req.body;
    
    try {
        const updateProduct=await sql`
            UPDATE products
            SET name=${name},price=${price},image=${image}
            WHERE id=${id}
            RETURNING *
        `
        if(updateProduct.length===0){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            })
        }
        res.status(200).json({success:true,data:updateProduct[0]});

    } catch (error) {
        console.log("error in update ",error);

        
    }
};