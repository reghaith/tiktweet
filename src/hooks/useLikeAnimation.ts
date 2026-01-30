import { useState, useCallback } from 'react';

export function useLikeAnimation(initialLiked = false) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  }, []);

  return {
    isLiked,
    isAnimating,
    toggleLike,
  };
}
