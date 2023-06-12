import React, { useState } from "react";
import Modalui from "./Modalui";

const Sofa = (props) => {
  const { id, bookDate, busId, isbooked } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        style={
          isbooked
            ? { backgroundColor: "rgb(247, 152, 152)", pointerEvents: "none" }
            : {}
        }
        className="sofa-comp"
        onClick={() => setShow(true)}
      >
        <div
          style={
            isbooked
              ? { backgroundColor: "rgb(247, 152, 152)", pointerEvents: "none" }
              : {}
          }
          className="sofa-pillow"
        ></div>
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

export default Sofa;
