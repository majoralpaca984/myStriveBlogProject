import sgMail from "@sendgrid/mail";
import { sendEmail } from "../controllers/auth/emailController.js";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// Funzione per inviare un'email

export const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: "Campi obbligatori mancanti" });
  }

  const msg = {
    to,
    from: process.env.SENDER_EMAIL,
    subject,
    text,
    html: html || `<p>${text}</p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email inviata con successo" });
  } catch (error) {
    console.error("Errore invio email:", error);
    res.status(500).json({ message: "Errore invio email", error: error.message });
  }
};
