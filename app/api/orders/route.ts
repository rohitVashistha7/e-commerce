import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  const db = await connectToDatabase()
  const orders = await db.collection('orders').find({}).toArray()
  return NextResponse.json(orders)
}

export async function POST(request: Request) {
  const order = await request.json()
  const db = await connectToDatabase()
  const result = await db.collection('orders').insertOne(order)
  return NextResponse.json({ id: result.insertedId })
}

