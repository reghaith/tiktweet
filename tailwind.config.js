/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
   	extend: {
   		fontFamily: {
   			sans: [
   				'Inter',
   				'system-ui',
   				'sans-serif'
   			]
   		},
    	 	colors: {
    			background: 'hsl(var(--background))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			'card-foreground': '#E5E7EB',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			'primary-foreground': '#E5E7EB',
    			'muted-foreground': '#9CA3AF',
    			foreground: 'hsl(var(--foreground))',
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
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
                repost: 'hsl(var(--repost))',
         },
         customColors: {
             background: 'hsl(216 1% 5%)',
             card: 'hsl(221 2% 10%)',
             repost: 'hsl(142 76% 36%)',
         },
    	backgroundImage: {
    			'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))'
    	},
    	borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)',
             xs: '0.25rem',
             tweet: '0.5rem',
             container: '1rem'
    	}
    	}
    	},
   plugins: [require("tailwindcss-animate")],
}
