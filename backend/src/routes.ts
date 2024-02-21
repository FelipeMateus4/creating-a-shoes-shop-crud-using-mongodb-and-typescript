import { Router } from "express";
import { shoesController } from "./controller/shoesController";
import { socksController } from "./controller/socksController";

const router = Router();

router.use("/thundershoes", shoesController);
router.use("/thundersocks", socksController);

export { router };