import express from "express";
import cookieParser from "cookie-parser";
import patientsRouter from "../src/routes/patients.js"
import registerPatientRouter from "../src/routes.registerPatients.js"
import limiter from "./src/middlewares/limiter.js";
import loginPatientsRouter from "./src/routes/loginPatients.js";
import specialitiesRouter from "./src/routes/specialities.js"
import quotesRouter from "./src/models/quotes.js";

import cors from "cors";

const app = express();

app.use  (
    cors ({ origin: ["http://localhost:5173", "http:localhost:5174"],
        credentials: true,
    }),
);


app.use(limiter)
app.use(cookieParser());

app.use("api/", );

export default app;