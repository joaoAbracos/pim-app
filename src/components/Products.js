import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Modal,
  Row,
  Table,
  Pagination,
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
  const [modalShow, setModalShow] = useState(false); // state use for Modal show or Hide
  const [reference, setReference] = useState(false); // reference id for the Modal wich to EDIT; EDIT MODAL prop
  const [inputpage, setInputpage] = useState(""); // state set for Data for search

  const [currentPage, setCurrentPage] = useState(1);// cuuretn page paginate
  const [searchMode,setSearchMode]= useState(false)
  
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
      setSearchMode(false)
      setLocalStorageToState();
    } else {
      const keyword = inputpage;
      // Will filter the data with value from inout search
      const filtered = contacts.filter((entry) =>
        Object.values(entry).some(
          (val) => typeof val === "string" && val.includes(keyword)
        )
      );
      setSearchMode(true)
      setContacts(filtered);
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

  const changePage = (e) => {

    setCurrentPage(e.target.id);
  };

  let items = [];
  let numberMax = Math.round(contacts.length / 2);
  for (let number = 1; number <= numberMax; number++) {
    items.push(
      <Pagination.Item
        id={number}
        key={number}
        active={number == currentPage}
        onClick={changePage}
      >
        {number}
      </Pagination.Item>
    );
  }
  function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

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
                <th>Name</th>
                <th>Brand</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {contacts && searchMode === false
                ? paginate(contacts, 2, currentPage).sort().map((val) => {
                    return (
                      <tr key={val.id}>
                        <td>{val.name}</td>
                        <td>{val.brand}</td>
                        <td>{val.age}</td>
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
                : contacts.sort().map((val) => {
                  return (
                    <tr key={val.id}>
                      <td>{val.name}</td>
                      <td>{val.brand}</td>
                      <td>{val.age}</td>
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
                })}
            </tbody>
          </Table>
          <Pagination>{items}</Pagination>
          
         
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
