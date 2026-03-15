  import { useState } from "react";
  import { Link, redirect, useActionData, Form } from "react-router";
  import { db } from "~/db.server";
  import { getSession, commitSession } from "~/session.server";
  import bcrypt from "bcrypt"; 

  
  export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const email    = formData.get("email")    as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Por favor llena todos los campos." };
    }

    try {
      const [rows]: any = await db.execute(
        "SELECT id, nombre, email, contrasena, verificado FROM usuarios WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return { error: "Correo o contraseña incorrectos." };
      }

      const usuario = rows[0];

      if (!usuario.verificado) {
        return { error: "Debes verificar tu cuenta antes de iniciar sesión." };
      }

      const contrasenaValida = await bcrypt.compare(password, usuario.contrasena);

      if (!contrasenaValida) {
        return { error: "Correo o contraseña incorrectos." }; 
      }

      const session = await getSession(request);
      session.set("userId", usuario.id);
      session.set("nombre", usuario.nombre);
      session.set("email",  usuario.email);

      return redirect("/cargando", {
        headers: { "Set-Cookie": await commitSession(session) },
      });

    } catch (err) {
      console.error("Error al conectar con la base de datos:", err);
      return { error: "Error del servidor. Intenta más tarde." };
    }
  }


  export default function Home() {
    const actionData = useActionData<typeof action>();
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");

    return (
      <div className="flex min-h-screen w-full font-[Poppins,Helvetica,sans-serif] ">

        {/* ── Panel izquierdo: imagen ── */}
        <div
          className="hidden md:block w-[42%] shrink-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/image-2.jpg')" }}
          aria-hidden="true"
        />

        <img 
          src="/Logo Bioimpact.png" 
          alt="Bioimpact Logo" 
          className="absolute top-8 left-8 md:top-6 md:left-6 w-[px] h-12 object-contain" 
        />

        {/* ── Panel derecho: formulario ── */}
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 bg-white relative">

          {/* Logo */}

          <div className="w-full max-w-[420px] flex flex-col">

            <h1 className="text-[52px] font-medium text-[#1a1f19] text-center mb-8 leading-tight">
              Inicia Sesión
            </h1>

            {/* Mensaje de error del servidor */}
            {actionData?.error && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">
                {actionData.error}
              </div>
            )}

            {/* method="post" hace que React Router llame al action() de arriba */}
            <Form method="post" className="flex flex-col gap-4">

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xl font-normal text-black">
                  Correo electrónico
                </label>
                <div className="flex items-center rounded-lg border border-[#0000006e] bg-white px-3 py-2.5">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@bioimpact.com.mx"
                    className="w-full text-[15px] font-thin text-black placeholder:text-[#1e1e1e69] bg-transparent outline-none border-none"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-xl font-normal text-black">
                  Contraseña
                </label>
                <div className="flex items-center rounded-lg border border-[#0000006e] bg-white px-3 py-2.5">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full text-[15px] font-thin text-black placeholder:text-[#1e1e1e69] bg-transparent outline-none border-none"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 w-full py-4 bg-[#485374] text-white font-medium rounded-2xl hover:bg-[#3a4460] transition-colors"
              >
                Iniciar sesión
              </button>
            </Form>

            {/* Olvidé contraseña */}
            <button
              type="button"
              onClick={() => console.log("Forgot password")}
              className="mt-6 text-[#2a2f06] font-medium text-lg text-center hover:underline"
            >
              Olvide mi contraseña
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-black/20" />
              <span className="text-[#00000096] font-medium text-lg whitespace-nowrap">
                Iniciar sesión con
              </span>
              <div className="flex-1 h-px bg-black/20" />
            </div>

           
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => console.log("Google login")}
              className="w-[85px] h-[54px] bg-[#d9d9d9] rounded-lg hover:bg-[#c9c9c9] transition-colors flex items-center justify-center"
              aria-label="Iniciar sesión con Google"
            >
              {/* Cambiamos la 'G' por la imagen */}
              <img 
                src="/logo_google.png" 
                alt="Google" 
                className="w-[34px] h-[34px] object-cover" 
              />
            </button>
          </div>

            {/* Crear cuenta */}
            <p className="mt-6 text-[15px] text-center text-[#00000096] font-medium">
              ¿No tienes una cuenta?{" "}
              <Link to="/registro" className="text-[#2b2f0c] underline hover:text-[#1a1f0a]">
                Crea una aquí
              </Link>
            </p>

          </div>
        </div>
      </div>
    );
  }