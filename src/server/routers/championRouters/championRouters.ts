import express from "express";
import {
  deleteChampion,
  loadChampions,
} from "../../controllers/championControllers/championControllers.js";
import routes from "../routes.js";

// eslint-disable-next-line new-cap
const championRouter = express.Router();

const { deleteRoute, championId } = routes;

championRouter.get("", loadChampions);
championRouter.delete(`${deleteRoute}${championId}`, deleteChampion);

export default championRouter;
