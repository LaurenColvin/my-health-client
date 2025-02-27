//home

import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "./Home.css";
import Workout from "../../assets/Workout-transparent.png";

const Home = ({ urlBase, people, setPeople }) => {
  ////////////////// USE STATE FOR FORM INPUT /////////////////////
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: Number,
    weight: Number,
    height: Number,
    mood: "",
  });

  const handleChange = (event) => {
    event.persist();
    setPerson((prevPerson) => {
      const editedPerson = {
        ...prevPerson,
        [event.target.name]: event.target.value,
      };
      return editedPerson;
    });
  };

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
    setPerson({
      firstName: "",
      lastName: "",
      email: "",
      age: Number,
      weight: Number,
      height: Number,
      mood: "",
    });
  };

  ////////////////// SUBMIT FUNCTION FOR FORM TO POST NEW USER //////////////////

  const handleSubmit = (event) => {
    event.preventDefault();
    let emails = people.map((person) => person.email);
    let check = emails.includes(person.email);
    if (check === true) {
      handleErrorShow();
    } else {
      handleSubmitShow();
      fetch(`${urlBase}/person`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(person),
      })
        .then(() => fetch(`${urlBase}/person`))
        .then((response) => response.json())
        .then((data) => setPeople(data.person))
        .then(() =>
          setPerson({
            firstName: "",
            lastName: "",
            email: "",
            age: Number,
            weight: Number,
            height: Number,
            mood: "",
          })
        );
    }
  };

  ////////////////// HTML FOR FORM AND MODAL //////////////////

  return (
    <div className="home">
      <h2 className="home-h2">Register to get started!</h2>

      <div className="row">
        <div className=" color-overlay  justify-content-center col-md-4 align-item-center ml-4">
          <Form
            className="rounded p-4 p-lg-5 ml-2 home-form"
            onSubmit={handleSubmit}
          >
            {/* firstname */}
            <Form.Group className="mb-2 py-3" controlId="formBasicName">
              <Form.Label className="py-1 label">
                <h5>First Name</h5>{" "}
              </Form.Label>

              <Form.Control
                onChange={handleChange}
                value={person.firstName}
                name="firstName"
                placeholder="First Name"
                className="py-3 rounded person-input"
                required
              />
            </Form.Group>

            {/* lastname */}
            <Form.Group className="mb-2" controlId="formBasicName">
              <Form.Label className="py-1 label">
                <h5>Last Name</h5>{" "}
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                value={person.lastName}
                name="lastName"
                placeholder="Last Name"
                className="py-3 rounded person-input"
                required
              />
            </Form.Group>

            {/* email */}
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label className="py-1 label">
                <h5>Email</h5>{" "}
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                value={person.email}
                name="email"
                placeholder="Enter your Email"
                className="py-3 rounded person-input"
                type="email"
                required
              />
            </Form.Group>

            {/* age */}
            <Form.Group className="mb-2" controlId="formBasicAge">
              <Form.Label className="py-1 label">
                <h5>Age</h5>{" "}
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                value={person.age}
                name="age"
                placeholder="Enter your Age"
                className="py-3 rounded person-input"
                type="number"
                required
              />
            </Form.Group>

            {/* weight */}

            <Form.Group className="mb-2" controlId="formBasicWeight">
              <Form.Label className="py-1 label">
                <h5>Weight</h5>{" "}
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                value={person.weight}
                name="weight"
                placeholder="Weight in lbs"
                className="py-3 rounded person-input"
                type="number"
                required
              />
            </Form.Group>

            {/* height */}

            <Form.Group className="mb-2" controlId="formBasicHeight">
              <Form.Label className="py-1 label">
                <h5>Height</h5>
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                value={person.height}
                name="height"
                placeholder="Height in inches"
                className="py-3 rounded person-input"
                type="number"
                required
              />
            </Form.Group>

            {/* mood */}
            <Form.Group className="mb-2" controlId="formBasicMood">
              <Form.Label className="py-1 label">
                <h5>Mood</h5>
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                value={person.mood}
                name="mood"
                placeholder="Enter your Mood"
                className="py-3 rounded person-input"
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              value=" Submit"
              className="register-btn"
            >
              Submit
            </Button>
          </Form>
        </div>
        <div className="col-sm-3 ">
          <img className="home-img" src={Workout} alt="family-workout" />
        </div>
      </div>
      <Modal show={errorShow} onHide={handleErrorClose}>
        <Modal.Header>
          <Modal.Title>
            That email is already in use. Please try again with a different
            email.
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
            Your account is created! Add activities using the Daily Tracker, or
            check out your progress on My Health!
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmitClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Home;
