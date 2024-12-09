import { Router } from "express";
const router = Router();

import {
  publishCommentary,
  editarComment,
  removeComment,
} from "../../controllers/commentaryController.js";

router.post("/send", publishCommentary);
router.patch("/edit", editarComment);
router.delete("/delete", removeComment);

export default router;
