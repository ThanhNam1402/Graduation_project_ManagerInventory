import React from 'react';
import './Address.scss';

const Address = () => {
  return (
    <div className="address-container">
      <h2>Địa chỉ của tôi</h2>
      <div className="address-card">
        <div className="address-info">
          <h3>Địa chỉ chính</h3>
          <p>123 Đường Lớn, Phường 1, Quận 2, Thành phố Hồ Chí Minh</p>
        </div>
        <div className="address-actions">
          <button className="edit-button">Chỉnh sửa</button>
          <button className="remove-button">Xóa</button>
        </div>
      </div>

      <div className="address-card">
        <div className="address-info">
          <h3>Địa chỉ khác</h3>
          <p>456 Đường Nhỏ, Phường 2, Quận 3, Thành phố Hà Nội</p>
        </div>
        <div className="address-actions">
          <button className="edit-button">Chỉnh sửa</button>
          <button className="remove-button">Xóa</button>
        </div>
      </div>

      <button className="add-address-button">Thêm địa chỉ mới</button>
    </div>
  );
};

export default Address;
