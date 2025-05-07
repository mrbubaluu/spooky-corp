
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('spookyCart');
    return localData ? JSON.parse(localData) : [];
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('spookyCart', JSON.stringify(cart));
  }, [cart]);

  const generateCartItemId = (product) => {
    return product.selectedSize ? `${product.id}-${product.selectedSize}` : product.id;
  };

  const addToCart = (product, quantity = 1) => {
    const cartItemId = generateCartItemId(product);
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity, cartItemId }];
      }
    });
    toast({
      title: "Producto añadido",
      description: `${product.name}${product.selectedSize ? ' (Talla: ' + product.selectedSize + ')' : ''} se ha añadido a tu solicitud.`,
      variant: "default"
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado de tu solicitud.",
      variant: "destructive"
    });
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
     toast({
      title: "Solicitud vaciada",
      description: "Todos los productos han sido eliminados de tu solicitud.",
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
