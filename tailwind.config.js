module.exports = {
    content: [

        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}', // If using App Router
    ],
    theme: {
        extend: {
            keyframes: {
                shuffle: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-10%)' },
                    '50%': { transform: 'translateX(10%)' },
                    '75%': { transform: 'translateX(-5%)' },
                },
            },
            animation: {
                shuffle: 'shuffle 2s ease-in-out infinite',
            },
        },
    },
};
