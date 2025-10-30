import express from "express";
import ControllerUser from "../controllers/controllerUser";

const router = express.Router();

router.route("/").get(ControllerUser.getAll).post(ControllerUser.postOne);
router
	.route("/:id")
	.get(ControllerUser.getOneById)
	.patch(ControllerUser.patchOneById)
	.delete(ControllerUser.deleteOneById);

export default router;
