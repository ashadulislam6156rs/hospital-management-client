export const AUTH_STORAGE_KEY = "hospital-auth-session";

export const STATIC_USER = {
  name: "Admin User",
  email: "admin@hospital.com",
  password: "hospital123",
  role: "Super Admin",
};

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function serializeUserSession(user) {
  return JSON.stringify({
    name: user.name,
    email: user.email,
    role: user.role,
  });
}

export function parseUserSession(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function isValidStaticCredentials(email, password) {
  return (
    normalizeEmail(email) === STATIC_USER.email &&
    String(password || "") === STATIC_USER.password
  );
}
