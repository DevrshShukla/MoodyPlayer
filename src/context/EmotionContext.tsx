import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { EmotionResult } from '@/types';
import { cameraManager } from '@/services/cameraManager';
import { detectEmotion, loadModels } from '@/services/emotionDetector';

// [DEBUG]
const LOG_PREFIX = '%c[EmotionContext]';
const LOG_STYLE = 'color: #00ffff; font-weight: bold';

export type DetectionStatus = 'idle' | 'initializing' | 'scanning' | 'detected';

interface EmotionContextType {
    currentEmotion: EmotionResult | null;
    status: DetectionStatus;
    isCameraActive: boolean;
    startCamera: () => Promise<void>;
    stopCamera: () => void;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    error: string | null;
}

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export const EmotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentEmotion, setCurrentEmotion] = useState<EmotionResult | null>(null);
    const [status, setStatus] = useState<DetectionStatus>('idle');
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const detectionIntervalRef = useRef<number | null>(null);

    // FAILSAFE: Use a Ref to track active state inside closures (setInterval)
    const isLoopActiveRef = useRef(false);

    // LIFECYCLE: Load Models
    useEffect(() => {
        console.log(LOG_PREFIX + ' Mount: Initializing...', LOG_STYLE);
        setStatus('initializing');
        loadModels()
            .then(() => {
                console.log(LOG_PREFIX + ' Models Loaded.', LOG_STYLE);
                setStatus('idle');
            })
            .catch(err => {
                console.error(LOG_PREFIX + ' Model Load Failed', LOG_STYLE, err);
                setError('Failed to load models');
            });

        return () => {
            console.log(LOG_PREFIX + ' Unmount: Cleanup', LOG_STYLE);
            stopCamera();
        };
    }, []);

    // CORE: Detection Loop
    const startDetectionLoop = () => {
        console.log(LOG_PREFIX + ' Starting Detection Loop...', LOG_STYLE);

        if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current);

        // We set the status to 'scanning' right before loop starts
        setStatus('scanning');
        isLoopActiveRef.current = true;

        detectionIntervalRef.current = window.setInterval(async () => {
            // 1. Check Closure State
            if (!isLoopActiveRef.current) {
                console.warn(LOG_PREFIX + ' Loop Tick Skipped: Loop Flag is FALSE', LOG_STYLE);
                return;
            }

            // 2. Check Video Element
            const videoEl = videoRef.current;
            if (!videoEl) {
                console.warn(LOG_PREFIX + ' Loop Tick Skipped: Video Ref is NULL', LOG_STYLE);
                return;
            }

            // 3. Check Playback State (The ultimate truth)
            if (videoEl.paused || videoEl.ended || videoEl.readyState < 2) {
                // readyState 2 = HAVE_CURRENT_DATA
                // console.log(LOG_PREFIX + ` Tick Skipped: Video not ready (State: ${videoEl.readyState}, Paused: ${videoEl.paused})`, LOG_STYLE);
                return;
            }

            // 4. Run Detection
            try {
                const result = await detectEmotion(videoEl);

                if (result) {
                    // console.log(LOG_PREFIX + ' Face Detected: ' + result.emotion, LOG_STYLE);
                    setCurrentEmotion(result);
                    setStatus('detected');
                } else {
                    // console.log(LOG_PREFIX + ' No Face In Frame', LOG_STYLE);
                    if (status !== 'detected') setStatus('scanning');
                }
            } catch (e) {
                console.error(LOG_PREFIX + ' Detection Error', LOG_STYLE, e);
            }

        }, 1000);
    };

    // CORE: Camera Start
    const startCamera = async () => {
        console.log(LOG_PREFIX + ' startCamera() called', LOG_STYLE);
        try {
            if (!videoRef.current) {
                throw new Error("Video element reference is missing");
            }

            setStatus('initializing');

            // 1. Get Stream
            console.log(LOG_PREFIX + ' Requesting Media Stream...', LOG_STYLE);
            await cameraManager.startCamera(videoRef.current);
            console.log(LOG_PREFIX + ' Stream Assigned to Video', LOG_STYLE);

            // 2. Force Play & Wait for Ready
            const videoEl = videoRef.current;
            if (videoEl) {
                // Manual play attempt for mobile/strict policies
                try {
                    await videoEl.play();
                    console.log(LOG_PREFIX + ' Video.play() successful', LOG_STYLE);
                } catch (e) {
                    console.warn(LOG_PREFIX + ' Video.play() warning (might rely on autoplay)', LOG_STYLE, e);
                }

                // CRITICAL: We don't rely on 'onloadedmetadata' event listeners here because we might have missed them.
                // Instead, we just proceed. The detection loop checks readyState every tick.
            }

            // 3. Update State
            setIsCameraActive(true);
            setError(null);

            // 4. Start Loop
            startDetectionLoop();

        } catch (err: any) {
            console.error(LOG_PREFIX + ' Camera Start Failed', LOG_STYLE, err);
            setError(err.message || 'Failed to start camera');
            setIsCameraActive(false);
            isLoopActiveRef.current = false;
        }
    };

    // CORE: Camera Stop
    const stopCamera = () => {
        console.log(LOG_PREFIX + ' stopCamera() called', LOG_STYLE);
        cameraManager.stopCamera();

        if (detectionIntervalRef.current) {
            clearInterval(detectionIntervalRef.current);
            detectionIntervalRef.current = null;
        }

        isLoopActiveRef.current = false;
        setIsCameraActive(false);
        setCurrentEmotion(null);
        setStatus('idle');
    };

    return (
        <EmotionContext.Provider value={{
            currentEmotion,
            status,
            isCameraActive,
            startCamera,
            stopCamera,
            videoRef,
            error
        }}>
            {children}
        </EmotionContext.Provider>
    );
};

export const useEmotion = () => {
    const context = useContext(EmotionContext);
    if (context === undefined) {
        throw new Error('useEmotion must be used within an EmotionProvider');
    }
    return context;
};
