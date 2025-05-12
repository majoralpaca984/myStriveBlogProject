# 📝 MyBlogProject

Sistema completo **Full Stack** per la gestione di post, autori e commenti, con autenticazione basata su token (JWT) e frontend React.

---

## 📁 Struttura del progetto

```
MYBLOGPROJECT/
├── myBlogApi/          # 🟦 Backend Node.js + Express + MongoDB
└── myBlogFrontend/     # 🟩 Frontend React
```

---

## 🚀 Funzionalità principali

### 🟦 Backend (`myBlogApi`)
- CRUD completo per **autori**
- CRUD completo per **post**
- **Commenti embedded** nei post (GET, POST, PUT, DELETE)
- **Autenticazione JWT**
- Middleware per protezione delle rotte
- Upload immagini tramite **Multer + Cloudinary**
- Configurazione ambientale tramite `.env`

### 🟩 Frontend (`myBlogFrontend`)
- Login e Registrazione
- Salvataggio token nel `localStorage`
- Accesso protetto alle API
- Interfaccia per gestione post, commenti, profili

---

## 🛠️ Setup Backend (`myBlogApi`)

### 1. Vai nella cartella del backend

```bash
cd myBlogApi
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Crea il file `.env`

```env
MONGODB_URI=la-tua-uri-mongodb
JWT_SECRET=supersegreto123456
PORT=3001
```

### 4. Avvia il server

```bash
npm run dev
```

Server disponibile su `http://localhost:3001`

---

## 🔐 Autenticazione JWT

- `POST /login` → restituisce un token di accesso
- `GET /authors/me` → restituisce l'autore collegato al token
- Tutti gli altri endpoint richiedono header:

```
Authorization: Bearer <token>
```

---

## 🧑‍💻 Setup Frontend (`myBlogFrontend`)

### 1. Vai nella cartella del frontend

```bash
cd myBlogFrontend
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Avvia il frontend

```bash
npm run dev
```

L'app sarà visibile su `http://localhost:5173` (o simile, se usi Vite)

---

## 📦 Tecnologie usate

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Multer, Cloudinary
- **Frontend**: React, React Router, Fetch/Axios, Bootstrap/Tailwind (in base al setup)
- **Altro**: Dotenv, Cors

---

## 📬 Contatti

Sviluppato da Eleonora 

---