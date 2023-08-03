
import React, { useState, useEffect } from "react";
import axios from "../../../Config/axios";
import ResponsiveAppBar from "../../header/navbar";
import "./userManage.scss";

const UserList = () => {
  const [users, setUsers] = useState([]);

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

  // const toggleBlock = async (id) => {
  //   try {
  //     await axios.put(`http://localhost:3001/admin/blockUser/${id}`);
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
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/admin/blockUser/${id}`,null,config
     );
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
      <div>
        <h2>User Details</h2>
        <p>Name: {user.name}</p>
        <p>Blocked: {user.blocked ? "Yes" : "No"}</p>
      </div>
    );
  };

  return (
    <div className="table-max">
      <ResponsiveAppBar role={"admin"} />
      <br />
      <h1 className="user-management">User management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user._id}>
              <tr>
                <td>
                  <strong>{user.name}</strong>
                </td>
                <td>
                  <strong
                    style={{
                      color: user.blocked ? "red" : "#32CD32",
                    }}
                  >
                    {user.blocked ? "Blocked" : "Active"}
                  </strong>
                </td>
                <td>
                  <button
                    onClick={() => toggleBlock(user._id)}
                    style={{
                      backgroundColor: user.blocked ? "#32cd32" : "	#DC143C",
                      borderRadius: "4px",
                    }}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => console.log("View details", user._id)}
                    style={{ backgroundColor: "#71797E", borderRadius: "4px" }}
                  >
                    Details
                  </button>
                </td>
              </tr>
              <tr className="line-row">
                <td colSpan="4" className="line-cell"></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;


