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
specialty_id,
appointmentDate,
reason,
status,
observations,
 } = req.body;
    
    const newQuote = new quotesModel({
        specialty_id,
appointmentDate,
reason,
status,
observations,
      
    });
 
    await newQuote.save();
 
    return res.status(200).json({ message: "Quote saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
// UPDATE
quotesController.UpdateQuote = async (req, res) => {
  try {
    const { specialty_id,
appointmentDate,
reason,
status,
observations, } = req.body;
    const quoteFound = await quotesModel.findById(req.params.id);
    const updatedData = { specialty_id,
appointmentDate,
reason,
status,
observations,};

    await quotesModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
    return res.status(200).json({ message: "Quote updated" });
 
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
// DELETE
quotesController.deleteQuote = async (req, res) => {
  try {
    const quoteFound = await quotesModel.findById(req.params.id);
    
    await quotesModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Quotes deleted" });
 
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
export default quotesController;