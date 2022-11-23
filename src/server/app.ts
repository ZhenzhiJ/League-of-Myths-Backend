import cors from "cors";
import express from "express";
import morgan from "morgan";
import { generalError, unknownEndpoint } from "./middleware/errors.js";
import routes from "./routers/routes.js";
import userRouters from "./routers/userRouters/userRouters.js";

const app = express();

const { users } = routes;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.disable("x-powered-by");

app.use(users, userRouters);

app.use(generalError);
app.use(unknownEndpoint);

export default app;
