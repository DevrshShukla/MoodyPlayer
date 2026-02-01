# 🎵 MoodyPlayer - Emotion-Aware Music Recommender

## 🌟 What is MoodyPlayer?
MoodyPlayer is a smart web application that "sees" how you are feeling and plays music to match your mood. Instead of you searching for "sad songs" or "party music," MoodyPlayer uses your camera to detect your facial expression and automatically finds the perfect YouTube videos for you.

Think of it as a **digital DJ that reads your mind (well, your face!)**.

---

## 🚀 How It Works (In Simple Terms)
1.  **Camera Access**: You allow the app to use your webcam.
2.  **Face Scanning**: The app uses Artificial Intelligence (AI) running directly in your browser to scan your face.
    *   *Note: Your video never leaves your computer. It's 100% private.*
3.  **Emotion Detection**: The AI analyzes your eyebrows, eyes, and mouth to guess if you are **Happy, Sad, Angry, Surprised, Neutral, Fearful, or Disgusted**.
4.  **Smart Search**: Once it knows you're "Happy", it automatically asks YouTube for "upbeat feel-good music". If you're "Sad", it looks for "melancholic songs".
5.  **Playback**: You get a list of videos to watch instantly!

---

## 🛠️ Technology Stack (The Building Blocks)

We built this app using modern, high-performance web technologies. Here is exactly what we used and **why**:

### 1. **React (v18)**
*   **What it is:** A library for building user interfaces.
*   **Why we used it:** React allows us to build the app like Lego blocks (Components). We have a "Camera Block", a "Video Player Block", etc. It makes the app fast and interactive without reloading the page.

### 2. **TypeScript**
*   **What it is:** A stricter version of JavaScript.
*   **Why we used it:** It helps prevent bugs. Instead of the code breaking while you use it, TypeScript warns us about errors *while we are writing the code*. It ensures we don't accidentally try to "play" a picture or "display" a sound.

### 3. **Vite**
*   **What it is:** A build tool and development server.
*   **Why we used it:** It starts the project super fast. Traditional tools take seconds or minutes to update when we change code; Vite does it instantly.

### 4. **Tailwind CSS**
*   **What it is:** A styling framework.
*   **Why we used it:** Instead of writing separate CSS files (like `style.css`), we style things directly in our code (e.g., `text-red-500` makes text red). It helps us build a beautiful, modern "Dark Mode" interface very quickly.

### 5. **face-api.js** (The Magic! 🪄)
*   **What it is:** A JavaScript library for Face Detection and Emotion Recognition.
*   **Why we used it:** This is the core AI. It runs **TensorFlow.js** (machine learning) inside the browser.
    *   *Why this specifically?* It is lightweight and runs on the client-side. This means we don't need expensive servers to process video, and it protects user privacy because the video stream is never uploaded anywhere.

### 6. **YouTube Data API (v3)**
*   **What it is:** Google's way of letting computers search YouTube.
*   **Why we used it:** To get real song recommendations. We send queries like "happy music playlist" to this API, and it returns the actual video links, titles, and thumbnails you see on the screen.

### 7. **Axios**
*   **What it is:** A tool to make requests to the internet (like fetching YouTube videos).
*   **Why we used it:** It handles internet requests better than the default browser tools, specifically helping us manage errors (like if your internet cuts out) automatically.

### 8. **Lucide React**
*   **What it is:** An icon library.
*   **Why we used it:** For the beautiful, clean icons you see (Camera, Play Button, Warning signs). They are consistent and crisp on all screen sizes.

---

## 📂 Key Features
*   **Real-time Stabilization**: We use a "buffer" system so the music doesn't change wildly if your face twitches for a split second. We wait for your expression to be stable before switching moods.
*   **Defensive Error Handling**: The app knows if your API key is wrong, your internet is down, or your camera is covered, and tells you exactly what to fix.
*   **Privacy First**: All AI processing happens on YOUR device.

---

## 🏃‍♂️ How to Run This Project

1.  **Install Node.js** (The engine that runs the code).
2.  Open the folder in a terminal.
3.  Run:
    ```bash
    npm install
    ```
4.  Add your YouTube API Key in the `.env` file.
5.  Start the app:
    ```bash
    npm run dev
    ```
