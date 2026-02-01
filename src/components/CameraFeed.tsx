import React, { useEffect, useRef } from 'react';
import { useEmotion } from '@/context/EmotionContext';
import { useMusic } from '@/context/MusicContext';
import { Camera, CameraOff, AlertCircle, ScanFace } from 'lucide-react';
import type { EmotionType } from '@/types';

// Stabilization config
const STABILIZATION_FRAMES = 2;

const CameraFeed: React.FC = () => {
    const {
        videoRef,
        isCameraActive,
        startCamera,
        stopCamera,
        currentEmotion,
        status,
        error
    } = useEmotion();

    const { fetchRecommendations } = useMusic();

    // Logic Refs
    const lastTriggeredEmotionRef = useRef<EmotionType | null>(null);
    const consecutiveCountRef = useRef(0);
    const bufferedEmotionRef = useRef<EmotionType | null>(null);

    // LOG: Mount
    useEffect(() => {
        console.log(" [DEBUG-VIEW] CameraFeed Instance Mounted");
    }, []);

    // LOGIC: Stable Trigger
    useEffect(() => {
        if (!currentEmotion) {
            consecutiveCountRef.current = 0;
            return;
        }

        // Log visible change
        // console.log(` [DEBUG-VIEW] UI Received Emotion: ${currentEmotion.emotion}`);

        const emotion = currentEmotion.emotion;

        if (bufferedEmotionRef.current === emotion) {
            consecutiveCountRef.current += 1;
        } else {
            bufferedEmotionRef.current = emotion;
            consecutiveCountRef.current = 1;
        }

        if (consecutiveCountRef.current >= STABILIZATION_FRAMES) {
            if (lastTriggeredEmotionRef.current !== emotion && currentEmotion.confidence > 0.3) {
                console.warn(` [DEBUG-VIEW] 🎵 TRIGGER MUSIC FETCH: ${emotion}`);
                lastTriggeredEmotionRef.current = emotion;
                fetchRecommendations(emotion);
            }
        }
    }, [currentEmotion, fetchRecommendations]);

    return (
        <div className="relative w-full max-w-md mx-auto aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">

            {/* Video Element - The most important part */}
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-500 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Overlay: Start Camera */}
            {!isCameraActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-card/90 z-10">
                    <div className="p-4 rounded-full bg-gray-800/50 mb-4">
                        <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-400 mb-6">Enable camera to detect your mood</p>
                    <button
                        onClick={() => {
                            console.log(" [DEBUG-VIEW] Start Button Clicked");
                            startCamera();
                        }}
                        className="px-6 py-2 bg-primary hover:bg-primary-dark text-black font-medium rounded-full transition-all hover:scale-105"
                    >
                        Start Camera
                    </button>
                </div>
            )}

            {/* Overlay: Scanning Animation */}
            {isCameraActive && status === 'scanning' && !currentEmotion && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 border-2 border-primary/30 rounded-full animate-ping absolute" />
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
                        <ScanFace className="w-5 h-5 text-primary animate-pulse" />
                        <span className="text-white text-sm font-medium">Scanning face...</span>
                    </div>
                </div>
            )}

            {/* Overlay: Stop Button */}
            {isCameraActive && (
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={stopCamera}
                        className="p-2 bg-black/50 hover:bg-red-500/80 backdrop-blur-sm rounded-full text-white transition-all"
                    >
                        <CameraOff className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Overlay: Result Debug */}
            {isCameraActive && currentEmotion && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10 z-20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Detected Mood</p>
                            <p className="text-xl font-bold text-white capitalize flex items-center gap-2">
                                {currentEmotion.emotion}
                                <span className="text-xs font-normal text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                                    {Math.round(currentEmotion.confidence * 100)}%
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay: Error */}
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-bg/95 z-30 p-6 text-center">
                    <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
                    <p className="text-white font-medium">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
                    >
                        Retry
                    </button>
                </div>
            )}
        </div>
    );
};

export default CameraFeed;
