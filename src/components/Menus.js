import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)} style={{ backgroundColor: '#f4f4f4' }}>
        <Card.Img
          style={{ cursor: "pointer" }}
          variant="top"
        />
        <Card.Body style={ { cursor: "pointer" } }>
          <Card.Title>{menu.nama}</Card.Title>
          <Card.Text>Rp {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
