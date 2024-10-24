import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="account-sidebar">
      <ul>
        <li>
          <NavLink to="/account" className={({ isActive }) => (isActive ? 'active' : '')} end>
            Thông tin cá nhân
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
            Đơn hàng của tôi
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/address" className={({ isActive }) => (isActive ? 'active' : '')}>
            Sổ địa chỉ
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/change-password" className={({ isActive }) => (isActive ? 'active' : '')}>
            Đổi mật khẩu
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/logout" className={({ isActive }) => (isActive ? 'active' : '')}>
            Đăng xuất
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
