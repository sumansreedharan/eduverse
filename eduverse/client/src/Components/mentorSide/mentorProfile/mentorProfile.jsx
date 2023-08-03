import React, { useState } from "react";
import "./mentorProfile.scss";
import EditProfileModal from "./editProfile";
import ResponsiveAppBar from "../../header/navbar";
import { useSelector, useDispatch } from "react-redux";
import { setLoginDetails } from "../../useRedux/userActions";
import { setLoggoedUser } from "../../useRedux/user";
import axios from "../../../Config/axios";

const MentorProfilePage = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const userDetails = useSelector((state) => state.loggedUser.currentUser);
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditProfileOpen(false);
  };

  const updateMentorProfileServer = async (updatedProfile) => {
    try {
      console.log("mentor side entered");
      const response = await axios.post(
        "/mentor/updateMentor",
        updatedProfile
      );
      dispatch(setLoggoedUser(response.data.updatedUser));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
      const updatedUser = await updateMentorProfileServer(updatedProfile);
      console.log("mentor side", updatedProfile);
      dispatch(setLoginDetails(updatedUser));
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mentor-profile">
      <ResponsiveAppBar role={"mentor"} />
      <br />
      <div className="mentor-profile__content">
        <div className="mentor-profile__avatar">
          <img
            src={userDetails.profileImage}
            alt="Mentor Avatar"
            className="avatar-image"
            style={{ width: "150px", height: "150px" }}
          />
        </div>

        <div className="mentor-profile__info">
          <h2>{userDetails.name}</h2>
          <p>Specialty: Web Development</p>
          <p>Role:{userDetails.role}</p>
          <p>Contact:{userDetails.mobile}</p>
          <p>Email:{userDetails.email}</p>
          {/* Add more mentor information */}
        </div>
        <div className="mentor-profile__description">
          <h3>About Me</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      </div>
      {isEditProfileOpen && (
        <EditProfileModal
          isOpen={isEditProfileOpen}
          handleCloseModal={handleCloseModal}
          userDetails={userDetails}
          onSaveProfile={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default MentorProfilePage;
