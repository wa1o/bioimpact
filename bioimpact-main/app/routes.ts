import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Safari/Chrome Devtools probe
  route(".well-known/*", "routes/well-known.tsx"),
  index("routes/home.tsx"),
  route("registro",  "routes/registro.tsx"),
  route("check-mail", "routes/check-mail.tsx"),
  route("verificacion", "routes/verificacion.tsx"),
  route("verify-email", "routes/verify-email.ts"),
  route("dashboard", "routes/dashboard.tsx"),
  route("cargando", "routes/cargando.tsx"),
  route("api/check-status", "routes/api.check-status.ts"),
] satisfies RouteConfig;
