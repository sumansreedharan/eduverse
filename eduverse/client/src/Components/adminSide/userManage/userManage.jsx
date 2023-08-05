// import React, { useState, useEffect } from "react";
// import axios from "../../../Config/axios";
// import ResponsiveAppBar from "../../header/navbar";
// import "./userManage.scss";

// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("/admin/listUsers");
//       setUsers(response.data);
//     } catch (error) {
//       console.log("Error fetching users", error);
//     }
//   };

//   // const toggleBlock = async (id) => {
//   //   try {
//   //     await axios.put(`http://localhost:3001/admin/blockUser/${id}`);
//   //     setUsers((prevUsers) =>
//   //       prevUsers.map((user) => {
//   //         if (user._id === id) {
//   //           return { ...user, blocked: !user.blocked };
//   //         }
//   //         return user;
//   //       })
//   //     );
//   //   } catch (error) {
//   //     console.log("Error toggling block", error);
//   //   }
//   // };

//   const toggleBlock = async (id) => {
//     try {
//       const token = localStorage.getItem("token")
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       await axios.put(`/admin/blockUser/${id}`,null,config
//      );
//       setUsers((prevUsers) =>
//         prevUsers.map((user) => {
//           if (user._id === id) {
//             return { ...user, blocked: !user.blocked };
//           }
//           return user;
//         })
//       );
//     } catch (error) {
//       console.log("Error toggling block", error);
//     }
//   };

//   const UserDetails = ({ user }) => {
//     return (
//       <div>
//         <h2>User Details</h2>
//         <p>Name: {user.name}</p>
//         <p>Blocked: {user.blocked ? "Yes" : "No"}</p>
//       </div>
//     );
//   };

//   return (
//     <div className="table-max">
//       <ResponsiveAppBar role={"admin"}  />
//       <br />
//       <h1 className="user-management">User management</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Status</th>
//             <th>Actions</th>
//             <th>Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <React.Fragment key={user._id}>
//               <tr>
//                 <td>
//                   <strong>{user.name}</strong>
//                 </td>
//                 <td>
//                   <strong
//                     style={{
//                       color: user.blocked ? "red" : "#32CD32",
//                     }}
//                   >
//                     {user.blocked ? "Blocked" : "Active"}
//                   </strong>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => toggleBlock(user._id)}
//                     style={{
//                       backgroundColor: user.blocked ? "#32cd32" : "	#DC143C",
//                       borderRadius: "4px",
//                     }}
//                   >
//                     {user.blocked ? "Unblock" : "Block"}
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => console.log("View details", user._id)}
//                     style={{ backgroundColor: "#71797E", borderRadius: "4px" }}
//                   >
//                     Details
//                   </button>
//                 </td>
//               </tr>
//               <tr className="line-row">
//                 <td colSpan="4" className="line-cell"></td>
//               </tr>
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;

// import React, { useState, useEffect } from "react";
// import axios from "../../../Config/axios";
// import ResponsiveAppBar from "../../header/navbar";
// import "./userManage.scss";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 7; // You can adjust this number based on your preference

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("/admin/listUsers");
//       setUsers(response.data);
//     } catch (error) {
//       console.log("Error fetching users", error);
//     }
//   };

//   const toggleBlock = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       await axios.put(`/admin/blockUser/${id}`, null, config);
//       setUsers((prevUsers) =>
//         prevUsers.map((user) => {
//           if (user._id === id) {
//             return { ...user, blocked: !user.blocked };
//           }
//           return user;
//         })
//       );
//     } catch (error) {
//       console.log("Error toggling block", error);
//     }
//   };

//   const UserDetails = ({ user }) => {
//     return (
//       <div>
//         <h2>User Details</h2>
//         <p>Name: {user.name}</p>
//         <p>Blocked: {user.blocked ? "Yes" : "No"}</p>
//       </div>
//     );
//   };

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(users.length / usersPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="table-max">
//       <ResponsiveAppBar role={"admin"} />
//       <br />
//       <h1 className="user-management">User management</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Status</th>
//             <th>Actions</th>
//             <th>Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentUsers.map((user) => (
//             <React.Fragment key={user._id}>
//               <tr>
//                 <td>
//                   <strong>{user.name}</strong>
//                 </td>
//                 <td>
//                   <strong
//                     style={{
//                       color: user.blocked ? "red" : "#32CD32",
//                     }}
//                   >
//                     {user.blocked ? "Blocked" : "Active"}
//                   </strong>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => toggleBlock(user._id)}
//                     style={{
//                       backgroundColor: user.blocked ? "#32cd32" : "	#DC143C",
//                       borderRadius: "4px",
//                     }}
//                   >
//                     {user.blocked ? "Unblock" : "Block"}
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => console.log("View details", user._id)}
//                     style={{ backgroundColor: "#71797E", borderRadius: "4px" }}
//                   >
//                     Details
//                   </button>
//                 </td>
//               </tr>
//               <tr className="line-row">
//                 <td colSpan="4" className="line-cell"></td>
//               </tr>
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
//           <button
//             key={pageNumber}
//             onClick={() => handlePageChange(pageNumber)}
//             className={currentPage === pageNumber ? "active" : ""}
//           >
//             {pageNumber}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserList;

// UserList.js
import React, { useState, useEffect } from "react";
import axios from "../../../Config/axios";
import ResponsiveAppBar from "../../header/navbar";
import "./userManage.scss";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/listUsers");
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  const toggleBlock = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/admin/blockUser/${id}`, null, config);
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === id) {
            return { ...user, blocked: !user.blocked };
          }
          return user;
        })
      );
    } catch (error) {
      console.log("Error toggling block", error);
    }
  };

  const UserDetails = ({ user }) => {
    return (
      <div className="user-list details-container">
        <h2>User Details</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Status: {user.blocked ? "Blocked" : "Active"}</p>
      </div>
    );
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-list">
      <ResponsiveAppBar role={"admin"} />
      <div className="table-container" style={{marginTop:'2em',backgroundColor:'#c7c7c7'}}>
        <h1 className="user-management">User Management</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <React.Fragment key={user._id}>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className={user.blocked ? "blocked" : "active"}>
                    {user.blocked ? "Blocked" : "Active"}
                  </td>
                  <td>
                    <button
                      onClick={() => toggleBlock(user._id)}
                      style={{
                        backgroundColor: user.blocked ? "#FF2E2E" : "#32cd32",
                        borderRadius: "4px",
                      }}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => console.log("View details", user._id)}
                      className="details-button"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? "active" : ""}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
