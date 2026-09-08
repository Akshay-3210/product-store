"use client"
import { ShoppingBagIcon, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import ThemeSelector from './ThemeSelector'
import { useAuthStore } from '@/store/useAuthStore'

function Navbar() {
  const pathname=usePathname();
  const isHomePage= pathname ==="/"
  const { isAuthenticated, logout, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
         <div className="navbar px-4 min-h-[4rem] justify-between">
          <div className='flex-1 lg:flex-none'>
            <Link href="/" className="hover:opacity-80 transition-opacity">
            <div className='flex items-center gap-2'>
              <ShoppingCart className='h-9 w-9 text-primary' />
              <span className='font-semibold font-mono tracking-widest
              text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary '>
                POSGRESTORE
              </span>
            </div>
            </Link>
          </div>

          <div className='flex items-center gap-4'>
            {isAuthenticated ? (
              <button onClick={logout} className="btn btn-ghost btn-sm">Logout</button>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link href="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
              </div>
            )}
            <ThemeSelector />

            {isHomePage && (
              <div className='indicator'>
                <div className='p-2 rounded-full hover:bg-base-200 transition-colors'>
                  <ShoppingBagIcon className='w-5 h-5' />
                  <span className='badge badge-sm badge-primary indicator-item'>
                    8
                  </span>

                </div>
              </div>
            )}
          </div>

         </div>
      </div>

    </div>
  )
}

export default Navbar
