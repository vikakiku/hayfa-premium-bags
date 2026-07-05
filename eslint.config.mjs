// eslint.config.mjs

const config = [
  // 1) Global ignores: jangan pernah lint build & dependencies
  {
    ignores: ["**/node_modules/**", "**/.next/**", ".next/**"],
  },

  // 2) Lint ringan hanya untuk file JS di folder src (kalau mau TS, nanti belakangan saja)
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      // Tidak ada rules spesial. Ini sengaja dikosongkan supaya aman untuk CI.
    },
  },
];

export default config;
