import express from "express";
import {
  authUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdControlller,
  getUserProfileController,
  registerUserController,
  updateUserController,
  updateUserProfileController,
} from "../controllers/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllUsersController);
router.post("/", registerUserController);
router.post("/login", authUserController);
router.get("/profile", protect, getUserProfileController);
router.put("/profile", protect, updateUserProfileController);
router.get("/:id", protect, isAdmin, getUserByIdControlller);
router.put("/:id", protect, isAdmin, updateUserController);
router.delete("/:id", protect, isAdmin, deleteUserController);

export default router;
