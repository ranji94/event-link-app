export const API_BASE_URL = (() => {
  const useProxy = process.env.NEXT_PUBLIC_USE_PROXY === "true";
  if (useProxy) return "/api"; // dev: idziemy przez rewrites w Next.js
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4010").replace(
    /\/+$/,
    ""
  );
})();

export const orvalFetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
