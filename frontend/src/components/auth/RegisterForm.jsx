import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton"; // opzionale se usi Google login

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("Form data:", formData);
      console.log("API URL:", process.env.REACT_APP_API_URL); 

      const response = await fetch(`${process.env.REACT_APP_API_URL}/authors/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registrazione fallita");
      }

      setSuccess("Registrazione completata! Verrai reindirizzato al login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Errore nella registrazione:", err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="form-group">
        <label>Nome</label>
        <input type="text" name="nome" className="form-control" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Cognome</label>
        <input type="text" name="cognome" className="form-control" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" className="form-control" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" className="form-control" onChange={handleChange} required />
      </div>

      {error && <div className="text-danger mt-2">{error}</div>}
      {success && <div className="text-success mt-2">{success}</div>}

      <button type="submit" className="btn btn-success mt-3">Registrati</button>

      <hr />
      <p className="text-center">oppure</p>
      <GoogleLoginButton /> {/* Se hai implementato il login Google */}
    </form>
  );
};

export default RegisterForm;
