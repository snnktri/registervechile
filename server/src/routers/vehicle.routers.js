import { Router } from "express";
import { createVehilce, getDetails } from "../controllers/vehicle.controller.js";
import { verifyJWT } from "../middelwares/auth.middelwares.js";
import { upload } from "../middelwares/multer.middelwares.js"
const router = new Router();

router.route("/creatVeh").post(verifyJWT, upload.single(
    "photo"
), createVehilce);

router.route("/getDetails").get(verifyJWT,getDetails);

export default router;