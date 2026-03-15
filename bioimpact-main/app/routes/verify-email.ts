import { db } from "~/db.server";

export async function action({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const token = body.token as string | null;

    if (!token) {
      return new Response(JSON.stringify({ error: "Token missing" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const [rows]: any = await db.execute(
      "SELECT id FROM usuarios WHERE verification_token = ?",
      [token]
    );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await db.execute(
      "UPDATE usuarios SET verificado = true, verification_token = NULL WHERE id = ?",
      [rows[0].id]
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error verifying email:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}