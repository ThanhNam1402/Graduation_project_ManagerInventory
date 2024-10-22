import React from "react";
import "./ProductCard.scss";

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>

        <div className="product-price-add-cart">
          <p className="product-price">${price}</p>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
