export interface Short {
  id: number;
  creator: string;
  avatar: string;
  caption: string;
  audio: string;
  videoUrl: string;
  likes: number;
  comments: number;
}

export const mockShorts: Short[] = [
  {
    id: 1,
    creator: "Tech Vibes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechVibes",
    caption: "Coding at 2am hits different ☕ #devlife #programming #coding",
    audio: "Lofi Beats - Coding Vibes 🎵",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-dramatically-43299-large.mp4",
    likes: 24500,
    comments: 342,
  },
  {
    id: 2,
    creator: "Design Daily",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DesignDaily",
    caption: "The perfect gradient formula 🎨 #ui #design #webdev",
    audio: "Chill Synthwave - Sunset Drive 🌅",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-rocks-1090-large.mp4",
    likes: 18900,
    comments: 289,
  },
  {
    id: 3,
    creator: "React Master",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ReactMaster",
    caption: "useState vs useRef - when to use what? 🤔 #react #hooks #javascript",
    audio: "Coding Music - Focus Mode 🧠",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-monitor-close-up-1728-large.mp4",
    likes: 31200,
    comments: 567,
  },
  {
    id: 4,
    creator: "Motion Magic",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MotionMagic",
    caption: "Smooth transitions = happy users ✨ #animation #framer #ux",
    audio: "Upbeat Pop - Happy Vibes 😊",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
    likes: 42100,
    comments: 678,
  },
  {
    id: 5,
    creator: "Build Fast",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BuildFast",
    caption: "Vite makes development feel like magic 🚀 #vite #webdev #speed",
    audio: "Electronic - Future Bass 🔊",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-lines-background-4133-large.mp4",
    likes: 28700,
    comments: 423,
  },
];
