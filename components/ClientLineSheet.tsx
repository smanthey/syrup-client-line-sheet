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

export default function ClientLineSheet() {
  const [items, setItems] = useState<LineSheetItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<LineSheetItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/lineSheetData')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setItems(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load line sheet data')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const addToCart = (item: LineSheetItem) => {
    if (!cartItems.some(cartItem => cartItem.id === item.id)) {
      setCartItems(prev => [...prev, item])
    }
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  if (loading) return <div className="text-center py-4">Loading...</div>
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>

  return (
    <div>
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
      <ShoppingCart items={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />
    </div>
  )
}