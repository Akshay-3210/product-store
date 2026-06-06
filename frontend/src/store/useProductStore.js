import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = (process.env.NODE_ENV === "development")
    ? process.env.NEXT_PUBLIC_BASE_URL || ""
    : "";

export const useProductStore = create((set,get)=> ({
    products:[],
    loading:false,
    error:null,
    currentProduct:null,

    formData:{
        name:"",
        price:"",
        image:""
    },
    setFormData: (formData) => set({ formData }),
    resetFormData: () => set({ formData: { name:"",price:"",image:"" } }),
    addProduct: async(e)=>{
        e.preventDefault();
        set({loading:true});
        try {
            const { formData }=get();
            await axios.post(`${BASE_URL}/api/products`,formData);
            await get().fetchProducts();
            get().resetFormData();
            toast.success("product added successfully");
            // close modal
            document.getElementById("add_product_modal")?.close();

        } catch (error) {
            console.log("error in add product ",error);
            toast.error("something went wrong");
            
        }
        finally{
            set({loading:false});
        }
    },
    fetchProducts: async()=>{
        set({loading:true});
        try {
            const res = await axios.get(`${BASE_URL}/api/products`);
            const products = Array.isArray(res.data?.data) ? res.data.data : [];
            set({products,error:null});
        } catch (error) {
            if(error.status === 429){
                set({error:"rate limit exceeded",products:[]});
            }
            else{
                set({error:"something went wrong",products:[]});
            }
        }
        finally{
            set({loading:false});
        }
    },
    deleteProduct: async(id)=>{
        set({loading:true});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set(prev => ({products: prev.products.filter(product => product.id !== id)}));
            toast.success("product deleted successfully");


        } catch (error) {
            console.log("error in delete ",error);
            toast.error("something went wrong");
        }
        finally{
            set({loading:false});
        }

    },
    fetchProduct: async (id)=>{
        set({loading:true});
        try {
            const response=await axios.get(`${BASE_URL}/api/products/${id}`);
            set({currentProduct:response.data.data,
                formData: response.data.data,
                error:null,
            });
        } catch (error) {
            console.log("error in fetch product",error);
            set({error:"something went wrong",currentProduct:null});
            
        }
        finally{
            set({loading:false});
        }
    },
    updateProduct: async (id)=>{
        set({loading:true});
        try {
            const {formData} = get();
            const response=await axios.put(`${BASE_URL}/api/products/${id}`,formData);
            set({currentProduct:response.data.data});
            toast.success("product updated successfully");

        } catch (error) {
            toast.error("something went wrong");
            console.log("error in update product",error);
            

        }
        finally{
            set({loading:false});
        }
    }

}));