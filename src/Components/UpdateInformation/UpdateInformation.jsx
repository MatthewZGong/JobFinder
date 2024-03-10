import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const UPDATE_Information_ENDPOINT = `${BACKEND_URL}/UpdateUserInfo`;

function UpdateInformation() {
  const [userid, setuserid] = useState(localStorage.getItem('user_id') || null);
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [error, setError] = useState('');
//   const [sortby, setsortby] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setuserid(localStorage.getItem('user_id'));
    try {
      const response = await axios.put(UPDATE_Information_ENDPOINT, {
        params: {
        "_id": userid,
        "username": username,
        "email": email,
        }
       });
      console.log(response.data);
      console.log(userid);
      console.log(username);
      console.log(email);
      console.log('Information Updated Successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.log(userid);
      console.log(username);
      console.log(email);
      console.error('There was an error updating user information', error);
      setError(error.response?.data?.message || 'Failed to update user information. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">New username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">New email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Update Information</button>
      </form>
    </div>
  );
}

export default UpdateInformation;