# MoodyPlayer

MoodyPlayer is an emotion-aware music web application that uses your camera to detect your mood and recommends Spotify playlists to match.

## Features

- **Real-time Emotion Detection**: Uses `face-api.js` to analyze facial expressions privacy-first (client-side only).
- **Spotify Integration**: Connects to your Spotify account to play music.
- **Mood Matching**: Maps 7 emotions (Happy, Sad, Angry, Surprised, Neutral, Fearful, Disgusted) to musical attributes (Valence, Energy, Tempo).
- **Interactive UI**: View your detected mood and confidence level in real-time.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI/ML**: face-api.js (TensorFlow.js)
- **API**: Spotify Web API

## Setup

1.  **Prerequisites**:
    *   Node.js (v18+)
    *   Spotify Developer Account

2.  **Installation**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    *   Create `.env` file based on the example.
    *   You need a Spotify Client ID.
    *   Set `VITE_REDIRECT_URI` to `http://localhost:5173/callback` in your Spotify Dashboard.

4.  **Download Models**:
    *   PowerShell: `./download_models.ps1`
    *   Or manually download `face-api.js` weights to `public/models`.

5.  **Run**:
    ```bash
    npm run dev
    ```

## Privacy Note

All face detection happens locally in your browser. No video data is sent to any server.
