"use client"

import { useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function CheckoutPage() {
  const { cart } = useCart()
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement order submission logic here
    console.log('Submitting order:', { cart, address, paymentMethod })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full address"
            required
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod">Cash on Delivery</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online">Online Payment</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="font-semibold mt-2">
            Total: ${total.toFixed(2)}
          </div>
        </div>
        <Button type="submit">Place Order</Button>
      </form>
    </div>
  )
}

