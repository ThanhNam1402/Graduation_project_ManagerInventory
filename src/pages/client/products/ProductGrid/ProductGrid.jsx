import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.scss";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "12.99",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Product 2",
      price: "18.99",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "Product 3",
      price: "24.99",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 4,
      name: "Product 4",
      price: "9.99",
      image: "https://via.placeholder.com/200",
    },
    {
        id: 5,
        name: "Product 5",
        price: "9.99",
        image: "https://via.placeholder.com/200",
      },
  ];

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
