import React from 'react';
import { X } from 'lucide-react';
import { useMusic } from '@/context/MusicContext';

const VideoPlayer: React.FC = () => {
    const { currentVideo, closeVideo } = useMusic();

    if (!currentVideo) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-dark-card">
                    <h3 className="font-semibold text-white truncate pr-4">
                        {currentVideo.snippet.title}
                    </h3>
                    <button
                        onClick={closeVideo}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="relative aspect-video w-full bg-black">
                    <iframe
                        src={`https://www.youtube.com/embed/${currentVideo.id.videoId}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
