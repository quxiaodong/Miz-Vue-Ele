import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        parser: '@typescript-eslint/parser'
      }
    }
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
]
