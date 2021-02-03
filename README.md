# calendr

This is a simple/POC calendar app with tasks/events similar to the way tasks are rendered on google calendar.
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
