import { Router } from "express";
import {
  editUserEmail,
  editUserPassword,
  studentDelete,
  studentGet,
  studentPost,
  studentsClassroom,
  userInfo,
} from "../controllers/students.controller";
import isAdmin from "../middlewares/admin.middleware";
import tokenMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/student", tokenMiddleware, isAdmin, studentPost);
router.delete("/student/:id", tokenMiddleware, isAdmin, studentDelete);
router.get("/student/:id", tokenMiddleware, isAdmin, studentGet);
router.get("/userinfo", tokenMiddleware, userInfo);
router.put("/userinfo/edit/email", tokenMiddleware, editUserEmail);
router.put("/userinfo/edit/password", tokenMiddleware, editUserPassword);
router.get("/student/class/room", tokenMiddleware, studentsClassroom);

export default router;
