/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        taskBox: "rgb(var(--task-box))",
        activeTask: "rgb(var(--active-task))",
        finishedTask: "rgb(var(--finished-task))",
        primaryText: "rgb(var(--primary-text))",
        dividerCircle: "rgb(var(--divider-circle))",
        hover: "rgb(var(--hover))",

        currentPage: "rgb(var(--current-page))",
        gradientStart: "rgb(var(--gradient-start))",
        gradientEnd: "rgb(var(--gradient-end))",
      },
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'],
      },
      backgroundImage: {
        'mobile_light': "url('./src/assets/images/bg-mobile-light.jpg')", 
        'desktop_light': "url('./src/assets/images/bg-desktop-light.jpg')",
        'mobile_dark': "url('./src/assets/images/bg-mobile-dark.jpg')",
        'desktop_dark': "url('./src/assets/images/bg-desktop-dark.jpg')",
      }
    },    
  },
  plugins: [],
}

  