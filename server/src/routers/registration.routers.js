import { Router } from "express";
import { registerVehicle, getDetailsOfRegVech, getAll } from "../controllers/registration.controller.js";
import { verifyJWT, isAdmin } from "../middelwares/auth.middelwares.js"

const router = new Router();

router.route("/regVehicle").post(verifyJWT, registerVehicle);
router.route("/getDetails").get(verifyJWT, getDetailsOfRegVech);

router.route("/getAll").get(verifyJWT, isAdmin, getAll);

export default router;