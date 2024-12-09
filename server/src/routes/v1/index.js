import { Router } from "express";
const router = Router();

import User from "./userRoute.js";
import Post from "./postRoute.js";
import Commentary from "./commentaryRoute.js";

router.use("/user", User);
router.use("/post", Post);
router.use("/commentary", Commentary);

export default router;
