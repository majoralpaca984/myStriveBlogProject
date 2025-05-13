import express from "express";
import Author from "../models/authorModels.js";
import { authMiddleware } from "../config/middlewares/authMiddleware.js";
import { checkRole } from "../config/middlewares/checkRole.js";


const router = express.Router();



// GET tutti gli autori (PUBBLICA per ora)
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET autore per ID
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "Autore non trovato" });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT aggiornamento autore
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Accesso negato" });
    }

    const updated = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Autore non trovato" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE autore
router.delete("/:id", authMiddleware, checkRole("admin"), async (req, res) => {
  try {
    const deleted = await Author.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Autore non trovato" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
