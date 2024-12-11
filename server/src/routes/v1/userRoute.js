import { Router } from "express";
const router = Router();

import {
  listUser,
  detailsUser,
  registerNewUser,
  login,
  blockUser,
  unblockUser,
  alterEmail,
  alterPassword,
  deleteUser,
} from "../../controllers/userController.js";

router.get("/list", listUser);
router.get("/details", detailsUser);
router.post("/register", registerNewUser);
router.post("/login", login);
router.post("/block", blockUser);
router.post("/unblock", unblockUser);
router.patch("/alter/email", alterEmail);
router.patch("/alter/password", alterPassword);
router.delete("/delete", deleteUser);

export default router;
