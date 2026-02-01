import * as faceapi from 'face-api.js';
import type { EmotionResult, EmotionType } from '@/types';
import { MODEL_URL } from '@/utils/constants';

console.warn(" [DEBUG-CORE] 'emotionDetector.ts' file loaded and executing.");

let modelsLoaded = false;

export const loadModels = async () => {
    if (modelsLoaded) {
        console.log(" [DEBUG-CORE] Models already loaded. Skipping.");
        return;
    }

    console.log(" [DEBUG-CORE] Starting Model Load...");
    try {
        const start = Date.now();
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ]);
        modelsLoaded = true;
        console.log(` [DEBUG-CORE] ✅ Models Loaded Successfully in ${Date.now() - start}ms`);
    } catch (error) {
        console.error(" [DEBUG-CORE] ❌ CRITICAL: Failed to load models", error);
        throw error;
    }
};

export const detectEmotion = async (video: HTMLVideoElement): Promise<EmotionResult | null> => {
    // 1. Check dependencies
    if (!modelsLoaded) {
        console.warn(" [DEBUG-LOOP] ⚠️ Skipped: Models not loaded");
        return null;
    }

    // 2. Check Input Readiness
    if (!video) {
        console.warn(" [DEBUG-LOOP] ⚠️ Skipped: Video element is null");
        return null;
    }

    if (video.paused || video.ended || video.readyState < 3) {
        // readyState 3 = HAVE_FUTURE_DATA, 4 = HAVE_ENOUGH_DATA
        console.warn(` [DEBUG-LOOP] ⚠️ Skipped: Video not ready (Paused: ${video.paused}, State: ${video.readyState})`);
        return null;
    }

    try {
        // 3. Execution
        // console.time("Detection"); // Optional: Measure perf
        const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.2 });

        const detections = await faceapi
            .detectAllFaces(video, options)
            .withFaceLandmarks()
            .withFaceExpressions();
        // console.timeEnd("Detection");

        // 4. Result Processing
        if (!detections || detections.length === 0) {
            console.log(" [DEBUG-LOOP] ⚪ Loop running, but NO FACE DETECTED.");
            return null;
        }

        const face = detections[0];
        const expressions = face.expressions;

        // Find dominant emotion
        let bestEmotion: EmotionType = 'neutral';
        let maxScore = 0;

        (Object.entries(expressions) as [EmotionType, number][]).forEach(([emotion, score]) => {
            if (score > maxScore) {
                maxScore = score;
                bestEmotion = emotion;
            }
        });

        console.log(` [DEBUG-LOOP] 🟢 FACE FOUND! Emotion: ${bestEmotion} (${(maxScore * 100).toFixed(0)}%)`);

        return {
            emotion: bestEmotion,
            confidence: maxScore,
            expressions: { ...expressions },
            timestamp: Date.now()
        };
    } catch (error) {
        console.error(" [DEBUG-LOOP] ❌ CRITICAL: Detection crashed", error);
        return null;
    }
};
