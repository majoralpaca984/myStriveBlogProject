
import React from "react";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="container mt-5">
      <h2>Accedi</h2>
      <LoginForm />
      <div className="text-center mt-3">
        <p>Non hai un account? <a href="/register">Registrati</a></p>
      </div>
    </div>
  );
};

export default Login;
