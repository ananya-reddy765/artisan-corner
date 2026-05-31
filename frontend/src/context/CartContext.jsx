import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext =
  createContext();

export const CartProvider = ({
  children,
}) => {
  const [cartItems, setCartItems] =
    useState(() => {
      const savedCart =
        localStorage.getItem(
          "cart"
        );

      return savedCart
        ? JSON.parse(
            savedCart
          )
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartItems
      )
    );
  }, [cartItems]);

  const addToCart = (
    product
  ) => {
    const exists =
      cartItems.find(
        (item) =>
          item._id === product._id
      );

    if (exists) {
      alert(
        "Product already in cart"
      );
      return;
    }

    setCartItems([
      ...cartItems,
      {
        ...product,
        quantity: 1,
      },
    ]);

    alert(
      "Product Added To Cart"
    );
  };

  const removeFromCart = (
    id
  ) => {
    setCartItems(
      cartItems.filter(
        (item) =>
          item._id !== id
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);

    localStorage.removeItem(
      "cart"
    );
  };

  const updateQuantity = (
    id,
    quantity
  ) => {
    setCartItems(
      cartItems.map(
        (item) =>
          item._id === id
            ? {
                ...item,
                quantity,
              }
            : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);