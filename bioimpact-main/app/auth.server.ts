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
    
    const [existing]: any = await db.execute(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return { error: "Este correo ya está registrado." };
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    
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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body, table, td, p, a { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
          table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
          table { border-collapse: collapse !important; }
        </style>
      </head>
      <body style="margin: 0 !important; padding: 0 !important; background-color: #f4f4f4;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table border="0" cellpadding="0" cellspacing="0" width="680" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td align="center" style="padding: 10px 40px; font-family: Arial, sans-serif; font-size: 12px; color: #3f3f3f; opacity: 0.5;">
                    Si tienes problemas para ver este correo, haz clic <a href="#" style="color: #3f3f3f;">aquí</a>.
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 0 40px;">
                    <hr style="border: 0; border-top: 1px solid #d1d1d1; margin: 0;">
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 40px 20px 40px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="60%" valign="top" style="font-family: Arial, sans-serif;">
                          <h1 style="margin: 0; color: #42505c; font-size: 48px; line-height: 56px; font-weight: bold;">
                            ¡Solo un paso más ${nombre}!
                          </h1>
                          <p style="margin: 25px 0 0 0; color: #3f3f3f; font-size: 14px; line-height: 24px;">
                            Haz clic en el botón <strong>“¡Da click aquí para confirmar!”</strong> para autenticar tu nueva cuenta.
                          </p>
                        </td>
                        <td width="40%" align="right" valign="middle">
                          <img src="cid:logo_bioimpact" alt="BioImpact" width="220" style="display: block; border-radius: 10px;">
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr><td style="font-family: Arial, sans-serif; font-size: 12px; color: #333333; padding-bottom: 5px;">Link de Activación</td></tr>
                      <tr>
                        <td style="border: 1px solid #d1d1d1; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="font-family: Arial, sans-serif; font-size: 14px; color: #000000; opacity: 0.6;">${verifyUrl}</td>
                              <td align="right" style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;">
                                <a href="${verifyUrl}" style="color: #225727; text-decoration: none;">COPIAR URL</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="left" style="padding: 0 40px 40px 40px;">
                    <table border="0" cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#225727" style="border-radius: 4px;">
                          <a href="${verifyUrl}" target="_blank" style="padding: 18px 0; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; display: block; width: 100%;">
                            ¡Da click aquí para confirmar!
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px 40px 40px 40px; font-family: Arial, sans-serif; font-size: 11px; color: #3f3f3f; line-height: 18px; opacity: 0.6;">
                    Si no solicitaste este correo, puedes ignorarlo. Haz clic en <a href="#" style="color: #3f3f3f;">Darse de baja</a> en cualquier momento.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: 'Logo Bioimpact.png',
        path: './public/Logo Bioimpact.png', 
        cid: 'logo_bioimpact' 
      }
    ]
  });
    }catch (emailError) {
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