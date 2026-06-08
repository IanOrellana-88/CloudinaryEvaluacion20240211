import equipmentsModel from "../models/equipment.js";
import { v2 as cloudinary } from "cloudinary";
 
const equipmentsController = {};
 

equipmentsController.getAllequipments = async (req, res) => {
  try {
    const equipments = await equipmentsModel.find();
    return res.status(200).json(equipments);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
// INSERT
equipmentsController.inserEquipments = async (req, res) => {
  try {
    const { equipmenName, description, brand, model } = req.body;
    
    const newEquipment = new equipmentsModel({
      equipmenName, description, brand, model,
      image: req.file ? req.file.path : null,
    });
 
    await newEquipment.save();
 
    return res.status(200).json({ message: "equipment saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
// UPDATE
equipmentsController.updateEquipment = async (req, res) => {
  try {
    const { equipmenName, description } = req.body;
    const equipmentFound = await equipmentsModel.findById(req.params.id);
    const updatedData = { equipmenName, description };
 
    if (req.file) {
      if (equipmentFound.public_id) {
        await cloudinary.uploader.destroy(equipmentFound.public_id);
      }
      updatedData.image = req.file.path;
      updatedData.public_id = req.file.filename; 
    }

    await equipmentsModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
    return res.status(200).json({ message: "equipment updated" });
 
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
// DELETE
equipmentsController.deleteEquipment = async (req, res) => {
  try {
    const equipmentFound = await equipmentsModel.findById(req.params.id);
    
    if (equipmentFound.public_id) {
      await cloudinary.uploader.destroy(equipmentFound.public_id);
    }
    
    await equipmentsModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "equipment deleted" });
 
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
export default equipmentsController;