import { Image, Film, BarChart3, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function TweetComposer() {
  const [content, setContent] = useState('');

  return (
    <Card className="border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 rounded-none p-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
            Y
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="relative">
            <textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-[15px] resize-none outline-none min-h-[60px] max-h-[200px]"
              rows={2}
            />
            {content && (
              <button
                onClick={() => setContent('')}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <Image className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <Film className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <BarChart3 className="h-5 w-5" />
              </Button>
            </div>

            <Button
              disabled={!content.trim()}
              className={cn(
                'px-5 py-2 rounded-full font-bold transition-all duration-200',
                content.trim()
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25'
                  : 'bg-primary/20 text-primary/40 cursor-not-allowed'
              )}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
