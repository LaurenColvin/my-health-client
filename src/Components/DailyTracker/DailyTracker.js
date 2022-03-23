import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "./DailyTracker.css";


const DailyTracker = ({ urlBase, people, setPeople }) => {

  ////////////////// EMAIL VERIFICATION AND ALERT MODAL IF ALREADY IN USE //////////////////

const [errorShow, setErrorShow] = useState(false);
const [submitShow, setSubmitShow] = useState(false);

const handleErrorClose = () => {
  setErrorShow(false);
  emptyForm();
};
const handleErrorShow = () => setErrorShow(true);
const handleSubmitShow = () => setSubmitShow(true);
const handleSubmitClose = () => setSubmitShow(false);

const emptyForm = (event) => {
  setEmail("");
  setExercise("");
  setLength("");
  setDate("");
};

  ////////////////// USE STATE FOR FORM INPUT /////////////////////

  const [personLength, setPersonLength] = useState(0);
  const [email, setEmail] = useState("");
  const [personId, setPersonId] = useState("");
  const [date, setDate] = useState("");
  const [exercise, setExercise] = useState("");
  const [length, setLength] = useState("");
  const [intensity, setIntensity] = useState("");
  const [allActivities, setAllActivities] = useState([]);

  const dateHandleChange = (event) => {
    event.preventDefault();
    setDate(event.target.value);
  };

  const activityHandleChange = (event) => {
    event.preventDefault();
    setExercise(event.target.value);
  };

  const lengthHandleChange = (event) => {
    event.preventDefault();
    setLength(event.target.value);
  };

  const intensityHandleChange = (event) => {
    event.preventDefault();
    setIntensity(event.target.value);
  };


    ////////////////// CHECK EMAIL FOR PUT METHOD /////////////////////


  const emailHandleChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    let person = people.filter((n) => n.email === event.target.value);
    setPersonLength(person.length);
    setPersonId(person[0]._id);
    fetch(urlBase + "/person/" + person[0]._id)
      .then((response) => response.json())
      .then((data) => setAllActivities(data.person.activity));
  };

  const putActivity = (activity) => {
    const activitiesCopy = [...allActivities];
    activitiesCopy.push(activity);
    let data = {
      activity: activitiesCopy,
    };
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(urlBase + "/person/" + personId, options)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (personLength === 0) {
      handleErrorShow();
    } else {
      handleSubmitShow();
      let data = {
        date: date,
        exercise: exercise,
        length: length,
        intensity: intensity,
      };
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(`${urlBase}/person/${personId}`)
        .then((res) => res.json())
        .then((data) => setAllActivities(data.activity));
      fetch(`${urlBase}/activity`, options)
        .then((res) => res.json())
        .then((data) => putActivity(data.activity))
        .then(() => setEmail(""))
        .then(() => setExercise(""))
        .then(() => setDate(""))
        .then(() => setLength(""))
    }
  };


  ////////////////// HTML FOR FORM AND MODAL //////////////////


  return (
    <div className="daily-tracker-body">
      <h2 className="daily-h2"> Welcome to the Daily Tracker</h2>
      <p className="tagline">
        Please input your email and the date to track your activity today!
      </p>

      <div className="tracker-form">
        <Form
          className="rounded p-4 p-sm-5 daily-form"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <h5 className="label" >Email</h5>
            </Form.Label>
            <Form.Control
              onChange={emailHandleChange}
              name="email"
              placeholder="Email"
              value={email}
              className="py-3 daily-tracker-form"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>
              <h5 className="label">Date</h5>
            </Form.Label>
            <Form.Control
              onChange={dateHandleChange}
              name="date"
              placeholder="Date"
              value={date}
              className="py-3 daily-tracker-form"
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3 daily-tracker-form"
            controlId="formBasicDropdown"
          >
            <Form.Label>
              <h5 className="label">What activity did you do?</h5>
            </Form.Label>
            <Form.Select
              onChange={activityHandleChange}
              className="py-3 daily-tracker-form"
              required
            >
              <option className="option" name="exercise" value=""></option>
              <option className="option" name="exercise" value="walk">
                Walk
              </option>
              <option className="option" name="exercise" value="run">
                Run
              </option>
              <option className="option" name="exercise" value="bike">
                Bike
              </option>
              <option className="option" name="exercise" value="swim">
                Swim
              </option>
              <option className="option" name="exercise" value="hike">
                Hike
              </option>
              <option className="option" name="exercise" value="yoga">
                Yoga
              </option>
              <option className="option" name="exercise" value="pilates">
                Pilates
              </option>
              <option className="option" name="exercise" value="hiit">
                HIIT
              </option>
              <option className="option" name="exercise" value="sports">
                Sports
              </option>
              <option className="option" name="exercise" value="dance">
                Dance
              </option>
              <option className="option" name="exercise" value="core">
                Core
              </option>
              <option className="option" name="exercise" value="arms">
                Arms
              </option>
              <option className="option" name="exercise" value="legs">
                Legs
              </option>
              <option className="option" name="exercise" value="back">
                Back
              </option>
              <option
                className="option daily-tracker-form"
                name="exercise"
                value="full-body-strength"
              >
                Full Body Strength
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLength">
            <Form.Label>
              <h5 className="label">Duration</h5>
            </Form.Label>
            <Form.Control
              onChange={lengthHandleChange}
              name="length"
              placeholder="Length in minutes"
              value={length}
              className="py-3 daily-tracker-form"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicIntensity">
            <Form.Label>
              <h5 className="label">How intense was your activity?</h5>{" "}
            </Form.Label>
            <Form.Select
              onChange={intensityHandleChange}
              className="option py-3 daily-tracker-form"
              required
            >
              <option className="option " name="intensity" value="0"></option>
              <option className="option" name="intensity" value="1">
                1
              </option>
              <option className="option" name="intensity" value="2">
                2
              </option>
              <option className="option" name="intensity" value="3">
                3
              </option>
              <option className="option" name="intensity" value="4">
                4
              </option>
              <option className="option" name="intensity" value="5">
                5
              </option>
              <option className="option" name="intensity" value="6">
                6
              </option>
              <option className="option" name="intensity" value="7">
                7
              </option>
              <option className="option" name="intensity" value="8">
                8
              </option>
              <option className="option" name="intensity" value="9">
                9
              </option>
              <option className="option" name="intensity" value="10">
                10
              </option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            value=" Submit"
            className="daily-btn"
          >
            Submit
          </Button>
        </Form>
        <Modal show={errorShow} onHide={handleErrorClose}>
        <Modal.Header>
          <Modal.Title>
            We do not have record of your email. Please create an account on the homepage to
              continue.
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleErrorClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={submitShow} onHide={handleSubmitClose}>
        <Modal.Header>
          <Modal.Title>
            Your activity has been logged! Check out your My Health page to see all your data!
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmitClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
};

export default DailyTracker;
