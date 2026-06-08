import express from "express";
import filesController from "../controllers/filesController.js";

const router = express.Router();

router 
.route("/")
.get(filesController.getAllfiles)
.post(filesController.insertFiles)

router.route("/:id")
.put(filesController.updateFile)
.delete(filesController.deleteFiles)

export default router;
