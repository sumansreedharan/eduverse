
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from './categoryForm';
import ResponsiveAppBar from "../../header/navbar";
import EditCategoryModal from './editCategory';
import './categoryList.scss';

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [showEditModal,setShowEditModal] = useState(false)
  const [currentCategory,setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/getCategories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post('http://localhost:3001/admin/addCategories', newCategory);
      console.log('Response:', response.data); 
      setCategories((prevCategories) => [...prevCategories, response.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async(categoryId)=>{
    try {
      const response = await axios.delete(`http://localhost:3001/admin/deleteCategory/${categoryId}`)
      setCategories((prevCategories)=>[...prevCategories.filter((category)=>category._id !==categoryId)])
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  const handleEditCategory = (category) =>{
    setCurrentCategory(category);
    setShowEditModal(true)
  }

  const handleModalClose = ()=>{
    setShowEditModal(false)
  }

  return (
    <div>
      <ResponsiveAppBar role={"admin"} />
      <div className="category-list-page">
        <div className="box">
          <div className="category-form-container">
            <CategoryForm onCategoryAdded={handleAddCategory} />
          </div>

          <div className="category-list-container">
            <h2>Existing Categories</h2>
            <div className="category-scroll-container">
              <table className="category-table">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>
                        {/* Add edit and delete buttons here */}
                        {/* For example: */}
                        <button  onClick={() => handleEditCategory(category)}>Edit</button>
                        <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {showEditModal && (
        <EditCategoryModal
          category={currentCategory}
          onClose={handleModalClose}
          onUpdateCategory={(updatedCategory) => {
            setCategories((prevCategories) =>
              prevCategories.map((category) =>
                category._id === updatedCategory._id ? updatedCategory : category
              )
            );
            setShowEditModal(false);
          }}
        />
      )}
      </div>
    </div>
  );
};

export default CategoryListPage;



