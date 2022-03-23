//weeklyview

import { ProgressBar } from "react-bootstrap";
import "./WeeklyView.css"

const WeeklyView = ({ urlBase, user }) => {
  const activities = user.activity;
  let days = activities.length;
  let hours = 0;
  let minutes = 0;
  let totalIntensity = 0;

  console.log(activities.length);
  const list = activities.map((activity) => {
    minutes += activity.length;
    if (minutes >= 60) {
      hours += 1;
      minutes -= 60;
    }

    totalIntensity += activity.intensity;

    return (
      <div key={activity._id}>
        <p>{activity.exercise}</p>
      </div>
    );
  });

  let avgIntensity = Math.floor(totalIntensity / days);

  return (
    <div className="weekly-view">
      <h3>Weekly Data</h3>
      <h4>Days Exercised this Month:</h4>
      <ProgressBar className="progress" now={(days/30)*100} label={days} />
      <h4>Average Intensity:</h4>
      <ProgressBar now={avgIntensity*10} label={avgIntensity} />
    </div>
  );
};

export default WeeklyView;
