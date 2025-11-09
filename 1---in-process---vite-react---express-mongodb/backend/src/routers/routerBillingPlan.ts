import express from "express";
import ControllerBillingPlan from "../controllers/ControllerBillingPlan";

const router = express.Router();

router.get("/", ControllerBillingPlan.getMany);
router.get("/:id", ControllerBillingPlan.getOneById);

export default router;
