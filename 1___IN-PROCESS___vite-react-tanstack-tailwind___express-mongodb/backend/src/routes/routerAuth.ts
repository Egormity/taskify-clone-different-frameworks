import express from "express";
import ControllerAuth from "../controllers/ControllerAuth";

const router = express.Router();

router.post("/signup", ControllerAuth.signup);
router.post("/login", ControllerAuth.login);
router.post("/logout", ControllerAuth.logout);

router.use(ControllerAuth.protect);
router.get("/me", ControllerAuth.getMe);

export default router;
