import mongoose from "mongoose";
import bcrypt from "bcrypt";

const authorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dataDiNascita: { type: String },
  avatar: { type: String },
  password: { type: String, required: true },
  googleId: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" }
});

// 🔐 Cripta la password prima del salvataggio
authorSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// metodo per il login
authorSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Author = mongoose.model("Author", authorSchema);
export default Author;
