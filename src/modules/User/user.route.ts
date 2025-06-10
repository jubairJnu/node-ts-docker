import express from "express";

import { UserControllers } from "./user.controller";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/create-user",
  multerUpload.single("image"),
  UserControllers.userRegister
);
router.get("/", UserControllers.getAllUsers);
router.get("/:id", UserControllers.getSingleUser);

export const UserRoutes = router;
