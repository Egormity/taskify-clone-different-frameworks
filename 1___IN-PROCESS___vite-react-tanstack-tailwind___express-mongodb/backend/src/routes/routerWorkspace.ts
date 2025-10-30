import express from "express";

import ControllerAuth from "../controllers/ControllerAuth";
import ControllerWorkspace from "../controllers/ControllerWorkspace";

const router = express.Router();

router.use(ControllerAuth.protect);

router.route("/").get(ControllerWorkspace.getMyMany).post(ControllerWorkspace.postOne);

router
	.route("/:id")
	.get(ControllerWorkspace.getOneById)
	.patch(ControllerWorkspace.patchOneById)
	.delete(ControllerWorkspace.deleteOneById);

export default router;
