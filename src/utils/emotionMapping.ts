import type { EmotionType } from '@/types';

// Map emotions to search keywords
export const EMOTION_TO_SEARCH_QUERY: Record<EmotionType, string[]> = {
    happy: ['happy music', 'upbeat songs', 'feel good music', 'dance hits'],
    sad: ['sad songs', 'melancholic music', 'emotional piano', 'broken heart songs'],
    angry: ['aggressive rock', 'heavy metal', 'workout music', 'intense music'],
    surprised: ['experimental music', 'electronic drops', 'viral hits', 'trending music'],
    neutral: ['lo-fi beats', 'chill background music', 'study music', 'acoustic relax'],
    fearful: ['calming music for anxiety', 'ambient soundscapes', 'gentle piano', 'meditation music'],
    disgusted: ['heavy bass music', 'grunge rock', 'alternative rock', 'industrial music']
};

export const getSearchQuery = (emotion: EmotionType): string => {
    const queries = EMOTION_TO_SEARCH_QUERY[emotion] || EMOTION_TO_SEARCH_QUERY.neutral;
    // Pick a random query variation
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    return randomQuery;
};
