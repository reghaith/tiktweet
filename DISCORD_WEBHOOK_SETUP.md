# Discord Webhook Video URL Integration

This document explains how to integrate Discord webhook for video URLs in the TikTweet app.

## Overview

The Shorts mode currently uses placeholder videos from Mixkit. To use your own videos from a Discord webhook, follow these steps.

## Setup

### 1. Create a Discord Webhook

1. Go to your Discord server settings
2. Navigate to "Integrations" → "Webhooks"
3. Create a new webhook
4. Copy the webhook URL

### 2. Update mockShorts Data

Edit `/src/data/mockShorts.ts` and replace the `videoUrl` values with your Discord video URLs.

```typescript
export const mockShorts: Short[] = [
  {
    id: 1,
    creator: "Your Channel",
    avatar: "...",
    caption: "...",
    audio: "...",
    videoUrl: "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_TOKEN", // Replace with actual video URL
    likes: 24500,
    comments: 342,
  },
  // ... more shorts
];
```

### 3. Alternative: Fetch from Webhook

If you want to dynamically fetch videos from a Discord webhook, create a new utility:

```typescript
// src/lib/discord.ts
export async function fetchVideosFromWebhook(webhookUrl: string) {
  try {
    const response = await fetch(webhookUrl);
    const data = await response.json();
    // Extract video URLs from the response
    return data.attachments?.map((att: any) => att.url) || [];
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return [];
  }
}
```

### 4. Use in ShortsFeed

Update `ShortsFeed.tsx` to fetch videos dynamically:

```typescript
import { useEffect, useState } from 'react';
import { ShortItem } from './ShortItem';
import type { Short } from '../data/mockShorts';

export function ShortsFeed() {
  const [shorts, setShorts] = useState<Short[]>([]);

  useEffect(() => {
    // Fetch videos from your Discord webhook
    fetch('YOUR_DISCORD_WEBHOOK_URL')
      .then(res => res.json())
      .then(data => {
        // Transform Discord data to Short format
        const transformedShorts = data.attachments.map((att: any, index: number) => ({
          id: index,
          creator: "Discord User",
          avatar: "...",
          caption: "From Discord",
          audio: "Unknown",
          videoUrl: att.url,
          likes: 0,
          comments: 0,
        }));
        setShorts(transformedShorts);
      });
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="max-w-md mx-auto h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {shorts.map((short) => (
          <ShortItem key={short.id} short={short} />
        ))}
      </div>
    </div>
  );
}
```

## Important Notes

1. **Video Formats**: Ensure Discord webhook returns video URLs in supported formats (MP4, WebM, etc.)
2. **CORS**: Discord webhooks may have CORS restrictions. You might need a proxy server.
3. **Rate Limits**: Discord has rate limits on webhooks. Implement proper error handling and retry logic.
4. **Security**: Never commit webhook URLs with sensitive tokens to public repositories. Use environment variables.

## Environment Variables

Create a `.env` file in your project root:

```
VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
```

Access in your code:

```typescript
const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
```

## Testing

1. Test with placeholder videos first to ensure UI works
2. Then test with your Discord webhook URLs
3. Verify videos autoplay, loop correctly, and snap scrolling works

## Current Placeholder Videos

The app currently uses these placeholder videos:
- Coding keyboard scene
- Beach waves
- Developer workspace
- Abstract technology lines
- Software developer coding

These will be replaced with your Discord webhook videos once integrated.
