import express from "express";
import ControllerBoard from "../controllers/ControllerBoard";

const router = express.Router();

router.get("/", ControllerBoard.getMany);
router.get("/:id", ControllerBoard.getOneById);

export default router;
