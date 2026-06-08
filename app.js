import express from "express";
import cookieParser from "cookie-parser";
import patientsRouter from "../src/routes/patients.js"
import registerPatientRouter from "../src/routes.registerPatients.js"
import limiter from "./src/middlewares/limiter.js";
import loginPatientsRouter from "./src/routes/loginPatients.js";
import specialitiesRouter from "./src/routes/specialities.js"
import quotesRouter from "./src/models/quotes.js";
import filesRouter from "./src/models/files.js"
import equipmentsRouter from "./src/models.equipments.js"

import cors from "cors";

const app = express();

app.use  (
    cors ({ origin: ["http://localhost:5173", "http:localhost:5174"],
        credentials: true,
    }),
);


app.use(limiter)
app.use(cookieParser());
app.use("api/login", loginPatientsRouter);
app.use("api/register", registerPatientRouter);
app.use("api/Patients", patientsRouter);
app.use("api/specialities", specialitiesRouter);
app.use("api/quotes", quotesRouter);
app.use("api/files", filesRouter),
app.use("api/quipments", equipmentsRouter);


export default app;