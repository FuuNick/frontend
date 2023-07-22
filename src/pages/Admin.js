import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/Admin.css";
import { API_URL } from "../utils/constants";

const Admin = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');

  useEffect(() => {
    let storedUsername = sessionStorage.getItem('username');
    if (storedUsername === '' || storedUsername === null) {
      history.push('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [history]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user');
      const userData = response.data;
      if (userData && userData.name) {
        setUsername(userData.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to={'/'} className="btn btn-primary">
          Home
        </Link>
        <Link to={'/login'} className="btn btn-danger logout-button">
          Logout
        </Link>
      </div>
      <h1 className="d-flex justify-content-center">Welcome Admin "{username}"</h1>
      <hr />
      <div className="d-flex justify-content-center">
        <div className="btn-group-vertical">
          <Link to="/edit-menu" className="btn btn-primary btn-lg mb-3 hover-effect">
            Edit Menu
          </Link>
          <Link to="/tambah-menu" className="btn btn-primary btn-lg mb-3 hover-effect">
            Tambah Menu
          </Link>
          <Link to="/list-pesanan" className="btn btn-primary btn-lg hover-effect">
            List Pesanan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
