import { mockTweets } from '../data/mockTweets';
import { TweetCard } from './TweetCard';

export function TweetsFeed() {
  return (
    <div className="pt-16 max-w-2xl mx-auto min-h-screen bg-background">
      {mockTweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
