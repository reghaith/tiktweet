import { mockShorts } from '../data/mockShorts';
import { ShortItem } from './ShortItem';

export function ShortsFeed() {
  return (
    <div className="h-screen w-full">
      <div className="max-w-md mx-auto h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {mockShorts.map((short) => (
          <ShortItem key={short.id} short={short} />
        ))}
      </div>
    </div>
  );
}
