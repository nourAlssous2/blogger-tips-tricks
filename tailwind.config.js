/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{jsx,js}',
        './components/**/*.{js,jsx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                cairo: ['var(--font-cairo)'],
            },
            container: {
                center: true,
                padding: 20
            },
            backgroundColor: {
                'dark': '#0f0f0f',
            },
        },
    },
    plugins: [],
}

