import React from "react";
import "./Filter.scss";

const Filter = () => {
  return (
    <div className="filter-column">
      <h3>Filter Products</h3>
      <form>
        <div className="filter-option">
          <input
            type="radio"
            id="all"
            name="category"
            value="all"
            defaultChecked
          />
          <label htmlFor="all">All</label>
        </div>
        <div className="filter-option">
          <input
            type="radio"
            id="vegetables"
            name="category"
            value="vegetables"
          />
          <label htmlFor="vegetables">Vegetables</label>
        </div>
        <div className="filter-option">
          <input type="radio" id="fruits" name="category" value="fruits" />
          <label htmlFor="fruits">Fruits</label>
        </div>
        <div className="filter-option">
          <input type="radio" id="dairy" name="category" value="dairy" />
          <label htmlFor="dairy">Dairy Products</label>
        </div>
      </form>
    </div>
  );
};

export default Filter;
