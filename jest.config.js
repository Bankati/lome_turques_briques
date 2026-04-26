// @ts-check

// createJestConfig intègre automatiquement :
//   - Transformation SWC (même transpileur que Next.js en production)
//   - Alias @/* depuis tsconfig.json
//   - Mocks automatiques de next/navigation, next/router, next/image, etc.
const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  // jsdom simule le DOM du navigateur pour les tests de composants React.
  testEnvironment: "jsdom",

  // Exécuté après l'installation du framework de test (jest-dom, etc.)
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  testPathIgnorePatterns: ["/node_modules/", "/.next/"],

  // ── Couverture de code ─────────────────────────────────────────────────
  // Fichiers inclus dans le rapport — API routes et config Prisma exclus
  // car ils nécessitent une vraie base de données (tests d'intégration).
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/**/layout.tsx",
    "!src/app/**/loading.tsx",
    "!src/app/**/error.tsx",
    "!src/app/**/not-found.tsx",
    "!src/app/api/**",
    "!src/lib/prisma.ts",
    "!src/middleware.ts",
    "!src/**/__tests__/**",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}",
  ],

  coverageProvider: "v8",

  // Formats de sortie du rapport :
  //   text        → affiché dans le terminal
  //   lcov        → compatible Codecov, SonarQube, Coveralls
  //   html        → rapport visuel consultable dans coverage/lcov-report/
  //   json-summary → résumé JSON pour outils tiers
  coverageReporters: ["text", "lcov", "html", "json-summary"],

  // ── Seuils de couverture ───────────────────────────────────────────────
  // Actuellement à 0 % pour ne pas bloquer un projet qui démarre.
  //
  // Roadmap :
  //   Sprint 1 : atteindre 50 % → remplacer les 0 par 50
  //   Sprint 2 : atteindre 70 % → remplacer par 70
  //   Cible finale : 80 %       → remplacer par 80
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};

module.exports = createJestConfig(config);
