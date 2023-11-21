// UsersList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userlist.css';

// UserCard component
const UserCard = ({ profilePic, username, userId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Make an API call to delete the user and their blogs
      await axios.delete(`https://zipthought-backend.onrender.com/users/${userId}`);

      // Call the onDelete function to update the UI
      onDelete(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='user-card'>
      <img src={profilePic} alt={`Profile of ${username}`} />
      <div>
        <h3>{username}</h3>
        <p>User ID: {userId}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

// UsersList component
function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user details from the backend when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://zipthought-backend.onrender.com/users/');
        
        // Filter out users with the role 'admin'
        const filteredUsers = response.data.filter(user => user.role === 'user');
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userIdToDelete) => {
    try {
      // Filter out the deleted user from the state
      const updatedUsers = users.filter(user => user.userId !== userIdToDelete);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating users after delete:', error);
    }
  };

  return (
    <div className='users-list'>
      <h1>Users List</h1>
      <div className='user-cards'>
        {users.map((user) => (
          <UserCard
            key={user.userId}
            profilePic={user.profilePic}
            username={`${user.firstName} ${user.lastName}`}
            userId={user.userId}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default UsersList;
