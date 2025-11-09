import express from "express";
import ControllerRole from "../controllers/ControllerRole";

const router = express.Router();

router.get("/", ControllerRole.getMany);
router.get("/:id", ControllerRole.getOneById);

export default router;
