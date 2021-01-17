import "dotenv/config";
import TodoRoute from "./routes/todo.route";
import App from "./app";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([new TodoRoute()]);

app.listen();
