import express from "express";
import { loadChampions } from "../../controllers/championControllers/championControllers";

// eslint-disable-next-line new-cap
const championRouter = express.Router();

championRouter.get("", loadChampions);

export default championRouter;