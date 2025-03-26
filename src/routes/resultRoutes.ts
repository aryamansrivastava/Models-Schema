import express from "express";
import * as resultController from "../controllers/resultController";

const router = express.Router();

router.get("/", resultController.getResults);

export default router;
