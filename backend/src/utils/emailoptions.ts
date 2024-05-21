import sgMail from '@sendgrid/mail';
import { config } from "dotenv";

config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendTokenEmail = async (email: any, token: any) => {
  const msg = {
    to: email,
    from: 'dropzin01@gmail.com', // Endereço de email verificado no SendGrid
    subject: 'Seu Token de Autenticação',
    text: `Aqui está seu token de autenticação: ${token}`,
    html: `<p>Aqui está seu token de autenticação: <b>${token}</b></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email enviado');
  } catch (error) {
    console.error('Erro ao enviar email: ' + error);
  }
};

