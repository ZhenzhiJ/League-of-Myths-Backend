import express from "express";
import multer from "multer";
import path from "path";
import {
  deleteChampion,
  loadChampions,
  createChampion,
} from "../../controllers/championControllers/championControllers.js";
import auth from "../../middleware/auth/auth.js";
import backupImage from "../../middleware/images/backupImage/backupImage.js";
import renameImage from "../../middleware/images/renameImage/renameImage.js";
import resizeImage from "../../middleware/images/resizeImage/resizeImage.js";
import routes from "../routes.js";

// eslint-disable-next-line new-cap
const championRouter = express.Router();
const upload = multer({
  dest: path.join(`assets/images`),
  limits: {
    fileSize: 5000000,
  },
});

const { deleteRoute, championId, createRoute } = routes;

championRouter.get("", loadChampions);

championRouter.delete(`${deleteRoute}${championId}`, deleteChampion);

championRouter.post(
  createRoute,
  auth,
  upload.single("image"),
  renameImage,
  resizeImage,
  backupImage,
  createChampion
);

export default championRouter;
