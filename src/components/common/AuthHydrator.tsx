"use client";

import { useEffect } from "react";
import { hydrateAuth } from "@/lib/auth-store";

/** Na starcie dociąga /users/me i wpisuje do store */
export function AuthHydrator() {
  useEffect(() => {
    hydrateAuth();
  }, []);
  return null;
}
