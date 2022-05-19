import React, { useEffect, useState } from "react";
import AllGuests from "./AllGuests";
import "./App.css";
export const DeleteGuestContext = React.createContext();
export const ChangeAttendingContext = React.createContext();

const url = "http://dry-refuge-31407.herokuapp.com/guests/";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [allGuests, setAllGuests] = useState([]);

  useEffect(() => {
    getAllGuests();
  }, []);

  const getAllGuests = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setAllGuests(res));
  };

  const addGuest = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    })
      .then((res) => res.json())
      .then((res) => getAllGuests());
    setFirstName("");
    setLastName("");
  };

  const deleteGuest = (id) => {
    fetch(url + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((res) => getAllGuests());
  };

  const changeAttending = (id, attending) => {
    fetch(url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ attending: attending }),
    })
      .then((res) => res.json())
      .then((res) => getAllGuests());
  };

  return (
    <div className="container py-5" data-test-id="guest">
      {/* input data */}
      <div className="row">
        <div className="col-6 offset-3">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="First name"
            onInput={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Last name"
            onInput={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />
          <button className="btn btn-primary form-control" onClick={addGuest}>
            ADD
          </button>
        </div>
        {/* display data */}
        {allGuests && (
          <DeleteGuestContext.Provider value={deleteGuest}>
            <ChangeAttendingContext.Provider value={changeAttending}>
              <AllGuests guests={allGuests} />
            </ChangeAttendingContext.Provider>
          </DeleteGuestContext.Provider>
        )}
      </div>
    </div>
  );
}

export default App;
