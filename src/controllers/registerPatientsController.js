import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import patientsModel from "../models/patients.js"

import {config} from "../../config.js";

const registerPatientsController = {};

registerPatientsController = async (req, res) => {
    const {name, lastName, birthdate, email, password, isVerified}
    = req.body;
}

try  { 
    const existPatient = await patientsModel.findOne({email});
    if (existPatient)
        return res.status(400).json({message: "Patient existe"})


const passwordHashed = await bcryptjs.hash(password,10);
const randomNumber = crypto.randomBytes(3).toString("hex");

const token = jsonwebtoken.sign({randomNumber, name ,lastName,birthdate, email, password: passwordHashed, isVerified},
    config.JWT.secret ,{
        expiresIn: "15m"},);

        res.cookie("registrationCookie",token,{maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                password:  config.email.user_password,
            },
        });

        const mailOptions = { 
            from: config.email.user_email,
            to: email,
            subject: "Verificacion de cuenta",
            text: 
            "Para verificar tu cuenta usa tu codigo:" + randomNumber + "expira en 15 minutos"
        };

        transporter.sendMail (mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error);
                return res.status(500).json({message: "Internal Server Error"});
            }
            return res.status(200).json({message: "Mensaje Enviado"});
        });
} catch (error) {
    console.log("error" + error);
    return res.status(500).json({message: "Internal Server Error"})
    ;}

registerPatientsController.verifyCode = async (req, res) => {
    try {
        const {
            verificationCodeRequest
        } = req.body;

        const token = req.cookie.registrationCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {
            randomNumber: storedCode, name, lastName, birthdate, email,
            password, isVerified,} = decoded;
            if (verificationCodeRequest !== storedCode) {
                return res.status (200).json ({message: "Invalid code"});
            }

            const newPatient = new patientsModel()
            name, lastName, birthdate, email, password, isVerified; true
        

        await newPatient.save();

        res.clearCookie ("registrarion Cookie")
        return res.status ("200").json({message: "Patient registred"});

    } catch (error) { 
        console.log("error" + error);
        return res.status (500).json ({message: "Interal server errror"})
    }
}

export default registerPatientsController;