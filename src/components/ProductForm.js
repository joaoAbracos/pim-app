import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import uuid from "react-uuid";
import Products from "./Products";
function ProductForm(props) {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    age: "",
    file: "",
  });
  const saveProductSubmit = (event) => {
    // Submit new product to Local Storage
    event.preventDefault();

    if (
      product.name !== "" &&
      product.brand !== "" &&
      product.description !== "" &&
      product.age !== ""
    ) {
      var dataStorage = [];

      dataStorage = JSON.parse(localStorage.getItem("products")) || []; // Data current from storage
      const productWithId = { ...product, id: uuid() }; // product info
      console.log(productWithId);
      dataStorage.push(productWithId);

      dataStorage = JSON.stringify(dataStorage);
      localStorage.setItem("products", dataStorage); // set new DATA to Local Storage
      setProduct({ brand: "", name: "", description: "", age: "" });
    }
  };
  const editProducSubmit = (event) => {
    // Submit edit product to Local Storage
    event.preventDefault();
    if (
      product.name !== "" &&
      product.brand !== "" &&
      product.description !== "" &&
      product.age !== ""
    ) {
      var dataStorage = [];

      dataStorage = JSON.parse(localStorage.getItem("products")) || [];

      const dataOutOld = dataStorage.filter(
        (element) => element.id !== props.data
      ); // delete the old

      dataOutOld.push(product); // push the new updated data from the state hook

      const dataAllUpdated = JSON.stringify(dataOutOld);

      localStorage.setItem("products", dataAllUpdated);

      setProduct({ brand: "", name: "", description: "", age: "" });

      props.hide(); // close the Modal
    }
  };
  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    var dataStorage = [];
    dataStorage = JSON.parse(localStorage.getItem("products")) || [];
    const specificData = dataStorage.find((element) => {
      // find the correct data for edit to the inputs
      return element.id === props.data;
    });
    setProduct(specificData);
  }, [setProduct]);
  const imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      // localStorage["fileBase64"] = base64;
      // console.debug("file stored", base64);
      setProduct({ ...product,file: base64 });
    });
    setProduct({ brand: "", name: "", description: "", age: "",file:"" });
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <Form onSubmit={props.data ? editProducSubmit : saveProductSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Name"
            value={product?.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            name="brand"
            type="text"
            placeholder="Brand"
            value={product?.brand}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            as="textarea"
            rows={2}
            placeholder="Description"
            value={product?.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Select
          name="age"
          onChange={handleChange}
          aria-label="Default select example"
        >
          <option value="">Choose</option>
          <option value="baby">Baby</option>
          <option value="child">Child</option>
          <option value="teen">Teen</option>
          <option value="adult">Adult</option>
        </Form.Select>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="file"
            type="file"
            placeholder="Images"
            value={product?.file}
            onChange={imageUpload}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ProductForm;
