import React, { useState } from "react";
import Modalui from "./Modalui";

const Seat = (props) => {
  const { id, bookDate, busId, isbooked } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <div>
        <div
          style={
            isbooked
              ? { backgroundColor: "rgb(247, 152, 152)", pointerEvents: "none" }
              : {}
          }
          className="seat-comp"
          onClick={() => setShow(true)}
        >
          <div
            style={
              isbooked
                ? {
                    backgroundColor: "rgb(247, 152, 152)",
                    pointerEvents: "none",
                  }
                : {}
            }
            className="pillow"
          ></div>
        </div>
      </div>
      {show ? (
        <Modalui
          seatNo={id}
          date={bookDate}
          show={show}
          setShow={setShow}
          busID={busId}
        />
      ) : null}
    </>
  );
};

export default Seat;
