"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addToCart } = useCart()

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image src={product.image} alt={product.name} width={300} height={300} className="w-full" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <div className="mt-4 flex justify-between">
          <Button onClick={() => router.push(`/product/${product.id}`)}>View Details</Button>
          <Button variant="outline" onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}

