/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,html}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:    '#619BB6',
          dark:       '#4A7D96',
          light:      '#EDF5F8',
          secondary:  '#BAD7E1',
          'secondary-dark': '#9BBFCC',
        },
        ink: {
          DEFAULT: '#1A2832',
          secondary: '#4A6572',
          muted: '#7A9BAD',
          disabled: '#A8C4CF',
        },
        surface: {
          page:  '#F8FAFB',
          card:  '#FFFFFF',
          muted: '#EDF5F8',
          input: '#FFFFFF',
        },
        line: {
          DEFAULT: '#E2EDF2',
          focus:   '#619BB6',
          input:   '#D0E4EA',
        },
      },
    },
  },
  plugins: [],
}
