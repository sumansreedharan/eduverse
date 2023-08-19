import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './editCourseModal.scss';
import axios from '../../../Config/axios';

const EditCourseModal = ({ course, onClose, onSave }) => {
  const [editedCourse, setEditedCourse] = useState(course);
  const [categories, setCategories] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  // const handleSave = async () => {
  //   try {
  //     const response = await axios.put(`/mentor/editCourses/${editedCourse._id}`, editedCourse);
  //     onSave(response.data);
  //     console.log(response.data,"edited course");
  //     onClose();
  //   } catch (error) {
  //     console.error('Error updating course:', error);
  //   }
  // };

  const handleSave = async () => {
    try {
      let updatedCourseData = {
        title: editedCourse.title,
        description: editedCourse.description,
        type: editedCourse.type,
        // ...
        // Other fields you're editing
      };
  
      if (editedCourse.type === 'paid') {
        updatedCourseData = {
          ...updatedCourseData,
          paid: true,
          price: editedCourse.price,
        };
      } else {
        updatedCourseData = {
          ...updatedCourseData,
          paid: false,
          price: 0,
        };
      }
  
      const response = await axios.put(`/mentor/editCourses/${editedCourse._id}`, updatedCourseData);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
  
  

  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <h2>Edit Course</h2>
      <label>
        Course Name:
        <input
          type="text"
          name="title"
          value={editedCourse.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={editedCourse.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Course Type:
        <select
          name="type"
          value={editedCourse.type}
          onChange={handleInputChange}
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </label>
      {editedCourse.type === 'paid' && (
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={editedCourse.price}
            onChange={handleInputChange}
          />
        </label>
      )}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default EditCourseModal;
