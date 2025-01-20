import { Router } from "express";
import { registerUser, loginUser, logoutUser, adminLogin } from "../controllers/user.controller.js"
import { verifyJWT, isAdmin} from "../middelwares/auth.middelwares.js"
import {upload} from "../middelwares/multer.middelwares.js"


const router = Router();

router.route("/registerUser").post(upload.single(
    "profile"
),registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

//admin login

router.route("/admin/login").post(adminLogin);


export default router;