export class CameraManager {
    private stream: MediaStream | null = null;

    async startCamera(videoElement: HTMLVideoElement): Promise<MediaStream> {
        if (this.stream) {
            return this.stream;
        }

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                },
                audio: false
            });

            videoElement.srcObject = this.stream;
            return this.stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
            throw error;
        }
    }

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

    isActive(): boolean {
        return !!this.stream && this.stream.active;
    }
}

export const cameraManager = new CameraManager();
