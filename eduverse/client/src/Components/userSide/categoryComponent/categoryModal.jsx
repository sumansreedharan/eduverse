// // CategoryList.js
// import React from "react";

// function CategoryList({ categories }) {
//   return (
//     <div>
//       <h2>All Categories</h2>
//       <ul>
//         {categories.map((category) => (
//           <li key={category.id}>{category.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CategoryList;


import React from "react";
import "./categoryList.scss";

function CategoryList({ categories }) {
  return (
    <div className="category-list-container7">
      <h2 className="category-list-title7">All Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="category-list-item7">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;

