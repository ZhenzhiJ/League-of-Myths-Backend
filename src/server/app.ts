import cors from "cors";
import express from "express";
import morgan from "morgan";
import corsOptions from "./cors/corsOptions.js";
import { generalError, unknownEndpoint } from "./middleware/errors.js";
import championRouters from "./routers/championRouters/championRouters.js";
import routes from "./routers/routes.js";
import userRouters from "./routers/userRouters/userRouters.js";

const app = express();

const { users, champions } = routes;

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.disable("x-powered-by");

app.use(users, userRouters);
app.use(champions, championRouters);

app.use(generalError);
app.use(unknownEndpoint);

export default app;
