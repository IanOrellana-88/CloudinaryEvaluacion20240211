import files from "../models/files.js";

 
const filesController = {};
 

filesController.getAllfiles = async (req, res) => {
  try {
    const files = await filesModel.find();
    return res.status(200).json(quotes);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
// INSERT
filesController.insertFiles = async (req, res) => {
  try {
    const {patient_id,
diagnosis,
medications,
medicalNotes
 } = req.body;
    
    const newFile = new filesModel({
      patient_id,
diagnosis,
medications,
medicalNotes 
    });
 
    await newFile.save();
 
    return res.status(200).json({ message: "file saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
// UPDATE
filesController.updateFile = async (req, res) => {
  try {
    const { patient_id,
diagnosis,
medications,
medicalNotes} = req.body;
    const fileFound = await filesModel.findById(req.params.id);
    const updatedData = { patient_id,
diagnosis,
medications,
medicalNotes};

    await filesModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
    return res.status(200).json({ message: "file updated" });
 
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
// DELETE
filesController.deleteFiles = async (req, res) => {
  try {
    const fileFound = await filesModel.findById(req.params.id);
    
    await filesModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "files deleted" });
 
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
export default filesController;