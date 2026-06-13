/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // slate-900
        card: 'rgba(30, 41, 59, 0.7)', // slate-800 with opacity for glassmorphism
        accent: '#8b5cf6', // violet-500
        'accent-hover': '#7c3aed', // violet-600
        xp: '#fbbf24', // amber-400
        success: '#10b981', // emerald-500
        error: '#ef4444', // red-500
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}
