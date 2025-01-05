import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  const db = await connectToDatabase()
  const products = await db.collection('products').find({}).toArray()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const product = await request.json()
  const db = await connectToDatabase()
  const result = await db.collection('products').insertOne(product)
  return NextResponse.json({ id: result.insertedId })
}

