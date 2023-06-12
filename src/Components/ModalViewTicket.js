import moment from "moment";
import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalViewTicket = ({
  date,
  modelViewShow,
  setModelViewShow,
  seatNo,
  editName,
  editEmail,
}) => {
  return (
    <div>
      <Modal className="modal" show={modelViewShow}>
        <Form>
          <Modal.Header closeButton onClick={() => setModelViewShow(false)}>
            <Modal.Title>Seat no: {seatNo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name : {editName}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email : {editEmail}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Date : {moment(date).format("DD-MM-YYYY")}
              </Form.Label>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModelViewShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalViewTicket;
