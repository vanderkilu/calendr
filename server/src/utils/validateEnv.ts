import { cleanEnv, port, str } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    MONGO_DATABASE: str(),
    DB_NAME: str(),
    PORT: port(),
  });
}

export default validateEnv;
