import { NavLink } from "react-router-dom";
import "./topbar.scss";

function Topbar() {
  return (
    <div className="top">
      <div className="top_content">
        <div className="">
          <p>Follow us on : facebook</p>
        </div>
        <div className="top_right">
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
  );
}

export default Topbar;
