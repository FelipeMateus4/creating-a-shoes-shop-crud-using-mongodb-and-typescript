import { Router } from "express";
import { shoesController } from "./controller/shoesController";
import { socksController } from "./controller/socksController";
import express from "express";
import { registerUser, logoutUser, authenticateUser } from "./controller/authController";

const router = Router();

router.use("/thundershoes", shoesController);
router.use("/thundersocks", socksController);
// para o registro
router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.post("/logout", logoutUser);

export { router };