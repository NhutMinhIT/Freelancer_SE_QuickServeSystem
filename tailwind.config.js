/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "white": {
                    100: "#ffffff",
                    200: "#ffffff",
                    300: "#ffffff",
                    400: "#ffffff",
                    500: "#ffffff",
                    600: "#ffffff",
                    700: "#ffffff",
                    800: "#ffffff",
                    900: "#ffffff",
                },
                "black": {
                    100: "#000000",
                    200: "#000000",
                    300: "#000000",
                    400: "#000000",
                    500: "#000000",
                    600: "#000000",
                    700: "#000000",
                    800: "#000000",
                    900: "#000000",
                },
                "gray": {
                    100: "#f7fafc",
                    200: "#edf2f7",
                    300: "#e2e8f0",
                    400: "#cbd5e0",
                    500: "#a0aec0",
                    600: "#718096",
                    700: "#4a5568",
                    800: "#2d3748",
                    900: "#1a202c",
                },
                "red": {
                    100: "#fff5f5",
                    200: "#fed7d7",
                    300: "#feb2b2",
                    400: "#fc8181",
                    500: "#f56565",
                    600: "#e53e3e",
                    700: "#c53030",
                    800: "#9b2c2c",
                    900: "#742a2a",
                },
                "orange": {
                    100: "#fffaf0",
                    200: "#feebc8",
                    300: "#fbd38d",
                    400: "#f6ad55",
                    500: "#ed8936",
                    600: "#dd6b20",
                    700: "#c05621",
                    800: "#9c4221",
                    900: "#7b341e",
                },
            }
        }
    },
    plugins: [],
    variants: {
        extend: {
            display: ['focus-group'],
        }
    }
}