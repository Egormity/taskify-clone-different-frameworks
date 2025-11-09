import express from "express";
import ControllerActivity from "../controllers/ControllerActivity";

const router = express.Router();

router.get("/", ControllerActivity.getMany);
router.get("/:id", ControllerActivity.getOneById);

export default router;
