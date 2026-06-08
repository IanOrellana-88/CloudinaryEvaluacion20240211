//name
//lastName
//email
//password
//birthDate
//phone
//address
//bloodType
//phoneEmergencyContacts [{ phone, nameEmergencyContact }]
//profilePhoto
//isVerified
//loginAttempts
//timeOut


import {Schema, Schema, model} from"mongoose";

const patientsSchema = new Schema (
    {
        name: { type: String},
        lastName: { type: String},
        email: { type: String},
        password: {type: String},
        birthdate: { type: Date},
        phone: { type: String},
        address: { type: String},
        bloodType: { type: String},
        phoneEmergencyContacts: [{phone, nameEmergencyContact}],
        profilePhoto: {type: String},
        isVerified: { type: Boolean},
        loginAttemps: {type, Number},
        timeOut: {type: Date},
    },
    {timeStamps: true,
        strict: false,
    },
);

export default model ("Patients", patientsSchema);