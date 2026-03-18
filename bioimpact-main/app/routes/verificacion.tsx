import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router"; // Importa useNavigate

export default function Verificacion() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Inicializa el hook
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch("/verify-email", {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          setStatus("success");

          setTimeout(() => {
            navigate("https://localhost:5173/"); // Redirige al inicio de sesión después de 3 segundos
          }, 3000);
          
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    if (token) verify();
    else setStatus("error");
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[Poppins, Sans-serif] relative overflow-hidden">
      <div className="w-full h-screen bg-cover bg-center bg-no-cover"
        style={{ backgroundImage: "url('/fondo-verificacion.jpg')" }}
      />

      <div className="absolute top-8 left-8 z-10 group flex items-center gap-4">
        <Link to="/" className="transition-transform duration-300 hover:scale-110">
          <img className="w-[52px] h-auto object-contain" alt="Logo" src="/Logo Bioimpact Blanco.avif" />
        </Link>
      </div>
      
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">

        {status === "verifying" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
            <h2 className="text-2xl font-semibold">Verificando tu cuenta...</h2>
          </div>
        )}
        
        {status === "success" && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600">Cuenta verificada</h2>
            <p className="mt-2 text-gray-600">Serás redirigido al inicio de sesión en unos segundos...</p>
          </div>
        )}
        
        {status === "error" && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600">Token inválido o expirado</h2>
            <p className="mt-2">Por favor, solicita un nuevo enlace de verificación.</p>
          </div>
        )}
      </div>
    </div>
  );
}