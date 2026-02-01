import React, { createContext, useContext, useState } from 'react';
import type { YouTubeVideo, EmotionType } from '@/types';
import { youtubeService } from '@/services/youtubeService';
import { getSearchQuery } from '@/utils/emotionMapping';

interface MusicContextType {
    videos: YouTubeVideo[];
    currentVideo: YouTubeVideo | null;
    fetchRecommendations: (emotion: EmotionType) => Promise<void>;
    isLoading: boolean;
    hasError: boolean;
    playVideo: (video: YouTubeVideo) => void;
    closeVideo: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Fallback logic could be added effectively here if needed using a local constant


export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [currentVideo, setCurrentVideo] = useState<YouTubeVideo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const fetchRecommendations = async (emotion: EmotionType) => {
        setIsLoading(true);
        setHasError(false);
        try {
            const query = getSearchQuery(emotion);
            console.log(`Searching YouTube for: ${query}`);

            const results = await youtubeService.searchVideos(query);

            if (results && results.length > 0) {
                setVideos(results);
            } else {
                console.warn('YouTube returned 0 videos. Triggering fallback or error state.');
                setHasError(true);
                // Optional: setVideos(FALLBACK_VIDEOS) if we had any
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const playVideo = (video: YouTubeVideo) => {
        setCurrentVideo(video);
    };

    const closeVideo = () => {
        setCurrentVideo(null);
    };

    return (
        <MusicContext.Provider value={{
            videos,
            currentVideo,
            fetchRecommendations,
            isLoading,
            hasError,
            playVideo,
            closeVideo
        }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};
