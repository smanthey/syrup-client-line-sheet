import React from 'react'
import { LineSheetItem } from '../lib/lineSheetData'

interface ShoppingCartProps {
  items: LineSheetItem[]
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export function ShoppingCart({ items, removeFromCart, clearCart }: ShoppingCartProps) {
  const handleSendInquiry = async () => {
    const itemsList = items.map(item => `${item.name} (ID: ${item.id})`).join('\n')
    const emailBody = `
Inquiry for the following items:

${itemsList}
    `

    // In a real application, you would send this to your server
    // Here we're just logging it to the console
    console.log('Sending email to sm@smatdesigns.com with body:', emailBody)

    // Clear the cart after submission
    clearCart()

    alert('Your inquiry has been sent!')
  }

  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4 space-y-2">
            {items.map(item => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
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