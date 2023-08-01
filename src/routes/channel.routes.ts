import { Router } from "express";
import { ChannelsGet, GetExactChannel } from "../controllers/channels.controller";
import tokenMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/channels", ChannelsGet);
router.get("/channels/:id", GetExactChannel);

export default router;
