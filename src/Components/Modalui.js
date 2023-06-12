import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Modalui = ({ seatNo, date, show, setShow, busID }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  console.log("seatNo :", seatNo);

  async function handleSeatBooked(e) {
    e.preventDefault();
    const result = await axios.post(
      "https://bus-company.onrender.com/seat/bookSeat",
      {
        busId: busID,
        name: name,
        email: email,
        seatNumber: seatNo,
        dateOfBooking: date,
      }
    );

    if (result) {
      setShow(false);
      toast.success(result.data.msg);
      navigate("/");
    } else {
      console.log("error");
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSeatBooked(e);
    }
  }

  return (
    <div>
      <Modal className="modal" show={show}>
        <Form onSubmit={(e) => handleSeatBooked(e)}>
          <Modal.Header closeButton onClick={() => setShow(false)}>
            <Modal.Title>Fill the datails</Modal.Title>
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
                value={name}
                onKeyDown={handleKeyPress}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your name with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onKeyDown={handleKeyPress}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control value={date} type="text" disabled />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Modalui;
