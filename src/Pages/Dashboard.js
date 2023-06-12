import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ModalForEdit from "../Components/ModalForEdit";
import Swal from "sweetalert2";
import ModalViewTicket from "../Components/ModalViewTicket";
import moment from "moment";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [modelViewShow, setModelViewShow] = useState(false);
  const [seatno, setSeatno] = useState([]);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);

  const busId = localStorage.getItem("busId");
  const date = localStorage.getItem("date");

  function editItem(seatNo, editName, editEmail) {
    setShow(true);
    setSeatno(seatNo);
    setName(editName);
    setEmail(editEmail);
  }

  const deleteItem = (seatNo) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .post("https://bus-company.onrender.com/seat/deleteSeatDetails", {
            busId: busId,
            seatNumber: seatNo,
          })
          .then((response) => {
            Swal.fire("Deleted!", response.data.msg);
            viewStatus();
          })
          .catch((error) => {
            console.error("Error deleting resource:", error);
          });
      }
    });
  };

  function viewItem(seatNo, editName, editEmail) {
    setModelViewShow(true);
    setSeatno(seatNo);
    setName(editName);
    setEmail(editEmail);
    axios
      .post("https://bus-company.onrender.com/seat/viewSeatDetails", {
        busId: busId,
        seatNumber: seatNo,
      })
      .then((response) => {
        console.log("View request successful", response);
      })
      .catch((error) => {
        console.error("Error viewing resource:", error);
      });
  }

  const viewStatus = useCallback(async () => {
    await axios
      .post("https://bus-company.onrender.com/seat/viewStatus", {
        busId: busId,
        dateOfBooking: date,
      })
      .then((res) => {
        setItems(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [busId, date]);

  useEffect(() => {
    viewStatus();
  }, [viewStatus]);

  return (
    <>
      <div>
        <h1>MyBus Dashboard</h1>
        <div className="list-wrapper">
          <Table striped bordered hover variant="primary" size="xl">
            <thead>
              <tr>
                <th>seat_number</th>
                <th>date</th>
                <th>name</th>
                <th>email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((item, i) => (
                  <>
                    <tr key={i}>
                      <td>{item.seat_number}</td>
                      <td>{moment(date).format("DD-MM-YYYY")}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() =>
                            editItem(item.seat_number, item.name, item.email)
                          }
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => deleteItem(item.seat_number)}
                        >
                          Delete
                        </Button>{" "}
                        <Button
                          variant="primary"
                          onClick={() =>
                            viewItem(item.seat_number, item.name, item.email)
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <h5>No data found</h5>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {show ? (
        <ModalForEdit
          seatNo={seatno}
          editName={name}
          editEmail={email}
          show={show}
          setShow={setShow}
          busID={busId}
          viewStatus={viewStatus}
        />
      ) : null}

      {modelViewShow ? (
        <ModalViewTicket
          seatNo={seatno}
          editName={name}
          editEmail={email}
          modelViewShow={modelViewShow}
          setModelViewShow={setModelViewShow}
          viewStatus={viewStatus}
          date={date}
        />
      ) : null}
    </>
  );
};

export default Dashboard;
