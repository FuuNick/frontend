import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import { numberWithCommas } from "../utils/utils";
import { API_URL } from "../utils/constants";

const ListPesanan = () => {

  const history = useHistory();

  useEffect(() => {
    let username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      history.push('/login');
    }
  }, [history]);

  const [pesanans, setPesanans] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/pesanans`);
      setPesanans(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePesananSelesai = async (pesananId) => {
    try {
      await axios.delete(`${API_URL}/pesanans/${pesananId}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/admin" className="btn btn-primary">Back</Link>
      <h1 className="mt-5">List Pesanan</h1>
      {pesanans.map((pesanan) => (
        <div key={pesanan.id} className="card my-3">
          <div className="card-body">
            <h3 className="card-title">ID Pesanan: {pesanan.id}</h3>
            <p className="card-text">Total Bayar: Rp {numberWithCommas(pesanan.total_bayar)}</p>
            <h4 className="card-title">Menu:</h4>
            {pesanan.menus.map((menu) => (
              <div key={menu.id} className="border p-3 my-2">
                <p>Nama: {menu.product.nama}</p>
                <p>Jumlah: {menu.jumlah}</p>
                <p>Total Harga: Rp {numberWithCommas(menu.total_harga)}</p>
              </div>
            ))}
            <button
              className="btn btn-danger"
              onClick={() => handlePesananSelesai(pesanan.id)}
            >
              Pesanan Selesai
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPesanan;
