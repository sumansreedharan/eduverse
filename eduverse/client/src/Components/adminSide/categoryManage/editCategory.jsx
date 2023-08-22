import React, { useState } from 'react';
import axios from '../../../Config/axios';
import './editCategory.scss';

const EditCategoryModal = ({ category, onClose, onUpdateCategory }) => {
  const [updatedName, setUpdatedName] = useState();

  // const handleUpdateCategory = async () => {
  //   try {
  //     const updatedCategory = { ...category, name: updatedName.toUpperCase() };
  //     const response = await axios.put(
  //       `/admin/editCategories/${category._id}`,
  //       updatedCategory,
  //     );
  //     onUpdateCategory(response.data);
  //     console.log(response.data,"cccccc");
  //   } catch (error) {
  //     console.error('Error updating category:', error);
  //   }
  // };

  const handleUpdateCategory = async () => {
    const updatedCategory = { ...category, name: updatedName.toUpperCase() };
  
    const response = await axios.put(
      `/admin/editCategories/${category._id}`,
      updatedCategory
    );
  
    onUpdateCategory(response.data);
  };
  

  return (
    <div className="edit-category-modal">
      <div className="modal-content">
        <h2>Edit Category</h2>
        <label htmlFor="categoryName">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleUpdateCategory}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
