import { Router } from "express";
import { AddMoney } from "../controllers/payment.controller";
import tokenMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/myacc/addmoney", AddMoney);

export default router;
