# :running: My Health App :heart:
MERN Fullstack Application.  
Check out the [live site!](https://laurencolvin.github.io/my-health-client/)
[Deployed Backend Link](https://pure-anchorage-47818.herokuapp.com/)
[Github Repository for Backend](https://github.com/LaurenColvin/my-health-api)

## Project Description

My Health App is a fitness and wellness tracker where users can input their daily acivities to work towards their goals. This is a health app for users who want to focus on awareness of their health journey.

This app includes a backend database using MongoDB and Express.js and a frontend web application using Node.js and React.

![alt text](./src/assets/My-Health-App.png)

## Project Schedule

| Day   | Deliverable                          | Status     |
| ----- | ------------------------------------ | ---------- |
| Day 1 | Planning and Approval                | Complete   |
| Day 1 | Set up backend files and structure   | Complete   |
| Day 2 | Set up frontend files and structure  | Complete   |
| Day 2 | Test and deploy backend              | Complete   |
| Day 3 | CSS Styling and Responsive Design    | Complete   |
| Day 4 | MVP & Bug Fixes & Adding Seed Data   | Complete   |
| Day 4 | Final Touches and deploying frontend | Complete   |
| Day 5 | Present                              | Incomplete |


## Team Responsibilities

Overall we want to work on this project as a team- step by step. We will split up Models/Compenents when working on the frontend or backend. But once we have working functionality we will split up 2 on CSS and 2 on JavaScript to move faster.

- Lauren- Create a model, work on CR routes, and one component. Working on JavaScript functions at the end.
- Anju- Create a model, work on CR routes, and one component. Working on CSS and Responsive Design at the end.
- Rebecca- Create a model, work on UD routes, and one component. Working on JavaScript functions at the end.
- Kae- Create a model, work on UD routes, and one component. Working on CSS and Responsive Design at the end.

## User Stories

The user of our app will check in daily- preferably at the end of their day- to submit their activities for the day. At the end of the week they will check their My Health Page to see aggragated data and how they are tracking to their goals. This app is a positive part of their day and they feel accomplished submitting their good decisions. Keeping a journal of your day to day activity is a great way to reinforce the positive impacts of a healthy lifestyle.

## Wireframes

- [Mobile](https://drive.google.com/file/d/125AXcBq3xj1AYb3lJM9dB7VIFP3uNDe_/view?usp=sharing)
- [Desktop-1](https://drive.google.com/file/d/1gLPPjVDb1aQwyd-4aAwrmOsQevOOMare/view?usp=sharing)
- [Desktop-2](https://drive.google.com/file/d/1YA1TPEQ6BQTE6yx1dnFqGhxMApwEcMx_/view?usp=sharing)

## Time/Priority Matrix

[Link](https://drive.google.com/file/d/1KQG9TzShYeTfTY-nrRmMcrmf_DIRg5dd/view?usp=sharing)

### MVP/PostMVP

#### MVP (examples)

- 2 models for our data (Activity, Person)
- CRUD functionality (Add Person, View Person, Edit Activity/Person, Delete Person/Activity)
- Have 4 Routes and components on frontend (Home, Daily Tracker, My Health Page, About Team)
- Fetch data from our backend API
- Responsive design from mobile to desktop
- Use bootstrap for design (add progress bar)
- Fully Deployed frontend and backend

#### PostMVP

- Add a more models (Food, Mood, Daily Weight, Track Friends)
- Add a more routes for extra models
- Add page with suggested activities or meals
- Login authentication
- Adding animations

## Routing Table

| **URL**       | **HTTP Verb** | **Action** | **Description**             |
| ------------- | ------------- | ---------- | --------------------------- |
| /person       | POST          | create     | add new user                |
| /activity     | POST          | create     | add activity                |
| /person       | GET           | show       | show all of this users data |
| /person/:id   | GET           | show       | show one week of users data |
| /activity/:id | GET           | show       | show one week of users data |
| /activity/:id | PUT           | update     | edit daily input            |
| /person/:id   | PUT           | update     | edit person                 |
| /person/:id   | DELETE        | delete     | delete person               |
| /activity/:id | DELETE        | delete     | delete a daily input        |

## Functional Components

| Component               |                  Description                  |
| ----------------------- | :-------------------------------------------: |
| Home                    |     Landing Page with Add New User Button     |
| Daily Tracker           |           Form for user input daily           |
| My Health Page          |    Include weekly and daily views of data     |
| My Health Page- By Week |         Progress bars displaying data         |
| My Health Page- By Day  | Individual cards with edit and delete buttons |
| My Health Page- Update  |    Pop-out to update individual activities    |
| About Team              |          Photos and team description          |
| Header                  |                 Logo and Menu                 |
| Footer                  |       Copyright tag and link to github        |

#### MVP

| Component                          | Priority | Estimated Time | Actual Time |
| ---------------------------------- | :------: | :------------: | :---------: |
| Installing and Setup for backend   |    H     |      1hr       |     1hr     |
| Models and Schemas                 |    H     |      2hr       |     1hr     |
| CRUD Routes and testing on Postman |    H     |      3hr       |     1hr     |
| Deploying backend                  |    H     |     1.5hr      |     1hr     |
| Creating React App                 |    H     |      1hr       |     1hr     |
| Add Routes                         |    H     |      1hrs      |    1.5hr    |
| Create Components                  |    H     |      3hrs      |     5hr     |
| Fetch and test data on frontend    |    H     |      3hr       |     5hr     |
| Responsive Design                  |    H     |      3hr       |     3hr     |
| CSS and Bootstrap                  |    L     |      3hr       |     5hr     |
| Deploy frontend                    |    L     |      1hr       |     1hr     |
| Total                              |    H     |    22.5hrs     |   25.5hrs   |

#### PostMVP

| Component                   | Priority | Estimated Time | Actual Time |
| --------------------------- | :------: | :------------: | :---------: |
| Friends Data Model          |    L     |      1hr       |     hr      |
| Freinds Route and Compoment |    L     |      3hr       |     hr      |
| Suggestion Page             |    M     |      4hr       |     hr      |
| Login Authentication        |    H     |      4hr       |     hr      |
| Animations                  |    H     |      4hr       |     6hr     |
| Total                       |    H     |     16hrs      |    6hrs     |

## Additional Libraries

- Bootstrap - for overall layout and design
- Google Fonts

## Code Snippet

The below code was used to add a new activity to our person model.

```js
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
```

## Issues and Resolutions

**ERROR**:
2022-03-11T05:38:34.209292+00:00 app[web.1]: value: '5’5',
2022-03-11T05:38:34.209292+00:00 app[web.1]: path: 'height',
2022-03-11T05:38:34.209293+00:00 app[web.1]: reason: AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:
2022-03-11T05:38:34.209293+00:00 app[web.1]:
2022-03-11T05:38:34.209293+00:00 app[web.1]: assert.ok(!isNaN(val))

**RESOLUTION**:
We made the number input forms number type to eliminate the issue.
