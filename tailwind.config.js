const { echoesPreset, echoesTypographyUtilities } = require('./.claude/skills/echoes-components/reference/tailwind.js');
const plugin = require('tailwindcss/plugin');

// Plugin to add Echoes typography utilities
const echoesUtilityPlugin = plugin(({ addUtilities }) => {
  addUtilities(echoesTypographyUtilities);
});

module.exports = {
  prefix: 'sw-', // All Tailwind classes will be prefixed with sw-

  theme: {
    extend: {
      spacing: echoesPreset.theme.spacing,
      height: echoesPreset.theme.height,
      width: echoesPreset.theme.width,
    },
  },

  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],

  corePlugins: {
    preflight: false, // Disable to avoid conflicts with existing styles
  },

  plugins: [echoesUtilityPlugin],
};
