import { cleanEnv, port, str } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    MONGODB_URI: str(),
    DB_NAME: str(),
    PORT: port(),
  });
}

export default validateEnv;
