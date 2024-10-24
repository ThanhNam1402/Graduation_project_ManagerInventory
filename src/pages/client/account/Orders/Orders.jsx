import React from 'react';
import './Orders.scss';

const Orders = () => {
  // Giả lập dữ liệu đơn hàng
  const orders = [
    {
      id: 'OD123456',
      date: '2023-10-23',
      status: 'Đã giao',
      total: '2,500,000 VND'
    },
    {
      id: 'OD123457',
      date: '2023-09-10',
      status: 'Đang xử lý',
      total: '1,200,000 VND'
    },
    {
      id: 'OD123458',
      date: '2023-08-30',
      status: 'Đã hủy',
      total: '3,000,000 VND'
    },
  ];

  return (
    <div className="orders-page">
      <h1>Đơn hàng của tôi</h1>
      <p>Danh sách đơn hàng của bạn sẽ hiển thị ở đây.</p>

      <div className="order-list">
        {orders.map((order) => (
          <div className="order-item" key={order.id}>
            <div className="order-header">
              <div className="order-id">Mã đơn hàng: {order.id}</div>
              <div className="order-status">{order.status}</div>
            </div>
            <div className="order-details">
              <div>Ngày đặt: {order.date}</div>
              <div>Tổng cộng: {order.total}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
