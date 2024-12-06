import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: [
		'bg-red-600',
		'bg-blue-600',
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: 'hsl(var(--primaryVar), 90%)',
					100: 'hsl(var(--primaryVar), 80%)',
					200: 'hsl(var(--primaryVar), 70%)',
					300: 'hsl(var(--primaryVar), 60%)',
					400: 'hsl(var(--primaryVar), 50%)',
					500: 'hsl(var(--primaryVar), 40%)',
					600: 'hsl(var(--primaryVar), 30%)',
					700: 'hsl(var(--primaryVar), 20%)',
					800: 'hsl(var(--primaryVar), 10%)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					50: 'hsl(var(--secondaryVar), 90%)',
					100: 'hsl(var(--secondaryVar), 80%)',
					200: 'hsl(var(--secondaryVar), 70%)',
					300: 'hsl(var(--secondaryVar), 60%)',
					400: 'hsl(var(--secondaryVar), 50%)',
					500: 'hsl(var(--secondaryVar), 40%)',
					600: 'hsl(var(--secondaryVar), 30%)',
					700: 'hsl(var(--secondaryVar), 20%)',
					800: 'hsl(var(--secondaryVar), 10%)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
					50: 'hsl(var(--mutedVar), 98%)',
					100: 'hsl(var(--mutedVar), 90%)',
					200: 'hsl(var(--mutedVar), 85%)',
					300: 'hsl(var(--mutedVar), 80%)',
					400: 'hsl(var(--mutedVar), 70%)',
					500: 'hsl(var(--mutedVar), 60%)',
					600: 'hsl(var(--mutedVar), 50%)',
					700: 'hsl(var(--mutedVar), 40%)',
					800: 'hsl(var(--mutedVar), 30%)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					50: 'hsl(var(--accentVar), 90%)',
					100: 'hsl(var(--accentVar), 80%)',
					200: 'hsl(var(--accentVar), 70%)',
					300: 'hsl(var(--accentVar), 60%)',
					400: 'hsl(var(--accentVar), 50%)',
					500: 'hsl(var(--accentVar), 40%)',
					600: 'hsl(var(--accentVar), 30%)',
					700: 'hsl(var(--accentVar), 20%)',
					800: 'hsl(var(--accentVar), 10%)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
					50: 'hsl(var(--destructiveVar), 90%)',
					100: 'hsl(var(--destructiveVar), 80%)',
					200: 'hsl(var(--destructiveVar), 70%)',
					300: 'hsl(var(--destructiveVar), 60%)',
					400: 'hsl(var(--destructiveVar), 50%)',
					500: 'hsl(var(--destructiveVar), 40%)',
					600: 'hsl(var(--destructiveVar), 30%)',
					700: 'hsl(var(--destructiveVar), 20%)',
					800: 'hsl(var(--destructiveVar), 10%)'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				defaultTextColor: 'var(--default-text-color)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			screens:{
				xs: '480px'
			}
		}
    },
	plugins: [require("tailwindcss-animate")],
};
export default config;