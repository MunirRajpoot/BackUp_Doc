module.exports = {
    content: [

        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}', // If using App Router
    ],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
};
