import { Image, File, Smile, X } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function TweetComposer() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      console.log('Posting:', content);
      setContent('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="px-5 py-4 border-b border-border flex gap-4">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarFallback className="bg-gradient-to-br from-primary to-pink text-white font-bold text-lg">
            Y
          </AvatarFallback>
        </Avatar>
        <div
          className="flex-1 min-w-0 cursor-text"
          onClick={() => setIsOpen(true)}
        >
          <div className="text-muted-foreground text-lg">What's happening?</div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-card w-full max-w-[550px] rounded-lg p-6 border border-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold">New Post</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-4 mb-5">
              <Avatar className="h-12 w-12 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-primary to-pink text-white font-bold text-lg">
                  Y
                </AvatarFallback>
              </Avatar>
              <textarea
                placeholder="What's happening?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-lg resize-none outline-none min-h-[100px]"
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <div className="flex gap-3 text-primary">
                <button className="hover:text-primary-hover transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <button className="hover:text-primary-hover transition-colors">
                  <File className="w-5 h-5" />
                </button>
                <button className="hover:text-primary-hover transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className={cn(
                  'px-6 py-2.5 rounded-2xl font-semibold transition-colors',
                  content.trim()
                    ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
