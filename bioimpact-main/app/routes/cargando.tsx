import { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router";
import { getSession } from "~/session.server";

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request);
  return { nombre: session.get("nombre") || "Usuario" };
}

export default function Cargando() {
  const data = useLoaderData<typeof loader>();
  const nombre = data?.nombre || "Usuario";
  
  const [pasoAnimacion, setPasoAnimacion] = useState(0);
  const navigate = useNavigate();

  // Animación de los puntos
  useEffect(() => {
    const interval = setInterval(() => {
      setPasoAnimacion((prev) => (prev + 1) % 3);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Redirección al dashboard tras 3 segundos
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  const dots = [
    { left: "left-0" },
    { left: "left-[35.71%]" },
    { left: "left-[71.42%]" },
  ];

  return (
    <main 
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/fondo_cargando.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <img
        className="absolute top-4 left-4 md:top-6 md:left-6 w-12 h-12 md:w-16 md:h-16 object-contain z-10"
        alt="Logo Bioimpact"
        src="/Logo Bioimpact Blanco.avif"
      />

      <div className="relative z-10 flex flex-col items-center gap-16 px-4">
        
        <p className="font-['Montserrat',sans-serif] font-bold text-white text-3xl md:text-4xl lg:text-5xl text-center max-w-3xl drop-shadow-md">
          ¡Bienvenido {nombre}! Estamos preparando todo para ti.
        </p>

        <div className="relative w-40 h-24 md:w-56 md:h-32" role="status" aria-label="Cargando">
          {dots.map((dot, index) => (
            <div
              key={index}
              className={`absolute w-[28%] h-[50%] bg-[#225727] rounded-full transition-all duration-300 ease-in-out shadow-lg ${dot.left} ${
                pasoAnimacion === index ? "top-0" : "top-[50%]"
              }`}
            />
          ))}
        </div>

      </div>
    </main>
  );
}