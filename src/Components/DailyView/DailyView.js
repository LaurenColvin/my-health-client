import { useState } from "react";
import Update from "./../Update/Update";
import { Card, Button } from "react-bootstrap";
import "./DailyView.css";

const DailyView = ({ urlBase, user, handleSubmit }) => {
  const [view, setView] = useState(false);
  const [activity, setActivity] = useState({});

  const activities = user.activity;
  const handleDelete = (id) => {
    setView(false);
    fetch(`${urlBase}/activity/${id}`, {
      method: "DELETE",
    }).then((response) => response.json());
  };

  const refreshPage = (event) => {
    handleDelete(event.target.id);
    handleSubmit(event);
  };

  const showUpdate = (event) => {
    setView(true);
    let id = event.target.id;
    fetch(`${urlBase}/activity/${id}`)
      .then((response) => response.json())
      .then((data) => setActivity(data.activity));
  };

  function changeDate(date) {
    const d = new Date(date);
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][d.getMonth()];
    let str = month + " " + d.getDate() + " " + d.getFullYear();
    return str;
  }

  function dayOfWeek(date) {
    const d = new Date(date);
    let day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][d.getDay()];
    return day;
  }

  const list = activities.map((activity) => {
    let url = `/my-health/update-activity/${activity._id}`;
    let dateUpdate = changeDate(activity.date);
    let weekDay = dayOfWeek(activity.date);
    return (
      <Card key={activity._id} className="card">
        <h2>{weekDay}</h2>
        <p className="card-p">Date: {dateUpdate}</p>
        <p className="card-p">Exercise: {activity.exercise}</p>
        <p className="card-p">Length: {activity.length} minutes</p>
        <p className="card-p">Intensity: {activity.intensity}</p>
        <div className="btn-container">
          <Button className="btn-del" onClick={refreshPage} id={activity._id}>
            Delete
          </Button>
          <Button onClick={showUpdate} className="btn-update" id={activity._id}>
            Update Activity
          </Button>
        </div>
      </Card>
    );
  });

  return (
    <div>
      <div>{list}</div>
      {view === false ? (
        <div></div>
      ) : (
        <Update
          urlBase={urlBase}
          activity={activity}
          setActivity={setActivity}
          setView={setView}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default DailyView;
