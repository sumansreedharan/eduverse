import React, { useEffect, useState } from "react";
import axios from "../../../Config/axios";
import "./addCourse.scss";

const CourseUploadForm = ({ onCourseAdded, onCancel }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [courseType, setCourseType] = useState("");
  const [category, setCategory] = useState("");
  const [paid, setPaid] = useState(false);
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/mentor/getCategories");
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("error to get categories", error);
    }
  };

  const courseTypeOptions = [
    { value: false, label: "Free" },
    { value: true, label: "Paid" },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = async (event) => {
    console.log(paid);
    event.preventDefault();

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", courseName);
    formData.append("description", description);
    formData.append("courseType", courseType);
    formData.append("category", category);
    formData.append("paid", paid);
    formData.append("price", price);

    const response = await axios.post("/mentor/createCourse", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    onCourseAdded(response.data);
    setThumbnail(null);
    setCourseName("");
    setDescription("");
    setCourseType("");
    setCategory("");
    setPaid("");
    setPrice("");
  };

  return (
    <form className="course-upload-form" onSubmit={handleSubmit}>
      <h2>Upload Course</h2>
      <div className="form-group">
        <label htmlFor="thumbnail">Thumbnail Image:</label>
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          className="custom-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="courseType">Course Type:</label>
        <select
          id="courseType"
          value={paid}
          onChange={(e) => setPaid(e.target.value)}
        >
          {courseTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {paid === "true" && ( // Show the "amount" field only when paid is selected
        <div className="form-group">
          <label htmlFor="courseName">Amount</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      )}

      <div className="form-buttons">
        <button type="submit">Upload Course</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CourseUploadForm;
