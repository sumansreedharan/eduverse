
import React, { useState } from 'react';
import './categoryForm.scss';

const CategoryForm = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryName.trim()) {
      alert('Please fill in the category name.');
      return;
    }

    const newCategoryData = {
      name: categoryName,
    };

    onCategoryAdded(newCategoryData);
    setCategoryName('');
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h2>Course Category</h2>
      <div className="form-group">
        <label htmlFor="categoryName">Name</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default CategoryForm;


