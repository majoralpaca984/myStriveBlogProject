import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const apiUrl = process.env.REACT_APP_API_URL; // ✅ CORRETTO per CRA
    console.log("API URL:", apiUrl); // 🧪 DEBUG: verifica se è undefined

    if (!apiUrl) {
      setError("Variabile REACT_APP_API_URL non trovata. Controlla il file .env.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login fallito");
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error("Errore nel login:", err);
      setError(err.message || "Errore di rete");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {error && <div className="text-danger mt-2">{error}</div>}

      <button type="submit" className="btn btn-primary mt-3">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
