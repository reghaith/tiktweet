import { Search, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const trendingTopics = [
  {
    category: 'Technology · Trending',
    topic: '#WebDesign',
    posts: '24.5K posts',
  },
  {
    category: 'Art · Trending',
    topic: 'Digital Minimalism',
    posts: '12.1K posts',
  },
  {
    category: 'Design · Trending',
    topic: 'UI Animations',
    posts: '8.9K posts',
  },
  {
    category: 'Music · Live',
    topic: 'Synthwave',
    posts: '5.3K posts',
  },
];

const followSuggestions = [
  {
    name: 'Sarah UI',
    handle: '@sarah_ux',
    avatar: 'https://picsum.photos/seed/user1/40/40',
  },
  {
    name: 'CodeMaster',
    handle: '@dev_jones',
    avatar: 'https://picsum.photos/seed/user2/40/40',
  },
];

export function TrendingSidebar() {
  return (
    <aside className="w-[350px] pl-5 hidden lg:block h-screen overflow-y-auto py-[30px]">
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-3xl p-3 flex items-center gap-3 mb-6">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Vibe..."
            className="bg-transparent border-none text-foreground w-full outline-none text-sm"
          />
        </div>

        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h3 className="text-lg font-bold mb-4 text-foreground">Trends for you</h3>
          <div className="space-y-4">
            {trendingTopics.map((item, index) => (
              <div
                key={index}
                className="flex justify-between cursor-pointer group"
              >
                <div>
                  <span className="text-xs text-muted-foreground block mb-[2px]">{item.category}</span>
                  <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{item.topic}</span>
                  <span className="text-xs text-muted-foreground block">{item.posts}</span>
                </div>
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-lg font-bold mb-4 text-foreground">Who to follow</h3>
          <div className="space-y-4">
            {followSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                    <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{suggestion.name}</div>
                    <div className="text-muted-foreground text-xs">{suggestion.handle}</div>
                  </div>
                </div>
                <Button className="bg-white text-black border-none px-3.5 py-1.5 rounded-2xl font-semibold text-xs cursor-pointer hover:bg-white/90">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
