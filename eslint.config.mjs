import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",

      // Generated Prisma/type artifacts
      "prisma/schema.d.ts",

      // Local AI/editor skill files are not application source
      ".agents/**",
      ".claude/**",
      ".cursor/**",
      ".devin/**",

      // Nested/accidental project copy
      "umer-mobile-parts/**",
    ],
  },
]);
