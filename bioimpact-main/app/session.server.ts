import { createCookieSessionStorage } from "react-router";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name:     "__session",
    secrets:  [process.env.SESSION_SECRET ?? "dev-secret-cambiame"],
    sameSite: "lax",
    httpOnly: true,  
    secure:   process.env.NODE_ENV === "production",
    maxAge:   60 * 60 * 8, 
  },
});

export const getSession    = (request: Request) =>
  sessionStorage.getSession(request.headers.get("Cookie"));

export const commitSession  = sessionStorage.commitSession;
export const destroySession = sessionStorage.destroySession;