import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import { numberWithCommas } from "../utils/utils";  
import { API_URL } from "../utils/constants";


const Edit_Menu = () => {
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState(null);

  const history = useHistory();

  useEffect(() => {
    let username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}products`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = (product) => {
    setEditedProduct(product);
  };

  const handleSaveProduct = async () => {
    try {
      await axios.put(`${API_URL}products/${editedProduct.id}`, editedProduct);
      setEditedProduct(null);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditedProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_URL}products/${productId}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/admin" className="btn btn-primary">Back</Link>
      <h1 className="mt-5">Edit Menu</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="card">
              <div className="card-body">
                {editedProduct && editedProduct.id === product.id ? (
                  <div>
                    <input
                      type="text"
                      name="nama"
                      value={editedProduct.nama}
                      onChange={handleInputChange}
                      className="form-control mb-2"
                    />
                    <input
                      type="number"
                      name="harga"
                      value={editedProduct.harga}
                      onChange={handleInputChange}
                      className="form-control mb-2"
                    />
                    <button
                      onClick={handleSaveProduct}
                      className="btn btn-primary me-2"
                    >
                      Selesai
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn btn-secondary"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="card-text">Nama: {product.nama}</p>
                    <p className="card-text">Harga: Rp {numberWithCommas(product.harga)}</p>
                    <div className="d-flex justify-content-end">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="btn btn-primary me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="btn btn-danger"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Edit_Menu;
