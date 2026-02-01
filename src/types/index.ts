// Emotion Types
export type EmotionType = 'happy' | 'sad' | 'angry' | 'surprised' | 'neutral' | 'fearful' | 'disgusted';

export interface FaceExpressions {
    [key: string]: number;
}

export interface EmotionResult {
    emotion: EmotionType;
    confidence: number;
    expressions: FaceExpressions;
    timestamp: number;
}

// YouTube Types
export interface YouTubeThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface YouTubeVideoSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        default: YouTubeThumbnail;
        medium: YouTubeThumbnail;
        high: YouTubeThumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
}

export interface YouTubeVideoId {
    kind: string;
    videoId: string;
}

export interface YouTubeVideo {
    kind: string;
    etag: string;
    id: YouTubeVideoId;
    snippet: YouTubeVideoSnippet;
}

export interface YouTubeSearchResponse {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YouTubeVideo[];
}

// App State
export interface AppState {
    camera: {
        isActive: boolean;
        stream: MediaStream | null;
        error: string | null;
    };
    emotion: {
        current: EmotionResult | null;
        isDetecting: boolean;
    };
    music: {
        recommendations: YouTubeVideo[];
        currentVideo: YouTubeVideo | null;
    };
}
