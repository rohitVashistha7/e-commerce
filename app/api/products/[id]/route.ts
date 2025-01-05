import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const db = await connectToDatabase()
  const product = await db.collection('products').findOne({ _id: new ObjectId(params.id) })
  return NextResponse.json(product)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const db = await connectToDatabase()
  await db.collection('products').deleteOne({ _id: new ObjectId(params.id) })
  return NextResponse.json({ message: 'Product deleted' })
}

