import type { NextConfig } from "next";
import pkg from "./package.json";

const nextConfig: NextConfig = {
  // Bakes the real package.json version (bumped by semantic-release on every
  // release commit to main) into the client bundle at build time, so the
  // footer's version display never goes stale the way a static version.json
  // committed once and never regenerated would.
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

export default nextConfig;
