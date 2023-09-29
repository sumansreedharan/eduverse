// import React from "react";
// import "./categoryList.scss";

// function CategoryList({ categories }) {
//   return (
//     <div className="category-list-container7">
//       <h2 className="category-list-title7">All Categories</h2>
//       <ul>
//         {categories.map((category) => (
//           <li key={category.id} className="category-list-item7">
//             {category.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CategoryList;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./categoryList.scss";
// import CategoryCourses from "../categoryComponent/listByCategories"; // Import the CategoryCourses component

// function CategoryList({ categories }) {
//   const navigate = useNavigate();
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  

//   const handleCategoryClick = (categoryId) => {
//     setSelectedCategoryId(categoryId);
//   };

//   return (
//     <div className="category-list-container">
//       <h2 className="category-list-title">All Categories</h2>
//       <ul>
//         {categories.map((category) => (
//           <li
//             key={category._id}
//             className="category-list-item"
//             onClick={() => handleCategoryClick(category._id)}
//           >
//             {category.name}
//           </li>
//         ))}
//       </ul>
//       {selectedCategoryId && (
//         <CategoryCourses categoryId={selectedCategoryId} />
//       )}
//     </div>
//   );
// }

// export default CategoryList;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./categoryList.scss";

function CategoryList({ categories }) {
  const navigate = useNavigate(); // Get the navigate function from React Router
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryClick = (categoryId) => {
    console.log("categoryId",categoryId); // Log the categoryId to check if it's undefined
    setSelectedCategoryId(categoryId);
    navigate(`/user/listByCategory/${categoryId}`);
  };
  

  return (
    <div className="category-list-container">
      <h2 className="category-list-title">All Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category._id}
            className="category-list-item"
            onClick={() => handleCategoryClick(category._id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;

