
import React, { useState } from 'react';
import './editProfile.scss';

const EditProfileModal = ({ handleCloseModal,isOpen,onSaveProfile,userDetails }) => {
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [contact, setContact] = useState(userDetails.mobile);
  const [specialization,setSpecialization] = useState()
  const [image,setImage] = useState(userDetails.profileImage)
  // const [avatar, setAvatar] = useState('');

  const handleSaveChanges = () => {
    const updatedProfile = {
      userId:userDetails._id,
      name,
      email,
      contact,
      specialization,
      profileImage:image,
    }
    // handleCloseModal();
    onSaveProfile(updatedProfile)
  };

  // const handleAvatarChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setAvatar(reader.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file)); // Use createObjectURL to set the profileImage state
  };

  return (
    <div show={isOpen.toString()} onHide={handleCloseModal} className="edit-profile-modal">
      <div className="edit-profile-modal__content">
        <h2>Edit Profile</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Specialization</label>
            <input
              type="text"
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
          <div className="form-group">
          <label htmlFor="image" className="form-label">
          Profile Image
        </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
        </form>
        <div className="edit-profile-modal__actions">
          <button className="cancel-btn" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

