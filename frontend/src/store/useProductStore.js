import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || '';

const getAuthHeader = () => {
    const token = useAuthStore.getState().token;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const useProductStore = create((set,get)=> ({
    products:[],
    loading:false,
    error:null,
    currentProduct:null,

    formData:{
        name:"",
        price:"",
        image:"",
        owner_number:""
    },
    setFormData: (formData) => set({ formData }),
    resetFormData: () => set({ formData: { name:"",price:"",image:"",owner_number:"" } }),
    addProduct: async(e)=>{
        e.preventDefault();
        set({loading:true});
        try {
            const { formData }=get();
            await axios.post(`${BASE_URL}/api/products`,formData, {
                headers: getAuthHeader()
            });
            await get().fetchProducts();
            get().resetFormData();
            toast.success("product added successfully");
            // close modal
            document.getElementById("add_product_modal")?.close();

        } catch (error) {
            console.error("Error in addProduct:", error);
            toast.error(error.response?.data?.message || "something went wrong");

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
            if(error.response?.status === 429){
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
            await axios.delete(`${BASE_URL}/api/products/${id}`, {
                headers: getAuthHeader()
            });
            set(prev => ({products: prev.products.filter(product => product.id !== id)}));
            toast.success("product deleted successfully");


        } catch (error) {
            console.error("Error in deleteProduct:", error);
            toast.error(error.response?.data?.message || "something went wrong");
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
            console.error("Error in fetchProduct:", error);
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
            const response=await axios.put(`${BASE_URL}/api/products/${id}`,formData, {
                headers: getAuthHeader()
            });
            set({currentProduct:response.data.data});
            toast.success("product updated successfully");

        } catch (error) {
            console.error("Error in updateProduct:", error);
            toast.error(error.response?.data?.message || "something went wrong");
        }
        finally{
            set({loading:false});
        }
    }

}));
