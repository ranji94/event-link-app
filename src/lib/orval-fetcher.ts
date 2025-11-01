import { env } from "@/lib/env";
export const orvalFetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${env.apiUrl}${url}`, {
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
