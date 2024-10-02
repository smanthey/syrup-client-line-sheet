'use client'

import React, { useState, useEffect } from 'react'
import ShoppingCart from './ShoppingCart'

interface LineSheetItem {
  id: number
  name: string
  category: string
  status: string
  price: number
  imageUrl: string
}

// Inline tester data
const testerData: LineSheetItem[] = [
  {
    id: 1,
    name: "Test T-Shirt",
    category: "Tops",
    status: "In Stock",
    price: 19.99,
    imageUrl: "/placeholder.svg?height=300&width=300"
  },
  {
    id: 2,
    name: "Test Jeans",
    category: "Bottoms",
    status: "Low Stock",
    price: 49.99,
    imageUrl: "/placeholder.svg?height=300&width=300"
  }
]

export default function ClientLineSheet() {
  const [items, setItems] = useState<LineSheetItem[]>(testerData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<LineSheetItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...')
        const response = await fetch('/api/lineSheetData')
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Fetched data:', data)
        
        if (Array.isArray(data) && data.length > 0) {
          setItems(prevItems => {
            console.log('Updating items:', [...prevItems, ...data])
            return [...prevItems, ...data]
          })
        } else {
          console.warn('Fetched data is empty or not an array')
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(`Failed to load additional line sheet data: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const addToCart = (item: LineSheetItem) => {
    console.log('Adding to cart:', item)
    setCartItems(prev => {
      const newCart = prev.some(cartItem => cartItem.id === item.id) ? prev : [...prev, item]
      console.log('Updated cart:', newCart)
      return newCart
    })
  }

  const removeFromCart = (id: number) => {
    console.log('Removing from cart, id:', id)
    setCartItems(prev => {
      const newCart = prev.filter(item => item.id !== id)
      console.log('Updated cart:', newCart)
      return newCart
    })
  }

  const clearCart = () => {
    console.log('Clearing cart')
    setCartItems([])
  }

  console.log('Rendering ClientLineSheet. Items:', items, 'Cart:', cartItems)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Clothing Line Sheet</h1>
      {items.length === 0 ? (
        <p className="text-center">No items available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
              <div className="space-y-2 text-sm">
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => addToCart(item)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
      {loading && <p className="text-center">Loading additional items...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <ShoppingCart items={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />
    </div>
  )
}