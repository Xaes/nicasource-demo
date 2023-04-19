/** @type {import('tailwindcss').Config} */

module.exports = {
    plugins: [require("@tailwindcss/line-clamp")],
    content: [
        "./index.html",
        "./src/styles/global.css",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    }
}
