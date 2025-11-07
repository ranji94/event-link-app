import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Umożliwia ukończenie builda mimo błędów TS (RYZYKO: możesz wdrożyć błąd do prod)
    ignoreBuildErrors: true,
  },
  // @ts-expect-error
  eslint: {
    // Opcjonalnie: nie przerywaj builda przez błędy ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
