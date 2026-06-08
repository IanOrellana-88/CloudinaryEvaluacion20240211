import {Schema, Schema, model} from"mongoose";

const quotesSchema = new Schema (
    {
        patiend_id: { type: String},
        specialitie_id: {type: String},
        appointmentDate: {type: Date},
        reason: {type: String},
        observations: {type: String}
    },
    {timeStamps: true,
        strict: false,
    },
);

export default model ("Quotes", quotesSchema);