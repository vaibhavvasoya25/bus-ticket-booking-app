import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";

const AllocateSeat = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalSeat, setTotalSeat] = useState("");
  const [lists, setLists] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPage, setRowPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();

  const handleAllocateBus = async () => {
    await axios
      .post("https://bus-company.onrender.com/busSeat/createBusSeat", {
        startDate: startDate,
        endDate: endDate,
        totalSeat: parseInt(totalSeat),
      })
      .then((result) => {
        console.log(result);
        toast.success(result.data.msg);
        navigate("/reservation");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (value) => {
    if (currentPage !== value) {
      setCurrentPage(value);
    }
  };
  const handlePerRowsChange = async (newPerPage) => {
    setItemsPerPage(newPerPage);
  };

  const columns = [
    {
      name: "bus_id",
      cell: (row) => row.bus_id,
    },
    {
      name: "date",
      cell: (row) => moment(row.date).format("DD-MM-YYYY"),
    },
    {
      name: "day",
      cell: (row) => row.day,
    },
    {
      name: "total_seat",
      cell: (row) => row.total_seat,
    },
    {
      name: "booked_seat",
      cell: (row) => row.booked_seat,
    },
  ];

  const listBus = useCallback(async () => {
    await axios
      .post("https://bus-company.onrender.com/busSeat/busList", {
        page: currentPage,
        per_page: itemsPerPage,
      })
      .then((result) => {
        setTotalPage(result.data.total_page);
        setRowPage(result.data.busList.length);
        setLists(result.data.busList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    listBus();
  }, [listBus]);

  return (
    <div className="bus-allocation">
      <h1>Allocate Seat from here</h1>
      <div className="allocate-seat-wrapper">
        <Form>
          <Form.Group className="mb-3 d-flex">
            <Form.Control
              type="date"
              className="me-2"
              aria-label="Search"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex">
            <Form.Control
              type="date"
              className="me-2"
              aria-label="Search"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex">
            <Form.Control
              type="number"
              className="me-2"
              aria-label="Search"
              value={totalSeat}
              placeholder="Total Seat"
              onChange={(e) => setTotalSeat(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button variant="success" onClick={() => handleAllocateBus()}>
          Submit
        </Button>
        <div className="pagination-wrapper"></div>
      </div>

      <div className="list-wrapper">
        <hr />
        <DataTable
          title="Bus List"
          columns={columns}
          data={lists}
          pagination
          paginationServer
          paginationTotalRows={rowPage}
          paginationPerPage={totalPage}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationComponentOptions={{
            rowsPerPage: false,
          }}
          onChangePage={handlePageChange}
        />
        <div>Current Page: {currentPage}</div>
      </div>
    </div>
  );
};

export default AllocateSeat;
