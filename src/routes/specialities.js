import express from "express";
import specialitesController from "../controllers/specialitiesController.js";

const router = express.Router();

router 
.route("/")
.get(specialitesController.getAllSpecialities)
.post(specialitesController.insertSpecialities)

router.route("/:id")
.put(specialitesController.updateSpecialitie)
.delete(specialitesController.deleteSpeciealitie)

export default router;
