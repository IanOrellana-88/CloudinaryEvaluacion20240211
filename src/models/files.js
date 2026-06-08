import {Schema, Schema, model} from"mongoose";

const fileSchema = new Schema (
    {
        patiend_id: { type: String},
        diagnosis: {type: String},
        medications: {type: String},
        medicationsNotes: {type: String}
    },
    {timeStamps: true,
        strict: false,
    },
);

export default model ("files", fileSchema);