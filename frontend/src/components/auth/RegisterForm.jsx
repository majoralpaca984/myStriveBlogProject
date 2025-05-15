
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";  

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/authors/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Registrazione fallita");

      setSuccess("Registrazione completata! Verrai reindirizzato al login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
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
      <GoogleLoginButton />

    </form>
  );
};

export default RegisterForm;
