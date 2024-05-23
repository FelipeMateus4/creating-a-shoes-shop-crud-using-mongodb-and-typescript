import { Router } from "express";
import { shoesController } from "./controller/shoesController";
import { socksController } from "./controller/socksController";
import { userloginController } from "./controller/userlogincontroller";
import { registerUser, logoutUser, authenticateUser, getUserProfile } from "./controller/authController";
import { authenticateToken} from  "./middleware/middleware";

const router = Router();


router.use("/thundershoes", authenticateToken, shoesController)
router.use("/thundersocks", authenticateToken, socksController)
router.post("/logout", authenticateToken, logoutUser)
router.get('/profile', authenticateToken, getUserProfile)
router.use('/update', authenticateToken, userloginController)

export {router as authrouter}