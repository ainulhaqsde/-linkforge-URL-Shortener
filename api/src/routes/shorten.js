import express from "express";
import { shortenUrl } from "../controllers/shortenController.js";
import { validateShortenRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/", validateShortenRequest, shortenUrl);

export default router;