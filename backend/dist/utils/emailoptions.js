"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTokenEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendTokenEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: email,
        from: 'dropzin01@gmail.com', // Endereço de email verificado no SendGrid
        subject: 'Seu Token de Autenticação',
        text: `Aqui está seu token de autenticação: ${token}`,
        html: `<p>Aqui está seu token de autenticação: <b>${token}</b></p>`,
    };
    try {
        yield mail_1.default.send(msg);
        console.log('Email enviado');
    }
    catch (error) {
        console.error('Erro ao enviar email: ' + error);
    }
});
exports.sendTokenEmail = sendTokenEmail;
