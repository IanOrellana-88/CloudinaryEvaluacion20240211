import express from "express";
import quotesController from "../controllers/quotesController.js";

const router = express.Router();

router 
.route("/")
.get(quotesController.getAllQuotes)
.post(quotesController.insertQuotes)

router.route("/:id")
.put(quotesController.UpdateQuote)
.delete(quotesController.deleteQuote)

export default router;
