import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Container>
          <div className="text-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="4x"
              color="#28a745"
              className="mb-4"
            />
            <h2 className="mb-4">Order Successful!</h2>
            <p>Thank you for your order. We will process it soon.</p>
            <Button variant="primary" as={Link} to="/" className="mt-4">
              Back to Menu
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}
