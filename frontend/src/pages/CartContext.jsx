import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action.payload;
      const existingProduct = state.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        return state.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { product, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART': {
      return state.filter((item) => item.product.id !== action.payload.id);
    }
    case 'DECREASE_QUANTITY': {
      const productId = action.payload.id;
      return state
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) } 
            : item
        )
        .filter((item) => item.quantity > 0); 
    }
    case 'CLEAR_CART': {
      return []; 
    }
    default:
      return state;
  }
};

const getCartFromLocalStorage = (customerId) => {
  const cartData = localStorage.getItem(`cart_${customerId}`);
  return cartData ? JSON.parse(cartData) : [];
};

const saveCartToLocalStorage = (customerId, cart) => {
  localStorage.setItem(`cart_${customerId}`, JSON.stringify(cart));
};

export const CartProvider = ({ children }) => {
  const customerId = localStorage.getItem('customerId'); 
  const [cart, dispatch] = useReducer(cartReducer, [], () => getCartFromLocalStorage(customerId));

  useEffect(() => {
    if (customerId) {
      saveCartToLocalStorage(customerId, cart); 
    }
  }, [cart, customerId]);

  
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, dispatch, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};