"use client"
import { PaletteIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { THEMES } from '@/constants'
import { useThemeStore } from '@/store/useThemeStore'

function ThemeSelector() {
  const {theme,setTheme}=useThemeStore();
  
  useEffect(()=>{
    const savedTheme =
    localStorage.getItem("preferred-theme") || "forest";

  setTheme(savedTheme);
  },[])

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme);
  },[theme]);
  
  const handleThemeSelect=(theme)=>{
    setTheme(theme)
  }

  return (
    <div className='dropdown dropdown-end'>
      <button tabIndex={0} className='btn btn-ghost btn-circle'>
        <PaletteIcon className='w-5 h-5' />
      </button>
      <div tabIndex={0}
      className='dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-box-2xl 
      w-56 border border-base-content/10
      '
      >
      {THEMES.map(themeOption => (
        <button
          type='button'
          key={themeOption.name}
          onClick={() => handleThemeSelect(themeOption.name)}
          className={`
            w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
            ${theme===themeOption.name ? "bg-primary/10 text-primary":"hover:bg-base-content/5"}
            `}
        >
          <PaletteIcon className='w-4 h-4' />
          <span className='text-sm font-medium'>{themeOption.label}</span>
          <div className='ml-auto flex gap-1'>
            {themeOption.colors.map((color,i) => (
              <span key={i} className='w-2 h-2 rounded-full' style={{ backgroundColor : color}}/>
            ))}
          </div>
        </button>
      )) }

      </div>
    </div>
  )
}

export default ThemeSelector
