import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      'gray-100': '#f8f9fa',
      'gray-200': '#e9ecef',
      'gray-300': '#dee2e6',
      'gray-400': '#ced4da',
      'gray-500': '#adb5bd',
      'gray-600': '#6c757d',
      'gray-700': '#495057',
      'gray-800': '#343a40',
      'gray-900': '#212529',
      'primary-light': '#ed21b6',
      primary: '#D4009B',
      'text-primary': '#334155',
      'text-secondary': '#64748B',
      hover: '#F8F9FA',
      line: '#DEE2E6',
      party1: '#8082FF',
      party2: '#F4A76F',
      party3: '#57D2A9',
      background: '#E9ECEF',
    },
  },
  plugins: [],
};
export default config;
