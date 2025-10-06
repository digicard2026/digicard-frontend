import React , { useState } from 'react';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleCart} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Cart ({cart.length})
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg z-10">
          <h2 className="text-lg font-bold p-2" >Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="p-2 text-gray-500" >Your cart is empty.</p>
          ) : (
            <ul className="p-2" >
              {cart.map((item, index) => (
                <li key={index} className="border-b border-gray-200 py-1" >
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;