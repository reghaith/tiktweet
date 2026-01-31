import { Home, Search, Bell, User, MoreHorizontal, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Search', active: false },
    { icon: Bell, label: 'Notifications', active: false },
    { icon: User, label: 'Profile', active: false },
  ];

  return (
    <>
      <aside className={cn('fixed left-0 top-0 h-screen w-20 border-r border-white/5 bg-background/95 backdrop-blur-md flex flex-col items-center py-4 gap-2 z-40 hidden md:flex', className)}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
          <Zap className="w-6 h-6 text-white" />
        </div>

        <nav className="flex-1 flex flex-col gap-2 w-full px-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="icon"
              className={cn(
                'h-12 w-12 rounded-full transition-all duration-200 hover:bg-primary/20 group',
                item.active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </Button>
          ))}
        </nav>

        <div className="mt-auto px-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full text-muted-foreground hover:bg-white/10"
          >
            <MoreHorizontal className="h-6 w-6" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary mt-3 mx-auto" />
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-white/5 bg-background/95 backdrop-blur-md flex items-center justify-around px-4 z-50 md:hidden">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="icon"
            className={cn(
              'h-10 w-10 rounded-full transition-all duration-200 hover:bg-primary/20 group',
              item.active ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </Button>
        ))}
      </nav>
    </>
  );
}
