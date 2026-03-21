/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    // Brand palette — named colors prohibited, enforce token usage
    'color-named': 'never',

    // Allow 6-digit hex for readability (intentional in design tokens)
    'color-hex-length': null,

    // Allow legacy rgba() notation (browser compat)
    'color-function-notation': null,
    'color-function-alias-notation': null,
    'alpha-value-notation': null,

    // Allow compact single-line declarations (intentional for this codebase)
    'declaration-block-single-line-max-declarations': null,

    // Allow -webkit- prefixes required for Safari
    'property-no-vendor-prefix': null,

    // Allow currentColor casing
    'value-keyword-case': ['lower', {
      ignoreFunctions: [],
      ignoreKeywords: ['currentColor'],
      ignoreProperties: [],
    }],

    // Allow min-width: Xpx media queries (not range notation)
    'media-feature-range-notation': null,

    // Typography enforcement — only Geist family
    'font-family-name-quotes': 'always-where-recommended',

    // Architectural constraints
    'selector-max-id': 2,
    'max-nesting-depth': 3,
    'declaration-block-no-redundant-longhand-properties': true,

    // Allow env() function
    'function-no-unknown': [true, {
      ignoreFunctions: ['env'],
    }],

    // CSS custom property naming
    'custom-property-pattern': '^[a-z][a-z0-9-]*$',

    // Relax for single-file HTML
    'no-empty-source': null,
  },

  overrides: [
    {
      files: ['**/*.html'],
      customSyntax: 'postcss-html',
    },
  ],
};
