import React from "react";
import Home from "./views/Home";
import "./index.css";
import { TaskProvider } from "./contexts/task.context";

function App() {
  return (
    <>
      <TaskProvider>
        <Home />
      </TaskProvider>
    </>
  );
}

export default App;
