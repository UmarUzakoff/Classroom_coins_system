import { Router } from "express";
import {
  EditUser,
  Subscription,
  usersubscriptions,
} from "../controllers/users.controller";
import tokenMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/subscription/:id", tokenMiddleware, Subscription);
router.get("/myacc/subs", tokenMiddleware, usersubscriptions);
router.put("/myacc/edit", tokenMiddleware, EditUser);

export default router;
