import tseslint from 'typescript-eslint'
import astroeslintparser from 'eslint-plugin-astro'

export default [
  ...astroeslintparser.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...tseslint.configs.recommended.find((c) => c.rules && Object.keys(c.rules).length > 0),
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'astro-temp/', '*.config.mjs', '.astro/'],
  },
]
