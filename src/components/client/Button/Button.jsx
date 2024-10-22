import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./button.scss";

ButtonClt.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.string,
  isLoading: PropTypes.bool,
};
function ButtonClt({
  children = "Button",
  onClick,
  className,
  type = "button",
  to,
  icon,
  isLoading = false,
}) {
  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
        {icon && <i className={icon}></i>}
      </Link>
    );
  }

  return (
    <button
      disabled={isLoading}
      type={type}
      onClick={onClick}
      className={className}
    >
      {isLoading ? <span className={"spin"}></span> : children}
      {icon && <i className={icon}></i>}
    </button>
  );
}

export default ButtonClt;
