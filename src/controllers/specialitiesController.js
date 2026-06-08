import specialitiesModel from "../models/specialities.js";
 
const specialitesController = {};
 

specialitiesController.getAllSpecialities = async (req, res) => {
  try {
    const specialities = await specialitiesModel.find();
    return res.status(200).json(specialities);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
// INSERT
specialitesController.insertSpecialities = async (req, res) => {
  try {
    const { specialitieName, description } = req.body;
    
    const newSpecialitie = new specialitiesModel({
      specialitieName,
      description
    });
 
    await newSpecialitie.save();
 
    return res.status(200).json({ message: "Specialitie saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
// UPDATE
specialitesController.updateSpecialitie = async (req, res) => {
  try {
    const { name, description } = req.body;
    const specialitieFound = await specialitiesModel.findById(req.params.id);
    const updatedData = { name, description };

    await specialitiesModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
    return res.status(200).json({ message: "Speciealitie updated" });
 
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
// DELETE
specialitesController.deleteSpeciealitie = async (req, res) => {
  try {
    const specialitieFound = await specialitiesModel.findById(req.params.id);
    
    await specialitiesModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Specialities deleted" });
 
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
export default specialitesController;