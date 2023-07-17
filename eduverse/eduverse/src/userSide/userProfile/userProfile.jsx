import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./userProfile.scss"; // Import the SCSS file
import { useEffect, useState } from "react";
import axios from "axios";
import ResponsiveAppBar from "../../header/navbar";
import EditProfilePopup from "./editUserPopUp";
import { useSelector, useDispatch } from "react-redux";
import { setLoginDetails } from "../../useRedux/userActions";
import { setLoggoedUser } from "../../useRedux/user";


function userProfile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const userDetails = useSelector(state => state.loggedUser.currentUser);
  const dispatch = useDispatch();
  

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };

  // const updateUserProfileInBackend = async (updatedProfile) => {
  //   console.log("revised", updatedProfile);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/updateUser",
  //       updatedProfile
  //     );
  //     console.log(response.data,"from backend");
  //     dispatch(setLoggoedUser(response.data.updatedUser));
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const updateUserProfileInBackend = async (updatedProfile) => {
    console.log("revised", updatedProfile);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/updateUser",
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "from backend");
      dispatch(setLoggoedUser(response.data.updatedUser));
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

  const handleSaveProfile = async (updatedProfile) => {
    try {
      const updatedUser = await updateUserProfileInBackend(updatedProfile);
      console.log("keri", updatedProfile);
      dispatch(setLoginDetails(updatedUser));

      handleCloseEditProfile();
    } catch (error) {
      console.log("Error:", error);
    }
  };


 


  return (
    <section className="vh-100 section-user-profile light-grey-bg">
      <ResponsiveAppBar role={"user"} />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "80px" }}
                    fluid
                  />
                  <MDBTypography tag="h5">{userDetails.name}</MDBTypography>
                  <MDBCardText>{userDetails.role}</MDBCardText>
                  <MDBBtn
                    outline
                    color="light"
                    className="mb-5"
                    onClick={handleEditProfile}
                  >
                    Edit profile
                  </MDBBtn>
                  {isEditProfileOpen && (
                    <EditProfilePopup
                      isOpen={isEditProfileOpen}
                      onClose={handleCloseEditProfile}
                      userDetails={userDetails}
                      onSaveProfile={handleSaveProfile}
                    />
                  )}
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Your details</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">E-mail</MDBTypography>
                        <MDBCardText className="text-muted">
                          <strong>{userDetails.email}</strong>
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          <strong>{userDetails.mobile}</strong>
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <MDBIcon fab icon="facebook me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="twitter me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="instagram me-3" size="lg" />
                      </a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default userProfile;
