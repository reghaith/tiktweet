import { Home, Search, Bell, Bookmark, User, Edit, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Explore', active: false },
    { icon: Bell, label: 'Notifications', active: false },
    { icon: Bookmark, label: 'Bookmarks', active: false },
    { icon: User, label: 'Profile', active: false },
  ];

  return (
    <>
      <aside className={cn('fixed left-0 top-0 h-screen w-[260px] border-r border-border bg-background flex flex-col px-5 py-[30px] z-40 hidden md:flex', className)}>
        <div className="text-[28px] font-bold text-foreground mb-10 flex items-center gap-2.5">
          <span className="text-primary text-[32px]">⚡</span>
          <span className="tracking-[-0.5px]">Vibe</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2.5">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                'flex items-center gap-4 p-3.5 rounded-lg transition-all duration-300 cursor-pointer font-medium text-lg',
                item.active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
              )}
            >
              <item.icon className="w-[22px] h-[22px]" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <Button
          className="mt-7 bg-gradient-to-br from-primary to-primary-hover text-white border-none px-4 py-4 rounded-[30px] text-base font-semibold cursor-pointer shadow-[0_10px_20px_-5px_var(--primary-glow)] hover:-translate-y-0.5 transition-transform duration-200 flex items-center justify-center gap-2"
        >
          <Edit className="w-5 h-5" />
          <span>Post</span>
        </Button>

        <div className="mt-auto flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-primary to-pink text-white font-bold">
              Y
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-bold text-sm text-foreground">Alex Designer</p>
            <p className="text-muted-foreground text-xs">@alexcreates</p>
          </div>
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 h-[60px] border-t border-border bg-background flex items-center justify-around px-4 z-50 md:hidden">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              'p-3 transition-all duration-300 cursor-pointer',
              item.active ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <item.icon className="w-[24px] h-[24px]" />
          </button>
        ))}
      </nav>

      <div className="fixed bottom-[80px] right-5 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_4px_15px_var(--primary-glow)] z-40 md:hidden cursor-pointer">
        <Edit className="w-6 h-6" />
      </div>
    </>
  );
}
