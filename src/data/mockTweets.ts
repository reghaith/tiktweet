export interface Tweet {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  content: string;
  media?: string;
  likes: number;
  reposts: number;
  comments: number;
  timestamp: string;
}

export const mockTweets: Tweet[] = [
  {
    id: 1,
    name: "Alex Rivera",
    handle: "@arivera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    content: "Just shipped my first React component with Framer Motion! 🚀 The animations are buttery smooth. #react #frontend",
    likes: 142,
    reposts: 23,
    comments: 12,
    timestamp: "2h",
  },
  {
    id: 2,
    name: "Sarah Chen",
    handle: "@sarahcodes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "Working on a TikTok-style video feed prototype. The snap scrolling with Framer Motion is surprisingly powerful 🎬",
    media: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    likes: 289,
    reposts: 56,
    comments: 34,
    timestamp: "4h",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    handle: "@marcusdev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    content: "Pro tip: Always test your animations on mobile devices. What looks smooth on desktop can feel janky on lower-powered phones 📱",
    likes: 89,
    reposts: 15,
    comments: 8,
    timestamp: "6h",
  },
  {
    id: 4,
    name: "Emily Zhang",
    handle: "@emilyz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content: "Dark mode isn't just a preference anymore - it's accessibility. Always include a light/dark toggle in your apps 🌙",
    likes: 356,
    reposts: 89,
    comments: 67,
    timestamp: "8h",
  },
  {
    id: 5,
    name: "James Wilson",
    handle: "@jwilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    content: "The hardest part of building social features isn't the UI - it's the edge cases. Always test with real users! 🧪",
    likes: 412,
    reposts: 102,
    comments: 89,
    timestamp: "12h",
  },
  {
    id: 6,
    name: "Nina Patel",
    handle: "@ninap",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
    content: "Just discovered Lucide React - so clean and lightweight! Perfect for modern web apps 🎨",
    likes: 178,
    reposts: 34,
    comments: 21,
    timestamp: "15h",
  },
  {
    id: 7,
    name: "David Kim",
    handle: "@dkimdev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    content: "Building a new prototype that combines Twitter's density with TikTok's immersion. Here's a sneak peek 👀",
    media: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    likes: 567,
    reposts: 134,
    comments: 112,
    timestamp: "18h",
  },
  {
    id: 8,
    name: "Rachel Torres",
    handle: "@racheltech",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
    content: "Remember: Performance is a feature. Users won't notice fast animations, but they'll definitely notice slow ones ⚡",
    likes: 234,
    reposts: 67,
    comments: 45,
    timestamp: "1d",
  },
];
