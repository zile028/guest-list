import React, { useContext, useState } from "react";
import { ChangeAttendingContext, DeleteGuestContext } from "./App";

function Guset({ id, firstName, lastName, attending }) {
  const [att, setAttending] = useState(attending);
  const deleteGuset = useContext(DeleteGuestContext);
  const changeAttending = useContext(ChangeAttendingContext);

  return (
    <div className="col-6 offset-3 mt-3">
      <div className="row justify-content-between">
        <h2>
          {firstName} {lastName}
        </h2>

        <input
          type="checkbox"
          checked={att}
          onChange={() => {
            setAttending(!att);
            changeAttending(id, !att);
          }}
        />

        <button
          className="btn btn-warning"
          onClick={() => {
            deleteGuset(id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default Guset;
