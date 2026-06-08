import patientsModel from "../models/patients.js";
import nodemailer from "nodemailer";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";


const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Paciente = require('../models/Paciente');
 
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
 
    try {
        const paciente = await Paciente.findOne({ email });
        if (!paciente) {
            return res.status(404).json({ message: "Si el correo existe se envio" });
        }
 
        const token = crypto.randomBytes(20).toString('hex');
 
        paciente.resetPasswordToken = token;
        paciente.resetPasswordExpires = Date.now() + 3600000;
 
        await paciente.save();
 
        const resetUrl = `http//${token}`;
 
        res.status(200).json({ message: "Correo de recuperación enviado" });
 
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor.", error });
    }
};
 
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
 
    try {
        const paciente = await Paciente.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
 
        if (!paciente) {
            return res.status(400).json({ message: "El token es invalido o ha expirado." });
        }
 
        const salt = await bcrypt.genSalt(10);
        paciente.password = await bcrypt.hash(password, salt);
 
        paciente.resetPasswordToken = undefined;
        paciente.resetPasswordExpires = undefined;
        paciente.loginAttempts = 0;
        paciente.timeOut = null;
 
        await paciente.save();
 
        res.status(200).json({ message: "Contraseña actualizada correctamente." });
 
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor.", error });
    }
};

