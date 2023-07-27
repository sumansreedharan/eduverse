
import React, { useState } from "react";
import { MDBModal, MDBModalBody, MDBModalHeader, MDBBtn } from "mdb-react-ui-kit";
import "./popUp.scss";



function EditProfilePopup({ isOpen, onClose,userDetails, onSaveProfile,}) {
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [mobile, setMobile] = useState(userDetails.mobile);
  const [image, setImage] = useState(userDetails.profileImage);
  

  const handleSave = () => {
    console.log(image);
    // Handle saving the updated profile details
    const updatedProfile = {
      userId: userDetails._id,
      name,
      email,
      mobile,
      profileImage:image,
    };

    // You can dispatch an action to update the user details using Redux or any other state management system
    // For example: dispatch(updateUserProfile(updatedProfile));
  
    // // Close the modal after saving
    onSaveProfile(updatedProfile);

      

  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   // Perform any necessary image handling logic
  //   setImage(file);
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // setImage(URL.createObjectURL(file)); // Use createObjectURL to set the profileImage state
    setImage(file);
  };

  return (
    <MDBModal show={isOpen} onHide={onClose} className="custom-modal">
      <MDBModalHeader>Edit Profile</MDBModalHeader>
      <MDBModalBody>
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="mobile" className="form-label">Mobile</label>
        <input
          type="tel"
          id="mobile"
          className="form-control"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <label htmlFor="image" className="form-label">Image</label>
        <input
          type="file"
          id="image"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
        />
      </MDBModalBody>
      <div className="modal-footer">
        <MDBBtn color="secondary" onClick={onClose}>
          Close
        </MDBBtn>
        <MDBBtn color="primary" onClick={handleSave}>
          Save Changes
        </MDBBtn>
      </div>
    </MDBModal>
  );
}

export default EditProfilePopup;

