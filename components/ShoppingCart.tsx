import React from 'react'

interface LineSheetItem {
  id: number
  name: string
  price: number
}

interface ShoppingCartProps {
  items: LineSheetItem[]
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export default function ShoppingCart({ items, removeFromCart, clearCart }: ShoppingCartProps) {
  const handleSendInquiry = () => {
    console.log('Sending inquiry for:', items)
    clearCart()
    alert('Your inquiry has been sent!')
  }

  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : []

  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {safeItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4 space-y-2">
            {safeItems.map((item) => {
              // Check if item is defined and has necessary properties
              if (item && typeof item.id !== 'undefined' && typeof item.name !== 'undefined' && typeof item.price !== 'undefined') {
                return (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>{item.name} - ${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </li>
                )
              }
              return null // Skip rendering if item is invalid
            })}
          </ul>
          <div className="flex justify-between">
            <button 
              onClick={handleSendInquiry}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Send Inquiry
            </button>
            <button 
              onClick={clearCart}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}