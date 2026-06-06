"use client"
import {create} from "zustand"

export const useThemeStore = create((set,get)=>({
    theme: "forest",
    setTheme: (theme) => {
        if(typeof window !== "undefined"){
            localStorage.setItem("preferred-theme",theme);
        }
        set({theme});
    },
    
}))
