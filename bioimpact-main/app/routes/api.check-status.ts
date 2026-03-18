import type { LoaderFunctionArgs } from "react-router";
import { db } from "~/db.server"; 

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return Response.json({ verificado: false, error: "Email requerido" }, { status: 400 });
  }

  try {
    const [rows]: any = await db.execute(
      "SELECT verificado FROM usuarios WHERE email = ? LIMIT 1",
      [email]
    );

    const usuario = rows[0];

    return { 
      verificado: usuario ? usuario.verificado === 1 : false 
    };
    
  } catch (error) {
    console.error("Error en DB:", error);
    return Response.json({ verificado: false, error: "Error de servidor" }, { status: 500 });
  }
}