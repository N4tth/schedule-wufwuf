/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ];
  export const theme = {
    extend: {
      colors:{
        'olivine': {
          '50': '#f5f9ec',
          '100': '#e7f0d7',
          '200': '#d1e3b3',
          '300': '#accc7b',
          '400': '#96bc5f',
          '500': '#78a141',
          '600': '#5d7f31',
          '700': '#476229',
          '800': '#3c4f25',
          '900': '#344423',
          '950': '#19240f',
        }, 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    
    },
  };
  export const plugins = [];