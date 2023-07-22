import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import { API_URL } from "../utils/constants";

const Tambah_Menu = () => {

  const history = useHistory();

  useEffect(() => {
    let username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      history.push('/login');
    }
  }, [history]);

  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({
    id: "",
    kode: "",
    nama: "",
    harga: 0,
    is_ready: false,
    gambar: "",
    category: {
      id: 0,
      nama: ""
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}products`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name.startsWith("category.")) {
      const categoryField = name.split(".")[1];
      setNewItem((prevItem) => ({
        ...prevItem,
        category: {
          ...prevItem.category,
          [categoryField]: value
        }
      }));
    } else {
      setNewItem((prevItem) => ({
        ...prevItem,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: checked
    }));
  };

  const handleAdd = async () => {
    try {
      await axios.post(`${API_URL}products`, newItem);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/admin" className="btn btn-primary mb-3">Back</Link>
      <h2 className="mb-3">Tambah Data</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="id" className="form-label">ID:</label>
            <input
              type="text"
              name="id"
              value={newItem.id}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="kode" className="form-label">Kode:</label>
            <input
              type="text"
              name="kode"
              value={newItem.kode}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">Nama:</label>
            <input
              type="text"
              name="nama"
              value={newItem.nama}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="harga" className="form-label">Harga:</label>
            <input
              type="number"
              name="harga"
              value={newItem.harga}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="is_ready"
                checked={newItem.is_ready}
                onChange={handleCheckboxChange}
                className="form-check-input"
              />
              <label htmlFor="is_ready" className="form-check-label">Tersedia</label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="gambar" className="form-label">Gambar:</label>
            <input
              type="text"
              name="gambar"
              value={newItem.gambar}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category.id" className="form-label">Kategori ID:</label>
            <input
              type="number"
              name="category.id"
              value={newItem.category.id}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category.nama" className="form-label">Kategori Nama:</label>
            <input
              type="text"
              name="category.nama"
              value={newItem.category.nama}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary me-2" onClick={handleAdd}>Tambah</button>
    </div>
  );
};

export default Tambah_Menu;
