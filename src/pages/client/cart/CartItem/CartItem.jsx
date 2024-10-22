import React, { useState } from "react";
import "./CartItem.scss";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value)); // Đảm bảo số lượng không nhỏ hơn 1
    setQuantity(newQuantity);
  };

  const totalPrice = item.price * quantity; // Tính tổng giá

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="item-details">
        <div className="item-info">
          <h3>{item.name}</h3>
          <p className="price">{item.price} VNĐ</p>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1" // Đảm bảo giá trị tối thiểu là 1
            className="quantity-input"
          />
          <p className="total-price">{totalPrice} VNĐ</p> {/* Ô tổng giá */}
        </div>
      </div>
      <button className="remove-btn">Xóa</button>
    </div>
  );
};

export default CartItem;
