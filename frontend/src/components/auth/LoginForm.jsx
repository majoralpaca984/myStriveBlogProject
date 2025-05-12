
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/authors/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login fallito");

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" className="form-control" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" className="form-control" onChange={handleChange} required />
      </div>
      {error && <div className="text-danger mt-2">{error}</div>}
      <button type="submit" className="btn btn-primary mt-3">Login</button>
    </form>
  );
};

export default LoginForm;
