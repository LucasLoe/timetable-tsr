/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			transitionProperty: {
				"height": "height",
				"width": "width",
				"spacing": "margin, padding",
			},
		},
	},
	plugins: [],
};