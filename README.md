# TikTweet

A social media feed prototype combining Twitter's density with TikTok's immersive experience, built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

### 🐦 Tweets Mode
- X-style vertical feed with 8 sample tweets
- Avatar, name, handle, and timestamp
- Optional media attachments
- Action buttons: Message, Repost, Like, Share
- Hover effects on all action icons
- Heart icon pops (scale animation) when liking

### 📱 Shorts Mode
- TikTok-style full-screen video feed with 5 shorts
- Snap scrolling (snap-y snap-mandatory)
- Auto-playing, muted, looped videos
- Right sidebar: avatar, like, comment, share, spinning vinyl
- Bottom overlay: creator name, caption, scrolling audio ticker
- Double-tap anywhere on video for heart animation
- Responsive design (centered on desktop, full width on mobile)

### ✨ Animations & Interactions
- Smooth mode switching with AnimatePresence
- Spring-based pill toggle animation
- Like button scale animations (1.2 → 1.0)
- Double-tap heart overlay for shorts
- Vinyl infinite rotation
- Scrolling audio ticker
- Hover color transitions

### 🎨 Design System
- Dark-first theme with custom color palette
- Background: #0B0D10 (near-black)
- Card: #141821
- Primary: #3B82F6 (Electric Blue)
- Secondary: #EC4899 (Neon Pink)
- Inter font family
- Backdrop blur effects

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Strict mode enabled

## Getting Started

### Installation

```bash
cd tiktweet
npm install
```

### Development

```bash
npm run dev
```

The app will be available at http://localhost:5173/

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx       # Sticky header with toggle
│   ├── ModeSwitcher.tsx     # Pill-shaped animated toggle
│   ├── TweetCard.tsx        # X-style tweet component
│   ├── TweetsFeed.tsx       # Vertical scroll feed
│   ├── ShortItem.tsx        # TikTok-style short
│   └── ShortsFeed.tsx       # Fullscreen snap feed
├── data/
│   ├── mockTweets.ts        # 8 sample tweets
│   └── mockShorts.ts        # 5 sample shorts with videos
├── hooks/
│   └── useLikeAnimation.ts  # Like animation hook
├── lib/
│   └── utils.ts             # cn utility function
├── App.tsx                  # Main app with mode state
├── index.css                # Tailwind + custom styles
└── main.tsx                 # React entry point
```

## Customization

### Change Color Theme

Edit `tailwind.config.js`:

```javascript
colors: {
  background: '#YOUR_COLOR',
  card: '#YOUR_COLOR',
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
}
```

### Add More Tweets

Edit `src/data/mockTweets.ts`:

```typescript
export const mockTweets: Tweet[] = [
  {
    id: 9,
    name: "Your Name",
    handle: "@yourhandle",
    avatar: "avatar-url",
    content: "Your tweet content",
    media: "optional-image-url",
    likes: 0,
    reposts: 0,
    comments: 0,
    timestamp: "now",
  },
  // ... add more
];
```

### Add More Shorts

Edit `src/data/mockShorts.ts`:

```typescript
export const mockShorts: Short[] = [
  {
    id: 6,
    creator: "Your Channel",
    avatar: "avatar-url",
    caption: "Your caption",
    audio: "Your audio track",
    videoUrl: "your-video-url.mp4",
    likes: 0,
    comments: 0,
  },
  // ... add more
];
```

## Discord Webhook Integration

See [DISCORD_WEBHOOK_SETUP.md](./DISCORD_WEBHOOK_SETUP.md) for detailed instructions on integrating Discord webhook for video URLs.

## Current Video Sources

The Shorts mode currently uses placeholder videos from Mixkit:
- Coding keyboard scene
- Beach waves
- Developer workspace
- Abstract technology lines
- Software developer coding

These can be replaced with your own videos or Discord webhook content.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized bundle size with Vite
- Code splitting with dynamic imports
- Efficient animations with Framer Motion
- Lazy-loaded videos
- CSS-in-JS with Tailwind for minimal runtime overhead

## License

MIT

## Credits

Built with ❤️ using React, Vite, Tailwind CSS, and Framer Motion.
Icons by Lucide React.
Videos from Mixkit.
Avatars from DiceBear.
