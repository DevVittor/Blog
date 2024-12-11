import { Router } from "express";
const router = Router();

import {
  allPost,
  detailsPost,
  alterContent,
  showCommentary,
  createNewPost,
  blockPost,
  unblockPost,
  alterTitle,
  deletePost,
} from "../../controllers/postController.js";

router.get("/all", allPost);
router.get("/details", detailsPost);
router.get("/comentarys", showCommentary);
router.post("/create", createNewPost);
router.post("/block", blockPost);
router.post("/unblock", unblockPost);
router.patch("/alter/title", alterTitle);
router.patch("/alter/content", alterContent);
router.delete("/delete", deletePost);

export default router;
