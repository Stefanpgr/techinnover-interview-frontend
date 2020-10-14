import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";
import axios from "axios";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDOB] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [family, setFamily] = useState([""]);
  const [photograph, setPhoto] = useState("");
  const [error, setError] = useState({});

  const handleFormChange = useCallback(async (e) => {
    let age = moment().diff(moment(dateOfBirth, "YYYYMMDD"), "years");
    let file = Array.from(e.target.files);
    let formdata = new FormData();
    file.map((_file, index) => formdata.append(index, _file));

    let payload = {
      name: "olohundare nasiruden",
      email: "admin@gmail.com",
      age: 18,
      dateOfBirth: "2018",
      family: [
        {
          name: "Olohundare kolawole",
          relationship: "father",
          age: 51,
        },
        {
          name: "Olohundare zainab",
          relationship: "sister",
          age: 21,
        },
      ],
    };

    const options = {
      url: `http://localhost:5000/user/create`,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      method: "POST",
      data: payload,
    };

    try {
      const res = await axios.request(options);
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
              <input
                type="file"
                name="photograph"
                className="form-control"
                onChange={handleFormChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
