import axios from 'axios';
import { YOUTUBE_CONFIG } from '@/utils/constants';
import type { YouTubeSearchResponse, YouTubeVideo } from '@/types';

const api = axios.create({
    baseURL: YOUTUBE_CONFIG.baseUrl,
});

export const youtubeService = {
    searchVideos: async (query: string): Promise<YouTubeVideo[]> => {
        try {
            if (!YOUTUBE_CONFIG.apiKey || YOUTUBE_CONFIG.apiKey.includes('your_youtube_api_key')) {
                console.warn('YouTube API Key is missing or invalid');
                return [];
            }

            const response = await api.get<YouTubeSearchResponse>('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 12,
                    q: query,
                    key: YOUTUBE_CONFIG.apiKey,
                    type: 'video',
                    videoEmbeddable: 'true',
                    videoCategoryId: '10' // Music category
                }
            });
            console.log('YouTube API Response:', response.data);
            return response.data.items;
        } catch (error: any) {
            console.error('Error fetching YouTube videos:', error.response?.data || error.message);
            return [];
        }
    }
};
