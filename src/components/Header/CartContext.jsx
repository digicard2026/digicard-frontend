import React, { createContext, useContext, useState } from 'react';


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  const addToCart = (product) => {
    console.log(product);
    setCart((prevCart) => [...prevCart, product]);

  };
  const addToCartV2 = (product) => {

    setCart((prevCart) => [...prevCart, ...product]);

  };
  const removeItem = (_id) => {
    console.log(_id);
    setCart(prev => prev.filter(item => item._id !== _id));
    // setCart((prevCart)=> prevCart.filter[(item=> item.id !== id)])
    //console.log(cart);
  };
  const clearCart = () => {
    setCart([]);
};
  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.18; // Assuming 18% tax rate
  };

  const calculateTotal = (subtotal, tax) => {
    return subtotal + tax;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, addToCartV2, removeItem, calculateSubtotal, calculateTax, calculateTotal,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  return useContext(CartContext);
};