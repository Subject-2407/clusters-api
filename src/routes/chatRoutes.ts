import express from "express";
import { createChat, getChats } from "../controllers/chatController";

const router = express.Router();

router.get('/', getChats);
router.post('/create', createChat);

export default router;