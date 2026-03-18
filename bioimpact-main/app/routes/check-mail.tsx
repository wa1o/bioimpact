import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

const fondo = "/fondo-verificacion.jpg"; 

export default function CheckMail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [errorConexion, setErrorConexion] = useState(false);

  useEffect(() => {
    if (!email) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/check-status?email=${encodeURIComponent(email)}`);
        
        if (!res.ok) throw new Error("Error en la respuesta");
        
        const data = await res.json();

        if (data.verificado === true) {
          clearInterval(interval);
          // Redirigimos directo al dashboard o login con mensaje de éxito
          navigate("/dashboard?verified=true", { replace: true });
        }
        setErrorConexion(false);
      } catch (error) {
        console.error("Error en la verificación:", error);
        setErrorConexion(true); // Avisamos al usuario si hay problemas de red
      }
    }, 3000); 

    return () => clearInterval(interval);
  }, [email, navigate]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-[Poppins,sans-serif]">
      {/* Background */}
      <img className="absolute inset-0 w-full h-full object-cover" src={fondo} alt="Fondo" />
      <div className="absolute inset-0 bg-black/50" />

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-lg">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-full border border-blue-400/30">
          <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">¡Revisa tu correo!</h1>
        <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
          Hemos enviado un enlace de confirmación a: <br />
          <span className="font-semibold text-blue-300 underline decoration-blue-300/30 underline-offset-4">
            {email}
          </span>
        </p>
        
        <div className="flex flex-col items-center gap-4 bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
          {errorConexion ? (
            <p className="text-red-300 text-sm">Reconectando con el servidor...</p>
          ) : (
            <>
              <div className="w-8 h-8 border-3 border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-[0.2em] font-light text-blue-200">
                Esperando confirmación en tiempo real
              </p>
            </>
          )}
        </div>

        <p className="mt-8 text-sm opacity-60">
          ¿No recibiste nada? Revisa tu carpeta de spam o solicita un nuevo enlace.
        </p>
      </div>

      {/* Logo con Hover Funcional */}
      <div className="absolute top-8 left-8 z-10 group flex items-center gap-4">
        <Link to="/" className="transition-transform duration-300 hover:scale-110">
          <img className="w-[52px] h-auto object-contain" alt="Logo" src="/Logo Bioimpact Blanco.avif" />
        </Link> 
      </div>
    </div>
  );
}