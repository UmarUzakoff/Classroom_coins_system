import { Router } from "express";
import { addCoinsToTheClassroom, classroomDelete, classroomGet, classroomPost, classroomsGet } from "../controllers/classrooms.controller";
import isAdmin from "../middlewares/admin.middleware";
import tokenMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/classroom", tokenMiddleware, isAdmin, classroomPost);
router.get("/classroom/:id", tokenMiddleware, isAdmin, classroomGet);
router.get("/classrooms", tokenMiddleware, isAdmin, classroomsGet);
router.delete("/classroom/:id", tokenMiddleware, isAdmin, classroomDelete);
router.put("/classroom/addcoins/:id", tokenMiddleware, isAdmin, addCoinsToTheClassroom);

export default router;
