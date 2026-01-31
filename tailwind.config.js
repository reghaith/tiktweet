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
  				'Outfit',
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
    			'card-foreground': '#F4F4F5',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))',
    				hover: 'hsl(var(--primary-hover))',
    				glow: 'hsl(var(--primary-glow))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			'primary-foreground': '#F4F4F5',
    			'muted-foreground': '#A1A1AA',
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
                pink: 'hsl(var(--accent-pink))',
                blue: 'hsl(var(--accent-blue))',
                green: 'hsl(var(--accent-green))',
          },
          customColors: {
              background: 'hsl(240 10% 4%)',
              card: 'hsl(240 5% 11%)',
              repost: 'hsl(142 71% 45%)',
          },
    	backgroundImage: {
    			'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))'
    	},
    	borderRadius: {
    			lg: 'var(--radius-lg)',
    			md: 'var(--radius-md)',
    			sm: 'var(--radius-sm)',
              xs: '0.25rem',
              tweet: '0.5rem',
              container: '1rem'
    	}
    	}
    	},
    plugins: [require("tailwindcss-animate")],
}
