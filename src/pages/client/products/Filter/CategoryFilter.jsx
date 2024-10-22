import React from "react";
import "./CategoryFilter.scss";

const categories = [
  { id: 1, name: "Loại sp 1", count: 30, icon: "🍼" },
  { id: 2, name: "Loại sp 2", count: 35, icon: "👗" },
  { id: 3, name: "Loại sp 3", count: 42, icon: "🐕" },
];

const CategoryFilter = () => {
  return (
    <div className="category-filter">
      <h3 className="category-title">Category</h3>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id} className="category-item">
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            <span className="category-count">{category.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
