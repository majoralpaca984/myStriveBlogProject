import express from "express";
import Author from "../models/authorModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { googleLogin } from "../controllers/auth/google.js";    



const router = express.Router();


// Google login con token 
router.post("/google", googleLogin);


//  LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body; 

  const user = await Author.findOne({ email });
  if (!user) return res.status(401).json({ message: "Credenziali non valide" });

  const isValid = await user.comparePassword(password); 
  if (!isValid) return res.status(401).json({ message: "Credenziali non valide" });

  // genera token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});



//REGISTRAZIONE
router.post("/register", async (req, res) => {
  const { nome, cognome, email, password } = req.body;

  if (!email || !password || !nome || !cognome) {
    return res.status(400).json({ message: "Compila tutti i campi obbligatori" });
  }

  const existing = await Author.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email già registrata" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAuthor = new Author({
    nome,
    cognome,
    email,
    password: hashedPassword,
    role: "user"
  });

  await newAuthor.save();
  res.status(201).json({ message: "Utente registrato" });
});

export default router;
