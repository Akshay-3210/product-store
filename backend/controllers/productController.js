import { sql } from "../config/db.js";

export const getAllProducts = async(req,res)=>{
    try {
        const products= await sql`
        SELECT products.*, users.email AS owner_email
        FROM products
        LEFT JOIN users ON users.id = products.user_id
        ORDER BY products.created_at DESC
        `;

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
        SELECT products.*, users.email AS owner_email
        FROM products
        LEFT JOIN users ON users.id = products.user_id
        WHERE products.id=${id}
        `
        res.status(200).json({success:true,data:product[0]})
    } catch (error) {
        console.log("error in getproduct",error);
        res.status(500).json({success: false,message:"internal server"})
    }

};
export const createProducts = async(req,res)=>{
    const {name,price,image,owner_number}=req.body
    if(!name || !price || !image){
        return res.status(400).json({success:false,message:"all fields are mandatory"})
    }
    try {
        const newProduct=await sql`
        INSERT INTO products (name,price,image,owner_number,user_id)
        VALUES (${name},${price},${image},${owner_number || null},${req.userId})
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
        const product = await sql`SELECT user_id FROM products WHERE id=${id}`;
        if(product.length === 0){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            })
        }

        if(product[0].user_id !== req.userId){
            return res.status(403).json({
                success:false,
                message:"Forbidden: You do not own this product",
            })
        }

        const deleteProduct=await sql`
            DELETE FROM products WHERE id=${id}
            RETURNING *
        `;
        res.status(200).json({success:true,data:deleteProduct[0]});
    } catch (error) {
        console.log("error in delete ",error);
        res.status(500).json({success: false,message:"internal server"})
    }

};
export const updateProducts = async(req,res)=>{
    const { id }=req.params;
    const { name,price,image,owner_number }=req.body;

    try {
        const product = await sql`SELECT user_id FROM products WHERE id=${id}`;
        if(product.length === 0){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            })
        }

        if(product[0].user_id !== req.userId){
            return res.status(403).json({
                success:false,
                message:"Forbidden: You do not own this product",
            })
        }

        const updateProduct=await sql`
            UPDATE products
            SET name=${name},price=${price},image=${image},owner_number=${owner_number || null}
            WHERE id=${id}
            RETURNING *
        `
        res.status(200).json({success:true,data:updateProduct[0]});

    } catch (error) {
        console.log("error in update ",error);
        res.status(500).json({success: false,message:"internal server"})
    }
};
