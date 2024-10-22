import "./navbar.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_content">
        <div className="navbar_img">
          <img
            width="120px"
            height="70px"
            src="https://i.pinimg.com/enabled_hi/564x/fc/6d/23/fc6d23f0c26e68f40aee5bb6e9edf83d.jpg"
            alt=""
          />
          <div className="search">
            <i width="120px" className="ri-search-line"></i>
            <input placeholder="Tim kiem..." type="text" />

            <div className="search_content"></div>
          </div>
        </div>

        <div className="nav_bottom">
          <ul className="navbar_menu">
            <li className="menu_item">
              <NavLink to="">Trang chủ</NavLink>
            </li>
            <li className="menu_item">
              <i className="ri-list-unordered"></i>
              <NavLink to="/category">Danh mục</NavLink>

              <ul className="menu_cate">
                <li className="menu_cate-item">
                  <a href="">Danh mục 1</a>
                </li>
                <li className="menu_cate-item">
                  <a href="">Danh mục 2</a>
                </li>
                <li className="menu_cate-item">
                  <a href="">Danh mục 3</a>
                </li>
                <li className="menu_cate-item">
                  <a href="">Danh mục 4</a>
                </li>
                <li className="menu_cate-item">
                  <a href="">Danh mục 5</a>
                </li>
              </ul>
            </li>
            <li className="menu_item">
              <NavLink to="/category">Thương hiệu</NavLink>
            </li>

            <li className="menu_item">
              <NavLink to="/about">Giới thiệu</NavLink>
            </li>
            <li className="menu_item">
              <NavLink to="/contact">Liên hệ</NavLink>
            </li>
          </ul>
          <div className="nav_bottom-item">
            <NavLink to="/cart">
              Cart
              <i className="ri-shopping-cart-line"></i>
            </NavLink>
            <a className="" href="/">
              Info
              <i className="ri-user-line"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
