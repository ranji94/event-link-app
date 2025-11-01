export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "EMAIL_ALREADY_USED"
  | "USER_NOT_FOUND"
  | "TOKEN_INVALID"
  | "TOKEN_EXPIRED"
  | "PASSWORD_WEAK"
  | "UNKNOWN";

export const AUTH_ERROR_COPY: Record<AuthErrorCode, string> = {
  INVALID_CREDENTIALS: "Nieprawidłowy email lub hasło.",
  EMAIL_ALREADY_USED: "Adres e-mail jest już zajęty.",
  USER_NOT_FOUND: "Użytkownik nie istnieje.",
  TOKEN_INVALID: "Nieprawidłowy token.",
  TOKEN_EXPIRED: "Sesja wygasła — zaloguj się ponownie.",
  PASSWORD_WEAK:
    "Hasło nie spełnia wymagań: min. 8 znaków, mała i wielka litera, cyfra oraz znak specjalny.",
  UNKNOWN: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
};

type Backend =
  | {
      errorCode?: string;
      message?: string | string[];
      error?: string;
      statusCode?: number;
    }
  | null
  | undefined;

export function normalizeAuthError(payload: Backend) {
  const raw = (payload?.errorCode as AuthErrorCode) ?? "UNKNOWN";
  const known = (Object.keys(AUTH_ERROR_COPY) as AuthErrorCode[]).includes(raw)
    ? (raw as AuthErrorCode)
    : "UNKNOWN";

  const backendMsg = Array.isArray(payload?.message)
    ? payload?.message[0]
    : payload?.message;

  return {
    code: known,
    message: AUTH_ERROR_COPY[known] ?? backendMsg ?? AUTH_ERROR_COPY.UNKNOWN,
  };
}
