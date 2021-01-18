# Todo-Calendar-View

This is a todo app but with the tasks arranged on a calendar view, similar to the way tasks on google calendar are displayed. It is a technical take home assignment.
Live url for the app is [here](https://todo-calendar-view.netlify.app/)

## Technologies Used

#### Frontend

- React With Hooks (for ui rendering and state management)
- Typescript (to make javascript type-safe)
- Styled components (for styling )

#### Backend

- Express(Node) as the framework
- Mongodb as the database
- Typescript (to make javascript type-safe)

## Setting up project locally

```
1. git clone https://github.com/vanderkilu/todo-calendar-view.git.
2. cd <cloned-directory>
3. cp example.env .env [This will create a .env file using the example.env]
```

#### Starting db

This assumes you have mongodb installed

on unix you can start mongodb by running `sudo service mongod start`
or you can use `brew services start mongodb` if you installed it via homebrew on mac
or `mongo.exe` on cmd on windows

more info on how to get started with mongodb [here](https://docs.mongodb.com/manual/installation/)

#### Running the server

```
npm install
npm run dev
```

server should now run on port :8080

#### Running the client/frontend

```
cd ui
npm install
npm run start
```

client should start on port :3000

## Design and Assumptions

The app was designed with simplicity in mind. Took a lot of design inspiration from google calendar tasks.

**The backend** of the application was quite simple.
It is a restful(api) service. I created a **model** to represent a todo item and then created **services** to read the list of todo items, create a todo item, update and delete a todo item. **Route** was created to access each of these service operation using a **controller** which takes in a request and call the appropriate service and then return a transformed response. There is a **loose coupling** between services and controllers by making use of **interfaces(dependency injection)** making it easier to test and swap out services. Validation of each request was achieved using a **Data Transfer Object(DTO)** which specifies the data required for each request and their appropriate types. Appropriate **error handling** was also applied and useful **status codes** returned.

The **frontend** however, required a lot of design thinking and more work. It was more involved than the backend. Majority of the work on the ui is figuring out to **correctly display the tasks/todos on a calendar view**. I started by first creating a **month calendar view**. The month calendar view basically consist of cells. Each **cell** is a component representing a date/day in a particular month. It receives props that listen to clicks and can render **tasks** belonging to it. A special custom hook, **useCalendar** was created to ease/ abstract the process of calculating days within a specific month and **grouping all tasks belonging to each day/date in the month**. Another view is the **year view** which is similar to the month view but renders all months and all tasks within a specific day in a month in a year. Components were creating to allow easy **switching between views** and **accessing future calendars and tasks**. Other **Form Modal Components** were created to allowing adding of items, previewing, editing and deletion. All components were created from **scratch without using any css specific ui library**. Connecting and interacting with the backend api was done using the **browser fetch api**. Various **loading states** were shown accordingly when interacting with the remote backend api. Icons, subtle fonts,indicators, task overflow previews, and human readable dates formats were used when necessarily to improve the **user experience**.
