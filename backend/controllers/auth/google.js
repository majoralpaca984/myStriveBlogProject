import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import Author from "../../models/authorModels.js"; 

const client = new OAuth2Client();

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    let user = await Author.findOne({ email: payload.email });

    if (!user) {
      user = new Author({
        nome: payload.given_name,
        cognome: payload.family_name,
        email: payload.email,
        avatar: payload.picture,
        password: "google-oauth", // finta password (non usata)
      });
      await user.save();
    }

    const ourToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token: ourToken });
  } catch (error) {
    console.error("Errore login Google:", error);
    res.status(400).json({ message: "Token non valido" });
  }
};
