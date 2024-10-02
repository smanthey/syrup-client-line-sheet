import { NextResponse } from 'next/server'

const lineSheetData = [
  {
    id: 1,
    name: "Classic T-Shirt",
    category: "Tops",
    status: "In Stock",
    price: 19.99,
    imageUrl: "/placeholder.svg?height=300&width=300"
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    category: "Bottoms",
    status: "Low Stock",
    price: 49.99,
    imageUrl: "/placeholder.svg?height=300&width=300"
  },
  // Add more items as needed
]

export async function GET() {
  return NextResponse.json(lineSheetData)
}