import { Router } from "express";
import { getTopUsersReport } from "../controllers/analyst.controller";

const router = Router();

// Endpoint
router.get("/top-users", getTopUsersReport);

export default router;
