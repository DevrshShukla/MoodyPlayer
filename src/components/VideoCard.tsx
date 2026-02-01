import React from 'react';
import type { YouTubeVideo } from '@/types';
import { Play } from 'lucide-react';
import { useMusic } from '@/context/MusicContext';

interface VideoCardProps {
    video: YouTubeVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const { playVideo, currentVideo } = useMusic();
    const isPlaying = currentVideo?.id.videoId === video.id.videoId;

    const handlePlay = () => {
        playVideo(video);
    };

    // Decode HTML entities in title
    const decodeHtml = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    return (
        <div className={`group relative flex flex-col md:flex-row items-start md:items-center gap-4 p-3 rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-white/10 ${isPlaying ? 'bg-white/10 border-primary/50' : ''}`}>
            {/* Thumbnail */}
            <div className="relative aspect-video w-full md:w-40 rounded-lg overflow-hidden shadow-lg bg-gray-800">
                <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="h-full w-full object-cover"
                />
                <button
                    onClick={handlePlay}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Play className="w-8 h-8 text-white fill-white" />
                </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className={`font-semibold line-clamp-2 md:truncate ${isPlaying ? 'text-primary' : 'text-white'}`}>
                    {decodeHtml(video.snippet.title)}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                    {video.snippet.channelTitle}
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {video.snippet.description}
                </p>
            </div>
        </div>
    );
};

export default VideoCard;
