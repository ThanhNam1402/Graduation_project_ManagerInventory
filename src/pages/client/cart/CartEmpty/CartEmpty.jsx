import React from 'react';
import './CartEmpty.scss';

const CartEmpty = () => {
    return (
        <div className="cart-empty">
            <h2>Giỏ hàng của bạn trống</h2>
            <p>Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm!</p>
        </div>
    );
};

export default CartEmpty;
