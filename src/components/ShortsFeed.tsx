import { useState, useEffect } from 'react';
import { mockShorts } from '../data/mockShorts';
import { ShortItem } from './ShortItem';
import { Skeleton } from '@/components/ui/skeleton';

export function ShortsFeed() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="h-full w-full flex justify-center bg-black/50 hidden md:flex lg:flex">
        <div className="h-full w-full max-w-[400px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
          {mockShorts.map((short) => (
            <ShortItem key={short.id} short={short} />
          ))}
        </div>
      </div>
      <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide md:hidden lg:hidden">
        {mockShorts.map((short) => (
          <ShortItem key={short.id} short={short} />
        ))}
      </div>
    </>
  );
}
