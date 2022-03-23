import React, { useState } from "react";
import WeeklyView from "./../WeeklyView/WeeklyView";
import DailyView from "./../DailyView/DailyView";
import { Form, Button } from "react-bootstrap";
import "./MyHealth.css";

export default function MyHealth({ urlBase, people, setPeople }) {
  // creating use state for user
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [personId, setPersonId] = useState("");

  // function for setting the email
  const emailHandleChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    let person = people.filter((n) => n.email === event.target.value);
    setPersonId(person[0]._id);
  };

  // function for submitting the email
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
    fetch(urlBase + "/person/" + personId)
      .then((response) => response.json())
      .then((data) => setUser(data.person));
  };

  return (
    <div className="my-health-container">
      <h3 className="health-h3">My Health Page</h3>
      <Form onSubmit={handleSubmit} className="health-form">
        <div className="email">
          <Form.Control
            onChange={emailHandleChange}
            name="email"
            placeholder="Email"
          ></Form.Control>
        </div>
        <Button variant="primary" type="submit" className="btn-submit">
          Submit
        </Button>
      </Form>
      {user.length === 0 ? (
        <div></div>
      ) : (
        <div>
          <WeeklyView urlBase={urlBase} user={user} />
          <DailyView
            urlBase={urlBase}
            user={user}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}
