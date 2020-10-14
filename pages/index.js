import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDOB] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [family, setFamily] = useState([""]);
  const [photograph, setPhoto] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    let age = moment().diff(moment(dateOfBirth, "YYYYMMDD"), "years");
    console.log(age);
  });

  const handleFormChange = useCallback((e) => {
    let age = moment().diff(moment(dateOfBirth, "YYYYMMDD"), "years");
    if (dateOfBirth !== new Date().toISOString().substring(0, 10) && age < 18) {
      setError({ message: "Age is less than 18" });
    }
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {Object.keys(error).length !== 0 && (
            <div className="alert alert-primary">{error.message}</div>
          )}
          <form onChange={handleFormChange}>
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address*</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth*</label>
              <br></br>
              <input
                type="date"
                onChange={(event) => setDOB(event.target.value)}
                max={new Date().toISOString().substring(0, 10)}
                className="form-control form-control-sm"
              />
            </div>
            <div className="form-group">
              <label>Photograph*</label>
              <input type="file" name="photograph" className="form-control" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
