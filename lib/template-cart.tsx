'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  storeName: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
}
//
const CartContext = createContext<CartContextType | undefined>(undefined)

export function TemplateCartProvider({
  children,
  subdomain
}: {
  children: ReactNode
  subdomain: string
}) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`duka-cart-${subdomain}`)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse cart:', e)
      }
    }
    setIsInitialized(true)
  }, [subdomain])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(`duka-cart-${subdomain}`, JSON.stringify(items))
    }
  }, [items, subdomain, isInitialized])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(current => {
      const existingItem = current.find(i => i.productId === item.productId)
      if (existingItem) {
        return current.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...current, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setItems(current => current.filter(i => i.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems(current =>
      current.map(i =>
        i.productId === productId ? { ...i, quantity } : i
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useTemplateCart(subdomain: string) {
  const context = useContext(CartContext)
  if (!context) {
    // Return a stub if provider is not available (for initial render)
    return {
      items: [],
      addItem: () => { },
      removeItem: () => { },
      updateQuantity: () => { },
      clearCart: () => { },
      total: 0,
    }
  }
  return context
}
