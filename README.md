# 📝 MyBlogProject

Full-stack blog app with **React (frontend)** and **Express/MongoDB (backend)**.

---

## 📁 Project Structure

```
myBlogProject_CLEAN/
├── frontend/   # React app using Vite
└── backend/    # Express.js API with MongoDB
```

---

## ⚙️ Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Make sure to fill in your `.env` file with MongoDB, Cloudinary, and JWT values.

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Make sure `VITE_API_URL` points to your backend.

---

## 🔐 Features

- User registration/login (JWT)
- Blog posts CRUD
- Comments
- Image upload (Cloudinary)
- Admin role support (protected routes)

---

## 🛡️ Security

- JWT authentication
- Role-based access
- Cloudinary for secure image hosting
