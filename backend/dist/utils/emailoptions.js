"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTokenEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendTokenEmail = async (email, token) => {
    const msg = {
        to: email,
        from: 'dropzin01@gmail.com', // Endereço de email verificado no SendGrid
        subject: 'Seu Token de Autenticação',
        text: `Aqui está seu token de autenticação: ${token}`,
        html: `<p>Aqui está seu token de autenticação: <b>${token}</b></p>`,
    };
    try {
        await mail_1.default.send(msg);
        console.log('Email enviado');
    }
    catch (error) {
        console.error('Erro ao enviar email: ' + error);
    }
};
exports.sendTokenEmail = sendTokenEmail;
