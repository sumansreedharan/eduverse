
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
    const response = await axios.get("/admin/listUsers");
    setUsers(response.data);
  };

  // const toggleBlock = async (id) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     await axios.put(`/admin/blockUser/${id}`, null, config);
  //     setUsers((prevUsers) =>
  //       prevUsers.map((user) => {
  //         if (user._id === id) {
  //           return { ...user, blocked: !user.blocked };
  //         }
  //         return user;
  //       })
  //     );
  //   } catch (error) {
  //     console.log("Error toggling block", error);
  //   }
  // };

  const toggleBlock = async (id) => {
    try {
      await axios.put(`/admin/blockUser/${id}`, null);
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
      <div
        className="table-container"
        style={{ marginTop: "2em", backgroundColor: "#c7c7c7" }}
      >
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
