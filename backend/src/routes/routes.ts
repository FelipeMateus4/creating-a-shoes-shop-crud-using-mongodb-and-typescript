import { Router } from "express";
import { shoesController } from "../controller/shoesController";
import { socksController } from "../controller/socksController";
import { registerUser, logoutUser, authenticateUser, verify } from "../controller/authController";

const router = Router();


// Definir rotas de autenticação
router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.post("/verify", verify);

export {router};
