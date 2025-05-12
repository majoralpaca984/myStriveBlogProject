import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import Author from '../models/authorModels.js';
import { authMiddleware } from '../config/middlewares/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage });

// GET /user/me → dati utente loggato
router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

// PATCH /user/:id/avatar → aggiorna avatar con Cloudinary
router.patch('/:id/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    const updated = await Author.findByIdAndUpdate(
      req.params.id,
      { avatar: req.file.path },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
