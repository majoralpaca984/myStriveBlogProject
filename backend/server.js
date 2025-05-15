import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import emailRoutes from './routes/email.js';

import googleAuthRoutes from './routes/passportGoogle.js';
import './config/passport.js';

import authorRoutes from './routes/authors.js';
import blogPostRoutes from './routes/blogposts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js'; // /me e /:id/avatar

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware globali
app.use(cors({
  origin: ["http://localhost:3000", "https://mystriveblogproject1.vercel.app"],
  credentials: true,
}));

app.use(express.json());

app.use ("/email", emailRoutes);

// Session & Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());



app.use(cors({
  origin: ['http://localhost:3000', 'https://my-strive-blog-project.vercel.app'],
  credentials: true
}));


// Route di autenticazione con Google
app.use('/auth', googleAuthRoutes);

// Route API
app.use('/authors', authorRoutes);       // CRUD autori
app.use('/blogposts', blogPostRoutes);   // CRUD blog post + commenti
app.use('/auth', authRoutes);            // login e registrazione classici
app.use('/user', userRoutes);            // /me e avatar

// Test route
app.get('/', (req, res) => {
  res.send('Hello from MyBlogProgect!');
});

// Connessione a MongoDB e avvio server
const initServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connesso a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server avviato su http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Errore di connessione a MongoDB:', error);
  }
};

initServer();
