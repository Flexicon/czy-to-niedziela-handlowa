import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    plugins: ['oxc', 'typescript', 'unicorn', 'react'],
    jsPlugins: ['eslint-plugin-astro'],
    categories: {
      correctness: 'warn',
    },
    env: {
      builtin: true,
    },
    ignorePatterns: ['dist/', 'node_modules/', 'astro-temp/', '*.config.mjs', '.astro/'],
    rules: {
      'astro/missing-client-only-directive-value': 'error',
      'astro/no-conflict-set-directives': 'error',
      'astro/no-deprecated-astro-canonicalurl': 'error',
      'astro/no-deprecated-astro-fetchcontent': 'error',
      'astro/no-deprecated-astro-resolve': 'error',
      'astro/no-deprecated-getentrybyslug': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
      'astro/valid-compile': 'error',
    },
    overrides: [
      {
        files: ['*.astro', '**/*.astro'],
        globals: {
          Fragment: 'readonly',
        },
        env: {
          astro: true,
          node: true,
        },
      },
      {
        files: ['**/*.astro/*.js', '*.astro/*.js', '**/*.astro/*.ts', '*.astro/*.ts'],
        rules: {
          'prettier/prettier': 'off',
        },
        jsPlugins: ['eslint-plugin-prettier'],
        globals: {
          AudioWorkletGlobalScope: 'readonly',
          AudioWorkletProcessor: 'readonly',
          currentFrame: 'readonly',
          currentTime: 'readonly',
          registerProcessor: 'readonly',
          sampleRate: 'readonly',
          WorkletGlobalScope: 'readonly',
        },
        env: {
          browser: true,
        },
      },
      {
        files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
        rules: {
          'constructor-super': 'off',
          'getter-return': 'off',
          'no-class-assign': 'off',
          'no-const-assign': 'off',
          'no-dupe-class-members': 'off',
          'no-dupe-keys': 'off',
          'no-func-assign': 'off',
          'no-import-assign': 'off',
          'no-new-native-nonconstructor': 'off',
          'no-obj-calls': 'off',
          'no-redeclare': 'off',
          'no-setter-return': 'off',
          'no-this-before-super': 'off',
          'no-undef': 'off',
          'no-unreachable': 'off',
          'no-unsafe-negation': 'off',
          'no-var': 'error',
          'no-with': 'off',
          'prefer-const': 'error',
          'prefer-rest-params': 'error',
          'prefer-spread': 'error',
        },
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    sortPackageJson: false,
    ignorePatterns: [
      'node_modules',
      'dist',
      '.astro',
      'astro-temp',
      '*.lock',
      'package-lock.json',
      'pnpm-lock.yaml',
      'yarn.lock',
      '.env',
      '.env.*',
      '!.env.example',
    ],
  },
})
