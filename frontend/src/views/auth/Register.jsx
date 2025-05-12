
import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="container mt-5">
      <h2>Registrati</h2>
      <RegisterForm />
      <div className="text-center mt-3">
        <p>Hai già un account? <a href="/login">Accedi</a></p>
      </div>
    </div>
  );
};

export default Register;
