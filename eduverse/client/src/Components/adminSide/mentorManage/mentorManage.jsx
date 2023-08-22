import React, { useState, useEffect } from "react";
import axios from "../../../Config/axios";
import ResponsiveAppBar from "../../header/navbar";
import "./mentorList.scss";

const MentorList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    const response = await axios.get("/admin/listMentors");
    setMentors(response.data);
  };

  const toggleBlock = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/admin/blockMentor/${id}`, null, config);
      setMentors((prevMentors) =>
        prevMentors.map((mentor) => {
          if (mentor._id === id) {
            return { ...mentor, blocked: !mentor.blocked };
          }
          return mentor;
        })
      );
    } catch (error) {
      console.log("Error toggling block", error);
    }
  };

  const MentorDetails = ({ mentor }) => {
    return (
      <div>
        <h2>User Details</h2>
        <p>Name: {mentor.name}</p>
        <p>Blocked: {mentor.blocked ? "Yes" : "No"}</p>
      </div>
    );
  };

  return (
    <div>
      <ResponsiveAppBar role={"admin"} />
      <div
        className="table-container"
        style={{ marginTop: "2em", backgroundColor: "#c7c7c7" }}
      >
        <br />
        <h1 className="user-management">MENTOR MANAGEMENT</h1>
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
            {mentors.map((mentor) => (
              <React.Fragment key={mentor._id}>
                <tr>
                  <td>
                    <strong>{mentor.name}</strong>
                  </td>
                  <td>
                    <strong>{mentor.blocked ? "Blocked" : "Active"}</strong>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleBlock(mentor._id)}
                      style={{
                        backgroundColor: mentor.blocked ? "#FF2E2E" : "#32cd32",
                        borderRadius: "4px",
                      }}
                    >
                      {mentor.blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => console.log("View details", mentor._id)}
                      style={{
                        backgroundColor: "#71797E",
                        borderRadius: "4px",
                      }}
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
    </div>
  );
};

export default MentorList;
