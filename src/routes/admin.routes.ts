import { Router } from "express";
import {
  ChannelPost,
  channelsubscribers,
  deleteUser,
  GetAllUsers,
  UsersChannelsGet,
} from "../controllers/admin.controller";
import isAdmin from "../middlewares/admin.middleware";

const router = Router();

router.get("/users", isAdmin, GetAllUsers);
router.get("/subscriptions", isAdmin, UsersChannelsGet);
router.get("/channelsubscribers/:id", isAdmin, channelsubscribers);
router.post("/channels/post", isAdmin, ChannelPost);
router.delete("/users/delete/:id", isAdmin, deleteUser);

export default router;
