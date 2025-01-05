"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  sizes: string[]
}

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image src={product.image} alt={product.name} width={500} height={500} className="w-full" />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Size</h3>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <Button
            onClick={() => addToCart({ ...product, size: selectedSize })}
            disabled={!selectedSize}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

