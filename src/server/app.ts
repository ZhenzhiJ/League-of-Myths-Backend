import cors from "cors";
import express from "express";
import morgan from "morgan";
import { generalError, unknownEndpoint } from "./middleware/errors.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.disable("x-powered-by");

app.use(generalError);
app.use(unknownEndpoint);

export default app;
