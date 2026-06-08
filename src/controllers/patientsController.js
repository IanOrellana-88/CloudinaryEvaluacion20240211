import patientsModel from "../models/patients.js";
import { v2 as cloudinary } from "cloudinary";
 
const patientsController = {};
 

patientsController.getAllPatients = async (req, res) => {
  try {
    const patients = await patientsModel.find();
    return res.status(200).json(patients);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
// INSERT
patientsController.insertPatient = async (req, res) => {
  try {
    const { name, phone, birthdate, bloodType } = req.body;
    
    const newPatient = new patientsModel({
      name,
      phone,
      birthdate,
      bloodType,
      image: req.file ? req.file.path : null,
    });
 
    await newPatient.save();
 
    return res.status(200).json({ message: "Patient saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
// UPDATE
patientsController.updatePatient = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const patientFound = await patientsModel.findById(req.params.id);
    const updatedData = { name, phone };
 
    if (req.file) {
      if (patientFound.public_id) {
        await cloudinary.uploader.destroy(patientFound.public_id);
      }
      updatedData.image = req.file.path;
      updatedData.public_id = req.file.filename; 
    }

    await patientsModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
    return res.status(200).json({ message: "Patient updated" });
 
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
// DELETE
patientsController.deletePatient = async (req, res) => {
  try {
    const patientFound = await patientsModel.findById(req.params.id);
    
    if (patientFound.public_id) {
      await cloudinary.uploader.destroy(patientFound.public_id);
    }
    
    await patientsModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Patient deleted" });
 
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
export default patientsController;