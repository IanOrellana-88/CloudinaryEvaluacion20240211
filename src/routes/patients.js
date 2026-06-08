import express from "express";
import patientsController from "../controllers/patientsController.js";
import upload from  "../utils/cloudinaryConfig.js";

const router = express.Router();

router
 .route("/")
.get(patientsController.getAllPatients)
.post(upload.single)("image"),patientsController.insertPatient;

router 
.route("/:id")
.put(upload.single("image"),patientsController.updatePatient)
.delete(patientsController.deletePatient);

export default router;
