import { logout } from "./auth-store";

export const API_BASE_URL = (() => {
  const useProxy = process.env.NEXT_PUBLIC_USE_PROXY === "true";
  if (useProxy) return "/api"; // dev/prod: proxy/rewrite przez Next.js -> same-origin cookies
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4010").replace(
    /\/+$/,
    ""
  );
})();

type OrvalError = Error & { status?: number; body?: string };

let refreshPromise: Promise<void> | null = null;

async function refreshTokens(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await safeText(res);
          const err = new Error("Refresh failed") as OrvalError;
          err.status = res.status;
          err.body = body;
          throw err;
        }
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function safeLogout() {
  try {
    await logout();

    if (typeof window !== "undefined") {
      const from = window.location.pathname + window.location.search;
      window.location.href = `/login?from=${encodeURIComponent(from)}`;
    }
  } catch {
    // jeżeli nie chcesz importować store tutaj – zostaw pusto; logout i tak czyści store w finally
  }
}

function isRefreshUrl(url: string) {
  // dostosuj, jeśli masz inną ścieżkę
  return /\/auth\/refresh\b/.test(url);
}

async function safeJson<T>(res: Response): Promise<T> {
  // czasem 204/205 bez body
  if (res.status === 204 || res.status === 205)
    return undefined as unknown as T;
  const text = await res.text();
  if (!text) return undefined as unknown as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    // nie-JSON: oddaj surowy tekst jak błąd wyżej
    const err = new Error("Invalid JSON in response") as OrvalError;
    err.status = res.status;
    err.body = text;
    throw err;
  }
}

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

export const orvalFetcher = async <T>(
  url: string,
  options?: RequestInit & { _retry?: boolean }
): Promise<T> => {
  const fullUrl = `${API_BASE_URL}${url}`;
  const init: RequestInit & { _retry?: boolean } = {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  };

  const doFetch = () => fetch(fullUrl, init);

  let res = await doFetch();

  // Jeśli OK — zwróć od razu
  if (res.ok) return safeJson<T>(res);

  // Jeśli 401 i to nie jest refresh oraz nie próbowaliśmy jeszcze retrynu
  if (res.status === 401 && !init._retry && !isRefreshUrl(url)) {
    try {
      await refreshTokens(); // single-flight
      // retrial
      init._retry = true;
      res = await doFetch();
      if (res.ok) return safeJson<T>(res);
    } catch (e) {
      await safeLogout();
      // refresh nieudany — polecimy w dół do rzutu błędu z oryginału / retrynu
    }
  }

  // Zbuduj sensowny błąd z kodem i body (Orval inaczej tego nie pokaże)
  const body = await safeText(res);
  const err = new Error(body || res.statusText) as OrvalError;
  err.status = res.status;
  err.body = body;
  throw err;
};
