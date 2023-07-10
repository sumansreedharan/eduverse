// import React, { useState } from "react";
// import { MDBModal, MDBModalBody, MDBModalHeader, MDBBtn, MDBInput } from "mdb-react-ui-kit";
// import "./popUp.scss"

// function EditProfilePopup({ isOpen, onClose }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [image, setImage] = useState("");

//   const handleSave = () => {
//     // Handle saving the updated profile details
//     const updatedProfile = {
//       name,
//       email,
//       mobile,
//       image,
//     };

//     // You can dispatch an action to update the user details using Redux or any other state management system
//     // For example: dispatch(updateUserProfile(updatedProfile));

//     // Close the modal after saving
//     onClose(); 
//   };

  

//   return (
    
//       <MDBModal show={isOpen} onHide={onClose} className="custom-modal">
//       <MDBModalHeader>Edit Profile</MDBModalHeader>
//       <MDBModalBody>
//         <MDBInput
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <MDBInput
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <MDBInput
//           label="Mobile"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />
//         <MDBInput
//           label="Image URL"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//         />
//       </MDBModalBody>
//       <div className="modal-footer">
//         <MDBBtn color="secondary" onClick={onClose}>
//           Close
//         </MDBBtn>
//         <MDBBtn color="primary" onClick={handleSave}>
//           Save Changes
//         </MDBBtn>
//       </div>
//     </MDBModal>
    
//   );
// }

// export default EditProfilePopup;


import React, { useState } from "react";
import { MDBModal, MDBModalBody, MDBModalHeader, MDBBtn } from "mdb-react-ui-kit";
import "./popUp.scss";

function EditProfilePopup({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");

  const handleSave = () => {
    // Handle saving the updated profile details
    const updatedProfile = {
      name,
      email,
      mobile,
      image,
    };

    // You can dispatch an action to update the user details using Redux or any other state management system
    // For example: dispatch(updateUserProfile(updatedProfile));

    // Close the modal after saving
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Perform any necessary image handling logic
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

