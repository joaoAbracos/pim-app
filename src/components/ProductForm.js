import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

function ProductForm(props) {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    age: "",
    file: [],
  });
  const saveProductSubmit = (event) => {
    // Submit new product to Local Storage
    event.preventDefault();

    if (
      product.name !== "" &&
      product.brand !== "" &&
      product.description !== "" &&
      product.age !== ""&&
      !!product.file.length
    ) {
      var dataStorage = [];

      dataStorage = JSON.parse(localStorage.getItem("products")) || []; // Data current from storage
      const productWithId = { ...product, id: uuid() }; // product info
      
      dataStorage.push(productWithId);

      dataStorage = JSON.stringify(dataStorage);
      localStorage.setItem("products", dataStorage); // set new DATA to Local Storage
      setProduct({ brand: "", name: "", description: "", age: "", file: [] });
      navigate("/products");
    }
    
  };
  const editProducSubmit = (event) => {
    // Submit edit product to Local Storage
    event.preventDefault();
    
    if (
      product.name !== "" &&
      product.brand !== "" &&
      product.description !== "" &&
      product.age !== "" &&
      !!product.file.length
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
    if (props.data) {
      var dataStorage = [];
      dataStorage = JSON.parse(localStorage.getItem("products")) || [];
      const specificData = dataStorage.find((element) => {
        // find the correct data for edit to the inputs
        return element.id === props.data;
      });
      setProduct(specificData);
    }
  }, [setProduct]);
  const imageUpload = (e) => {
    // trasform img to string and store in Local Storage
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      setProduct({ ...product, file: [...product.file, base64] });
    });
    // setProduct({ brand: "", name: "", description: "", age: "", file: "" });
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const deleteImage = (e) => {
    //delete image from edit form
    const file = e.target.id; 
    const newproductState = product.file.filter( el => el !== file) //delete from state 
    //if returns [] there are no images 
    if(newproductState === []){
      return setProduct({ ...product,file: [] })
    }
    setProduct({ ...product,file: newproductState })
    
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
        <Form.Select
          value={product?.brand}
          name="brand"
          onChange={handleChange}
          aria-label="Default select example"
        >
          <option value="">Choose Brand</option>
          <option value="Dior">Dior</option>
          <option value="Chanel">Chanel</option>
          <option value="Calvin Klein">Calvin Klein</option>
        </Form.Select>
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
          value={product?.age}
          name="age"
          onChange={handleChange}
          aria-label="Default select example"
        >
          <option value="">Choose Age</option>
          <option value="baby">Baby</option>
          <option value="child">Child</option>
          <option value="teen">Teen</option>
          <option value="adult">Adult</option>
        </Form.Select>
        <Form.Group className="mt-3 mb-3">
          {product.file !== [] ? (
            <>
              {product?.file?.map((el) => {
                return (
                  <div key={el}>
                    <img src={el} width={40} height={40} />
                    <input
                      type="button"
                      value="Delete"
                      id={el}
                      onClick={deleteImage}
                    />
                  </div>
                );
              })}
            </>
          ) : ''} 
          {product.brand === "Dior" ? (
            <>
              <Form.Control
                name="file"
                type="file"
                placeholder="Images"
                onChange={imageUpload}
              />
              <Form.Control
                name="file"
                type="file"
                placeholder="Images"
                onChange={imageUpload}
              />
            </>
          ) : (
            <Form.Control
              name="file"
              type="file"
              placeholder="Images"
              onChange={imageUpload}
            />
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ProductForm;
