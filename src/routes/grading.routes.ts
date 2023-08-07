import { Router } from "express";
import { minusCoins, plusCoins } from "../controllers/grading.controller";
import isAdmin from "../middlewares/admin.middleware";
import tokenMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/coins/plus/student/:id", tokenMiddleware, isAdmin, plusCoins);
router.post("/coins/minus/student/:id", tokenMiddleware, isAdmin, minusCoins);

export default router;
