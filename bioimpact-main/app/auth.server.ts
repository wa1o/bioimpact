// app/auth.server.ts
import bcrypt from "bcrypt"; // Te recomiendo 'bcryptjs' para evitar líos de compilación
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import nodemailer from "nodemailer";
import { db } from "~/db.server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env localizado en la raíz del proyecto (bioimpact-main)


export async function registrarUsuario(formData: FormData) {
  const nombre = formData.get("nombre") as string;
  const apellido = formData.get("apellido") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const acceptTerms = formData.get("acceptTerms") === "on";
  console.log("Variable de correo:", process.env.MAIL_USER);

  // 1. Validaciones básicas
  if (!nombre || !apellido || !email || !password) {
    return { error: "Por favor llena todos los campos obligatorios." };
  }
  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden." };
  }
  if (!acceptTerms) {
    return { error: "Debes aceptar los términos y condiciones." };
  }

  try {
    // 2. Verificar si el usuario ya existe
    const [existing]: any = await db.execute(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return { error: "Este correo ya está registrado." };
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // ando testeando lo de las
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS:", process.env.MAIL_PASS ? "***" : "undefined");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const baseUrl = process.env.APP_URL || "http://localhost:5173";
    const verifyUrl = `${baseUrl}/verificacion?token=${verificationToken}`;
    
    try {
      await transporter.sendMail({
        from: `"Equipo BioImpact" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Verifica tu cuenta - BioImpact",
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Bienvenido a BioImpact</h2>
            <p>Haz clic en el botón para verificar tu cuenta:</p>
            <a href="${verifyUrl}" style="background: #485374; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px;">
              Verificar cuenta
            </a>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error enviando email:", emailError);
      return { error: "No se pudo enviar el email de verificación. Verifica tu conexión o intenta más tarde." };
    }

    // 6. Solo guardar en Base de Datos SI el email se envió exitosamente
    await db.execute(
      `INSERT INTO usuarios 
      (nombre, apellido, email, contrasena, verification_token, verificado) 
      VALUES (?, ?, ?, ?, ?, false)`,
      [nombre, apellido, email, hashedPassword, verificationToken]
    );

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Error en el servidor. Intenta más tarde." };
  }
}