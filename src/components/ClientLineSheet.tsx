'use client'

import React, { useState, useMemo } from 'react'
import { lineSheetData, LineSheetItem } from '../lib/lineSheetData'
import { ShoppingCart } from './ShoppingCart'

export default function ClientLineSheet() {
  const [items] = useState<LineSheetItem[]>(lineSheetData)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [cartItems, setCartItems] = useState<LineSheetItem[]>([])
  const itemsPerPage = 9

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || item.status === statusFilter) &&
      (categoryFilter === "All" || item.category === categoryFilter)
    )
  }, [items, searchTerm, statusFilter, categoryFilter])

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  const categories = useMemo(() => Array.from(new Set(items.map(item => item.category))).filter(Boolean), [items])
  const statuses = useMemo(() => Array.from(new Set(items.map(item => item.status))).filter(Boolean), [items])

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

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {displayedItems.map((item) => (
        <div key={item.id} className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
          <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
          <div className="space-y-2 text-sm">
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Min. Order:</strong> {item.minOrderQuantity} units</p>
            <p><strong>Sample Cost:</strong> ${item.sampleCost.toFixed(2)}</p>
            <p><strong>Production Cost:</strong> ${item.productionCost.toFixed(2)}</p>
            <p><strong>Sample Lead Time:</strong> {item.sampleLeadTime}</p>
            <p><strong>Bulk Lead Time:</strong> {item.bulkLeadTime || 'N/A'}</p>
            <p><strong>Sizes:</strong> {item.sizes || 'N/A'}</p>
            <p><strong>Material:</strong> {item.fabricMaterial || 'N/A'}</p>
            {item.balance > 0 && (
              <p><strong>Balance Due:</strong> ${item.balance.toFixed(2)}</p>
            )}
            {item.note && <p><strong>Note:</strong> {item.note}</p>}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs">
              {item.status}
            </span>
            <button 
              onClick={() => addToCart(item)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Min. Order</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sample Cost</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Production Cost</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sample Lead Time</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Bulk Lead Time</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sizes</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Material</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Balance Due</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 border-b border-gray-200">{item.name}</td>
              <td className="px-4 py-2 border-b border-gray-200">{item.category}</td>
              <td className="px-4 py-2 border-b border-gray-200">{item.minOrderQuantity}</td>
              <td className="px-4 py-2 border-b border-gray-200">${item.sampleCost.toFixed(2)}</td>
              <td className="px-4 py-2 border-b border-gray-200">${item.productionCost.toFixed(2)}</td>
              <td className="px-4 py-2 border-b border-gray-200">{item.sampleLeadTime}</td>
              <td className="px-4 py-2 border-b border-gray-200">{item.bulkLeadTime || 'N/A'}</td>
              <td className="px-4 py-2 border-b border-gray-200">{item.sizes || 'N/A'}</td>
              <td className="px-4 py-2 border-b border-gray-200">{item.fabricMaterial || 'N/A'}</td>
              <td className="px-4 py-2 border-b border-gray-200">
                <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs">
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-2 border-b border-gray-200">{item.balance > 0 ? `$${item.balance.toFixed(2)}` : 'N/A'}</td>
              <td className="px-4 py-2 border-b border-gray-200">
                <button 
                  onClick={() => addToCart(item)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Clothing Line Sheet</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border rounded"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="All">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="All">All Statuses</option>
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as 'grid' | 'table')}
          className="px-4 py-2 border rounded"
        >
          <option value="grid">Grid View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {viewMode === 'grid' ? renderGridView() : renderTableView()}

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} items
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <ShoppingCart items={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />
    </div>
  )
}