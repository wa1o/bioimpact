import { useState, useEffect } from "react";
import { Link, useActionData, Form, useNavigate, useNavigation } from "react-router"; 
import { registrarUsuario } from "~/auth.server"; 

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const resultado = await registrarUsuario(formData);
  
  if (resultado.error) return { error: resultado.error };
  return { success: true, email: formData.get("email") };
}

export default function Registro() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const estaEnviando = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      navigate(`/check-mail?email=${encodeURIComponent(String(actionData.email))}`);
    }
  }, [actionData, navigate]);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex min-h-screen w-full font-[Poppins,Helvetica,sans-serif]">
      {/* Panel Izquierdo: Formulario */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 bg-white relative">
        <div className="w-full max-w-[420px] flex flex-col gap-0">
          <h1 className="text-[52px] font-medium text-[#1a1f19] text-center mb-8 leading-tight">
            Regístrate
          </h1>

          {/* Mostrar error si el servidor lo devuelve */}
          {actionData?.error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">
              {actionData.error}
            </div>
          )}

          {/* Usamos <Form> de react-router para que gestione el envío automáticamente */}
          <Form method="post" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="nombre" className="text-xl font-normal text-black">Nombre</label>
              <div className="flex items-center rounded-lg border border-[#0000006e] bg-white px-3 py-2.5">
                <input type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" className="w-full text-[15px] font-thin text-black bg-transparent outline-none border-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="apellido" className="text-xl font-normal text-black">Apellido</label>
              <div className="flex items-center rounded-lg border border-[#0000006e] bg-white px-3 py-2.5">
                <input type="text" id="apellido" name="apellido" required value={formData.apellido} onChange={handleInputChange} placeholder="Apellido" className="w-full text-[15px] font-thin text-black bg-transparent outline-none border-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xl font-normal text-black">Correo electrónico</label>
              <div className="flex items-center rounded-lg border border-[#0000006e] bg-white px-3 py-2.5">
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="usuario@bioimpact.com.mx" className="w-full text-[15px] font-thin text-black bg-transparent outline-none border-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-xl font-normal text-black">Contraseña</label>
              <div className="flex items-center rounded-lg border border-[#0000006e] bg-white px-3 py-2.5">
                <input type="password" id="password" name="password" required value={formData.password} onChange={handleInputChange} placeholder="Contraseña" className="w-full text-[15px] font-thin text-black bg-transparent outline-none border-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-xl font-normal text-black">Confirme su contraseña</label>
              <div className="flex items-center rounded-lg border border-[#0000006e] bg-white px-3 py-2.5">
                <input type="password" id="confirmPassword" name="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} placeholder="Contraseña" className="w-full text-[15px] font-thin text-black bg-transparent outline-none border-none" />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mt-1">
              <div className="relative mt-0.5 w-6 h-6 shrink-0 rounded border border-blue-700 bg-blue-50 flex items-center justify-center">
                <input type="checkbox" name="acceptTerms" required checked={formData.acceptTerms} onChange={handleInputChange} className="sr-only" />
                {formData.acceptTerms && <span className="text-blue-700 text-sm font-bold">✓</span>}
              </div>
              <span className="text-[15px] font-medium text-[#00000096] leading-snug">
                Acepto los términos y condiciones
              </span>
            </label>

            <button 
              type="submit" 
              disabled={estaEnviando}
              className={`mt-2 w-full py-4 text-white font-medium rounded-2xl transition-all ${
                estaEnviando ? "bg-gray-400 cursor-not-allowed" : "bg-[#485374] hover:bg-[#3a4460]"
              }`}
            >
              {estaEnviando ? "Procesando..." : "Registrarse"}
            </button>
          </Form>

          <p className="mt-6 text-[15px] text-center text-[#00000096] font-medium">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/" className="text-[#2b2f0c] underline">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>

      {/* Panel Derecho: Imagen */}
      <div className="hidden md:block w-[42%] shrink-0 bg-gray-300 bg-cover bg-center" style={{ backgroundImage: "url('/image-2.jpg')" }} />
      
      {/* Logo con el Hover corregido (usando 'group') */}
      <div className="absolute top-6 right-6 z-10 group flex flex-col items-end">
        <Link to="/">
          <img className="w-[95px] h-auto object-contain transition-transform duration-300 group-hover:scale-110" alt="Logo" src="/Logo Bioimpact.png" />
        </Link>
      </div>
    </div>
  );
}