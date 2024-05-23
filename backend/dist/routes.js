"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authController_1 = require("./controller/authController");
const router = (0, express_1.Router)();
exports.router = router;
// Definir rotas de autenticação
router.post("/register", authController_1.registerUser);
router.post("/login", authController_1.authenticateUser);
router.post("/verify", authController_1.verify);
