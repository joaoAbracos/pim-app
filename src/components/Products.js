import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Modal,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import ProductForm from "./ProductForm";
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm data={props.id} hide={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function Products() {
  const [contacts, setContacts] = useState([]); // State use to fill the table
  const [modalShow, setModalShow] = React.useState(false); // state use for Modal show or Hide
  const [reference, setReference] = React.useState(false); // reference id for the Modal wich to EDIT; EDIT MODAL prop
  const [inputpage, setInputpage] = useState(""); // state set for Data for search
  const setLocalStorageToState = () => {
    // Sets the Data from Local Storage to a State that is used for table
    var dataStorage = [];
    dataStorage = JSON.parse(localStorage.getItem("products")) || [];
    setContacts(dataStorage);
  };

  const deleteContact = (e) => {
    //This fucntion deletes a object from Local Storage by the id
    var dataStorage = [];
    dataStorage = JSON.parse(localStorage.getItem("products")) || [];
    const idToRemove = e.target.value;
    // filter by the id
    const filteredContacts = dataStorage.filter(
      (item) => item.id !== idToRemove
    );
    const StringfilteredContacts = JSON.stringify(filteredContacts);
    localStorage.setItem("products", StringfilteredContacts);
    // Set the update data in table
    setLocalStorageToState();
  };
  const editContact = (e) => {
    const id = e.target.value;
    setReference(id);
    setModalShow(true);
  };
  const setUserAdd = (e) => {
    // SEARCH METHOD
    if (inputpage === "") {
      // if nothing is search will search All DATA
      setLocalStorageToState();
    } else {
      const keyword = inputpage;
      // Will filter the data with value from inout search
      const filtered = contacts.filter((entry) =>
        Object.values(entry).some(
          (val) => typeof val === "string" && val.includes(keyword)
        )
      );
      setContacts(filtered); // will set the data filter to the TABLE
      setInputpage(""); // reset the input
    }
  };
  function handleChange(evt) {
    const value = evt.target.value;
    setInputpage(value);
  }
  useEffect(() => {
    setLocalStorageToState();
  }, [setContacts]);

  
  return (
    <Container>
      <Row>
        <Col>
          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="search"
              className="me-2"
              value={inputpage}
              onChange={handleChange}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <Button variant="success" onClick={setUserAdd}>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {contacts
                ? contacts.map((val) => {
                    return (
                      <tr key={val.id}>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                        <td>
                          <Button value={val.id} onClick={deleteContact}>
                            Delete
                          </Button>
                        </td>
                        <td>
                          <Button value={val.id} onClick={editContact}>
                            Edit
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </Table>

        </Col>
      </Row>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setLocalStorageToState();
        }}
        id={reference} //id for the MODAL when editing
      />
    </Container>
  );
}

export default Products;
