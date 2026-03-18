import { env } from "process";
import { createCookieSessionStorage } from "react-router";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name:     "__session",
    secrets:  [process.env.SESSION_SECRET ?? "23c8733220e0b3e4e3f8926eb482f908ab9ea3c4b1e5c8a9f0e7b2d9f"],
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