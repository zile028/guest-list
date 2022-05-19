import React from "react";
import Guset from "./Guset";

function AllGuests({ guests }) {
  let allGuests = guests.map((guest, index) => {
    return (
      <Guset
        firstName={guest.firstName}
        lastName={guest.lastName}
        attending={guest.attending}
        id={guest.id}
        key={index}
      />
    );
  });
  return allGuests;
}

export default AllGuests;
