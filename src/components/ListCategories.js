import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import "../style/ListCategories.css";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <i className="fas fa-utensils mr-2"></i>;
  if (nama === "Minuman")
    return <i className="fas fa-glass-martini mr-2"></i>;
  if (nama === "Cemilan")
    return <i className="fas fa-cookie-bite mr-2"></i>;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md={3} className="mt-3">
        <div className="centered-text">
          <h4>
            <strong>CATEGORY</strong>
          </h4>
        </div>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={categoriYangDipilih === category.nama ? "category-aktif" : ""}
                style={{ cursor: "pointer" }}
              >
                <h5>
                  <Icon nama={category.nama} />
                  {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
