import React, { useEffect, useState } from "react";
import Seat from "../Components/Seat";
import Sofa from "../Components/Sofa";
import axios from "axios";
import moment from "moment";
import { Button, Form } from "react-bootstrap";

const Reservation = () => {
  const [availableSeat, setAvailableSeat] = useState([]);
  const [bookSeats, setBookSeats] = useState([]);
  const [date, setDate] = useState("");
  const [busID, setBusID] = useState("");
  const [getDataFromBtnClick, setGetDataFromBtnClick] = useState("");

  function handleSearchBus() {
    setGetDataFromBtnClick(date);

    axios
      .post("https://bus-company.onrender.com/busSeat/searchBus", {
        date: date,
        bookSeats: bookSeats,
      })
      .then((result) => {
        setAvailableSeat(result.data.data.available);
        setDate(moment(result.data.data.date).format("YYYY-MM-DD"));
        setBusID(result.data.data.bus_id);
        setBookSeats(result.data.data.unavailable);
        localStorage.setItem("date", date);
        localStorage.setItem("busId", result.data.data.bus_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {}, [date, bookSeats]);

  return (
    <>
      {getDataFromBtnClick ? (
        <>
          <div className="title">
            <span className="instruction">
              Click on an Available seat to proceed with your transaction.
            </span>
          </div>

          <div className="body">
            <div className="lower-deck">
              <h3 className="header">Lower Deck</h3>
              <div className="lower-deck-container">
                <div className="main-seat-container">
                  <div className="double-seat">
                    {availableSeat.slice(0, 12).map((item, i) => {
                      return (
                        <div key={i}>
                          <Seat
                            id={item}
                            bookDate={date}
                            busId={busID}
                            isbooked={bookSeats?.includes(item)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {Array(7)
                    .fill()
                    .map(() => {
                      return <br />;
                    })}

                  <div className="single-seat">
                    {availableSeat.slice(12, 18).map((item, i) => {
                      return (
                        <Seat
                          id={item}
                          bookDate={date}
                          busId={busID}
                          isbooked={bookSeats?.includes(item)}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="last-container">
                  {availableSeat.slice(18, 20).map((item, i) => {
                    return (
                      <Sofa
                        id={item}
                        bookDate={date}
                        busId={busID}
                        isbooked={bookSeats?.includes(item)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="upper-deck">
            <h3 className="header">Upper Deck</h3>
            <div className="upper-deck-container">
              <div className="main-seat-container">
                {availableSeat.slice(20, 32).map((item, i) => {
                  return (
                    <Seat
                      id={item}
                      bookDate={date}
                      busId={busID}
                      isbooked={bookSeats?.includes(item)}
                    />
                  );
                })}
                {Array(7)
                  .fill()
                  .map(() => {
                    return <br />;
                  })}

                {availableSeat.slice(32, 38).map((item, i) => {
                  return (
                    <Seat
                      id={item}
                      bookDate={date}
                      busId={busID}
                      isbooked={bookSeats?.includes(item)}
                    />
                  );
                })}
              </div>
              <div className="last-container">
                {availableSeat.slice(38, 40).map((item, i) => {
                  return (
                    <Sofa
                      id={item}
                      bookDate={date}
                      busId={busID}
                      isbooked={bookSeats?.includes(item)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bus-reservation">
            <h1>Search your bus from here</h1>
            <div className="search-bus-wrapper">
              <Form className="d-flex">
                <Form.Control
                  type="date"
                  placeholder="Search the buses.."
                  className="me-2"
                  aria-label="Search"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <Button variant="outline-success" onClick={handleSearchBus}>
                  Search
                </Button>
              </Form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Reservation;
