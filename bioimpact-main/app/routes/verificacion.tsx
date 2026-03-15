import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function Verificacion() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verify = async () => {
      const res = await fetch("/verify-email", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    };

    if (token) verify();
    else setStatus("error");
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {status === "verifying" && <h2>Verificando tu cuenta...</h2>}
      {status === "success" && (
        <>
          <h2>Cuenta verificada ✅</h2>
          <p>Puedes <a href="/">iniciar sesión</a> ahora.</p>
        </>
      )}
      {status === "error" && <h2>Token inválido ❌</h2>}
    </div>
  );
}