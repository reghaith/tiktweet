import { MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const trendingTopics = [
  {
    category: 'Technology · Trending',
    topic: '#React19',
    posts: '125K posts',
  },
  {
    category: 'Entertainment · Trending',
    topic: 'New Features',
    posts: '89K posts',
  },
  {
    category: 'Sports · Trending',
    topic: 'Super Bowl',
    posts: '234K posts',
  },
  {
    category: 'Music · Trending',
    topic: 'Grammys 2026',
    posts: '167K posts',
  },
  {
    category: 'Gaming · Trending',
    topic: '#GamingSetup',
    posts: '56K posts',
  },
];

export function TrendingSidebar() {
  return (
    <aside className="w-[350px] pl-4 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-4">
        <Card className="glass-card p-4 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-foreground">Today's News</h2>
          <div className="space-y-4">
            {trendingTopics.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer p-2 -m-2 rounded-lg transition-all duration-200 hover:bg-white/5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {item.topic}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{item.posts}</p>
                  </div>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full mt-4 text-primary hover:bg-primary/10 rounded-full text-sm font-medium"
          >
            Show more
          </Button>
        </Card>

        <Card className="glass-card p-4 rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⚡</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-sm mb-1">Subscribe to Premium</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Subscribe to unlock new features and get a blue checkmark.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                Subscribe
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-xs text-muted-foreground space-x-2 px-2">
          <a href="#" className="hover:underline transition-colors">Terms of Service</a>
          <span>·</span>
          <a href="#" className="hover:underline transition-colors">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:underline transition-colors">Cookie Policy</a>
          <span>·</span>
          <a href="#" className="hover:underline transition-colors">Accessibility</a>
          <span>·</span>
          <a href="#" className="hover:underline transition-colors">Ads info</a>
          <span>·</span>
          <span>© 2026 TikTweet</span>
        </div>
      </div>
    </aside>
  );
}
