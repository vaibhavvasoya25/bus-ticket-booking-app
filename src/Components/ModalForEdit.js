import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalForEdit = ({
  busID,
  show,
  setShow,
  seatNo,
  editName,
  editEmail,
  viewStatus,
}) => {
  const [newName, setNewName] = useState(editName);
  const [newEmail, setNewEmail] = useState(editEmail);

  function handleEditItem() {
    const result = axios
      .post("https://bus-company.onrender.com/seat/editSeatDetails", {
        busId: busID,
        seatNumber: seatNo,
        name: newName,
        email: newEmail,
      })
      .then((response) => {
        console.log("Update request successful", response);
        toast.success(response.data.msg);
        viewStatus();
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
      });

    if (result) {
      setShow(false);
    } else {
      console.log("error");
    }
  }

  return (
    <div>
      <Modal className="modal" show={show}>
        <Form>
          <Modal.Header closeButton onClick={() => setShow(false)}>
            <Modal.Title>Edit the datails</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Seat no</Form.Label>
              <Form.Control
                value={seatNo}
                type="number"
                placeholder="Seat no:"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button
              variant="secondary"
              type="submit"
              onClick={(e) => handleEditItem(e)}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalForEdit;
