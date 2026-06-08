
import {Schema, Schema, model} from"mongoose";

const equipmentsSchema = new Schema (
    {
        equipmentName: { type: String},
        description: { type: String},
        brand: { type: String},
        model: {type: String},
        purschaseDate: { type: Date},
        maintenanceDate: { type: Date},
        location: { type: String},
        image: { type: String},
        status: {type: Boolean},
        isAvaliable: { type: Boolean},
    },
    {timeStamps: true,
        strict: false,
    },
);

export default model ("equipments", equipmentsSchema);