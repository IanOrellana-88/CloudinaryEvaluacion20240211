import express from "express";
import equipmentsController from "../controllers/equipmentsController.js";
import upload from  "../utils/cloudinaryConfig.js";

const router = express.Router();

router
 .route("/")
.get(equipmentsController.getAllequipments)
.post(upload.single)("image"),equipmentsController.inserEquipments;

router 
.route("/:id")
.put(upload.single("image"),equipmentsController.updateEquipment)
.delete(equipmentsController.deleteEquipment);

export default router;
