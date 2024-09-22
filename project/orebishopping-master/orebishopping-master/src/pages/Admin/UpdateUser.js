import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../components/service/ApiService';
import '../../style/UpdateUser.css';

function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    city: ''
  });

  useEffect(() => {
    fetchUserDataById(userId);
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserById(userId, token);
      console.log('API Response:', response);

      if (response && response.user) {
        const { name, email, role, city } = response.user;
        setUserData({ name, email, role, city });
      } else {
        console.error('User data is not available.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmDelete = window.confirm('Are you sure you want to update this user?');
      if (confirmDelete) {
        const token = localStorage.getItem('token');
        const res = await UserService.updateUser(userId, userData, token);
        console.log(res);
        navigate("/admin/manageUser");
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input type="text" name="role" value={userData.role} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={userData.city} onChange={handleInputChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;