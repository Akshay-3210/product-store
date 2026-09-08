"use client"
import { useProductStore } from '@/store/useProductStore'
import { useAuthStore } from '@/store/useAuthStore'
import { EditIcon, MailIcon, PhoneIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function ProductCard({product}) {
  const { deleteProduct }= useProductStore();
  const { user } = useAuthStore();

  const isOwner = user && product.user_id === user.id;

  return (
    <div className='w-full max-w-sm rounded-xl overflow-hidden shadow-2xl bg-transparent'>
      {/* Image area */}
      <div className='relative rounded-t-xl overflow-hidden h-56'>
        <img
          src={product.image}
          alt={product.name}
          className='absolute inset-0 w-full h-full object-cover'
        />
      </div>

      {/* Card body */}
      <div className='rounded-b-xl bg-neutral-900 text-white p-6'>
        <h2 className='text-lg font-semibold mb-2'>{product.name}</h2>
        <p className='text-2xl font-bold text-emerald-400 mb-4'>${Number(product.price).toFixed(2)}</p>

        <div className="space-y-2 mb-4 text-sm text-white/75">
          {product.owner_number && (
            <p className="flex items-center gap-2">
              <PhoneIcon className="size-4 shrink-0" />
              <a href={`tel:${product.owner_number}`} className="hover:text-white">
                {product.owner_number}
              </a>
            </p>
          )}
          {product.owner_email && (
            <p className="flex items-center gap-2">
              <MailIcon className="size-4 shrink-0" />
              <a href={`mailto:${product.owner_email}`} className="break-all hover:text-white">
                {product.owner_email}
              </a>
            </p>
          )}
        </div>

        <div className='flex items-center justify-end gap-3'>
          {isOwner && (
            <>
              <Link href={`/product/${product.id}`} className='btn btn-circle btn-sm btn-outline btn-info'>
                <EditIcon className='w-4 h-4' />
              </Link>

              <button
              onClick={()=> deleteProduct(product.id)}
              className='btn btn-circle btn-sm btn-outline btn-error'>
                <Trash2Icon className='w-4 h-4' />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
