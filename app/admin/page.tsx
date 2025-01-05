"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Product {
  id: string
  name: string
  price: number
  description: string
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '' })

  useEffect(() => {
    // Fetch products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement add product logic
    console.log('Adding product:', newProduct)
    // After adding, reset form and refetch products
  }

  const handleRemoveProduct = (id: string) => {
    // Implement remove product logic
    console.log('Removing product:', id)
    // After removing, refetch products
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Add Product</Button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
          <ul className="space-y-4">
            {products.map(product => (
              <li key={product.id} className="flex justify-between items-center border p-4 rounded-lg">
                <span>{product.name} - ${product.price.toFixed(2)}</span>
                <Button variant="destructive" onClick={() => handleRemoveProduct(product.id)}>Remove</Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

