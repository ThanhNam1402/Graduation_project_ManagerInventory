import React from 'react';
import './Info.scss'; // Tùy chỉnh CSS

const Info = () => {
  return (
    <div className="account-main-content">
      <h3>Thông tin cá nhân</h3>
      <p>Đây là nơi bạn có thể quản lý các thông tin tài khoản của mình.</p>
      {/* Bạn có thể thêm form chỉnh sửa thông tin hoặc các mục khác ở đây */}
    </div>
  );
};

export default Info;
