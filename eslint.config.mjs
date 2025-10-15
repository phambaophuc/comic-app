import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import pluginImport from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    plugins: {
      import: pluginImport,
    },
    rules: {
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',     // Node.js built-ins
            'external',    // Packages from npm
            'internal',    // Aliases like @/...
            ['parent', 'sibling', 'index'], // Local files
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next',
              group: 'external',
              position: 'after',
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },

  },
];

export default eslintConfig;
