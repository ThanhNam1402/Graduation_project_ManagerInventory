import React from "react";
import CartItem from "./CartItem/CartItem";
import CartSummary from "./CartSummary/CartSummary";
import CartEmpty from "./CartEmpty/CartEmpty";
import "./Cart.scss";

const cartItems = [
  {
    id: 1,
    name: "Sản phẩm 1",
    price: 100000,
    quantity: 2,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    price: 200000,
    quantity: 1,
    image: "https://via.placeholder.com/200",
  },
];

const Cart = () => {
  return (
    <div className="cart-container">
      <h1>Giỏ Hàng</h1>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartSummary items={cartItems} />
        </>
      )}
    </div>
  );
};

export default Cart;
