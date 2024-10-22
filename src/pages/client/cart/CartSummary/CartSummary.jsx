import React, { useState } from "react";
import "./CartSummary.scss";

const CartSummary = ({ items }) => {
  const [discount, setDiscount] = useState("");
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountAmount = discount ? total * (parseFloat(discount) / 100) : 0;
  const totalAfterDiscount = total - discountAmount;

  return (
    <div className="cart-summary">
      <h2>Tóm Tắt Đơn Hàng</h2>
      <div className="summary-details">
        <p>
          Tổng cộng: <span>{total} VNĐ</span>
        </p>
        {discountAmount > 0 && (
          <p>
            Giảm giá: <span>{discountAmount.toFixed(2)} VNĐ</span>
          </p>
        )}
        <p>
          Tổng sau giảm giá: <span>{totalAfterDiscount.toFixed(2)} VNĐ</span>
        </p>
      </div>
      <div className="discount-code">
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <button onClick={() => setDiscount(discount)}>Áp dụng</button>
      </div>
      <button className="checkout-btn">Thanh Toán</button>
    </div>
  );
};

export default CartSummary;
