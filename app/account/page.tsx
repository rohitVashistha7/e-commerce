"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Order {
  id: string
  date: string
  total: number
  status: string
}

export default function AccountPage() {
  const [user, setUser] = useState({ name: '', email: '' })
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Fetch user data and orders
    // This is a placeholder, replace with actual API calls
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data))

    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [])

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement profile update logic
    console.log('Updating profile:', user)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map(order => (
                <li key={order.id} className="border p-4 rounded-lg">
                  <p>Order ID: {order.id}</p>
                  <p>Date: {order.date}</p>
                  <p>Total: ${order.total.toFixed(2)}</p>
                  <p>Status: {order.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

