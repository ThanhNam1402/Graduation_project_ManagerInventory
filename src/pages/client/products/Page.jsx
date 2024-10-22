import ProductGrid from "./ProductGrid/ProductGrid";
import Filter from "./Filter/Filter";
import CategoryFilter from "./Filter/CategoryFilter";
import "./Products.scss";

function Products() {
  return (
    <div className="products-container">
      <div className="filter-column">
        {/* Gộp CategoryFilter và Filter vào cột bên trái */}
        <CategoryFilter />
        <Filter />
      </div>
      <div className="product-grid-column">
        <ProductGrid />
      </div>
    </div>
  );
}

export default Products;
