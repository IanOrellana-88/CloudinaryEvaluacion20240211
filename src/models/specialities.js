import {Schema, Schema, model} from"mongoose";

const specialitiesSchema = new Schema (
    {
        specialitieName: { type: String},
        description: {type: String},
        isAvaliable: {type: Boolean}
    },
    {timeStamps: true,
        strict: false,
    },
);

export default model ("Specialities", specialitiesSchema);