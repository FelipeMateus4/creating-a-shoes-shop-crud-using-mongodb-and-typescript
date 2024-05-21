import { Router } from "express";
import { shoesController } from "./controller/shoesController";
import { socksController } from "./controller/socksController";
import { registerUser, logoutUser, authenticateUser, getUserProfile } from "./controller/authController";
import { authenticateToken} from  "./middleware/middleware";

const router = Router();


router.use("/thundershoes", authenticateToken, shoesController);
router.use("/thundersocks", authenticateToken, socksController);
router.post("/logout", authenticateToken, logoutUser);
router.get('/profile', authenticateToken, getUserProfile);

export {router as authrouter}