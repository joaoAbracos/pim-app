import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductForm from "./ProductForm";

function CreateProduct() {
  return (
    <Container>
      <Row>
        <Col>
          <ProductForm />
        </Col>
      </Row>
    </Container>
  );
}

export default CreateProduct;
