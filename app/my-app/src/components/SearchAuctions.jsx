import React from 'react';

import './SearchAuctions.css'

function CategoryFilter({ categories, selectedCategory, onSelectCategory, onClearCategory }) {
  return (
    <div className="category-filter">
      <span>Filter by Category: </span>
      <div className="buttonsContainer">
        <button
          className={`${!selectedCategory ? 'selected' : ''} category-button`}
          onClick={() => onClearCategory()}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`${ category === selectedCategory ? 'selected' : ''} category-button`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
