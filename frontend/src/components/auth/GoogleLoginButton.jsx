import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/authors/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Errore login Google");

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Errore nel login con Google:", error);
    }
  };

  return (
    <div className="mt-3">
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login con Google fallito")} />
    </div>
  );
};

export default GoogleLoginButton;
