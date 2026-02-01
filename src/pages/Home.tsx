import React from 'react';
import Header from '@/components/Header';
import CameraFeed from '@/components/CameraFeed';
import VideoCard from '@/components/VideoCard';
import VideoPlayer from '@/components/VideoPlayer';
import { useMusic } from '@/context/MusicContext';
import { Sparkles, HelpCircle, AlertTriangle } from 'lucide-react';
import { useEmotion } from '@/context/EmotionContext';

const Home: React.FC = () => {
    const { videos, isLoading: isMusicLoading, hasError } = useMusic();
    const { currentEmotion, isCameraActive, status } = useEmotion();

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-bg via-[#1a1a1a] to-black text-white">
            <Header />
            <VideoPlayer />

            <main className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Left Column: Camera Section */}
                    <div className="space-y-6 lg:sticky lg:top-8">
                        <div className="bg-dark-card rounded-2xl p-1 shadow-xl shadow-black/50 border border-white/5">
                            <CameraFeed />
                        </div>

                        <div className="bg-dark-card/50 rounded-xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-gray-500" />
                                How it works
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Enable your camera to let our AI analyze your facial expressions correctly.
                            </p>
                            <div className="mt-4 text-xs text-gray-500 space-y-1">
                                <p>• Status: <span className="text-primary">{status}</span></p>
                                {currentEmotion && (
                                    <p>• Raw: {currentEmotion.emotion} ({(currentEmotion.confidence * 100).toFixed(0)}%)</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Recommendations */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-yellow-500" />
                                {currentEmotion ? `Mood: ${currentEmotion.emotion}` : 'Recommendations'}
                            </h2>
                        </div>

                        {hasError ? (
                            <div className="flex flex-col items-center justify-center p-12 bg-red-500/10 rounded-2xl border border-red-500/20 text-center">
                                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                                <p className="text-white text-lg font-semibold">Unable to fetch music</p>
                                <p className="text-red-200/70 mt-2 text-sm">
                                    Please check your YouTube API key or internet connection.
                                </p>
                            </div>
                        ) : isMusicLoading ? (
                            <div className="grid gap-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : videos.length > 0 ? (
                            <div className="grid gap-3">
                                {videos.map(video => (
                                    <VideoCard key={video.id.videoId} video={video} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-12 bg-white/5 rounded-2xl border border-white/5 text-center">
                                <p className="text-gray-400 text-lg mb-2">
                                    {status === 'scanning'
                                        ? "Scanning your face..."
                                        : status === 'detected'
                                            ? "Found you! Fetching music..."
                                            : "Start the camera to get recommendations"}
                                </p>
                                {status === 'scanning' && (
                                    <p className="text-xs text-gray-500 animate-pulse mt-2">
                                        Look at the camera clearly...
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Home;
