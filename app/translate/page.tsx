"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2, Volume2, VolumeX } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { findMalayalamByEnglish, type MalayalamLetter } from "@/lib/malayalam-alphabet";

// API endpoint - make sure this matches your backend server
const API_URL = "http://localhost:5000/predict";

export default function TranslatePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedGesture, setRecognizedGesture] = useState("");
  const [malayalamLetter, setMalayalamLetter] = useState<MalayalamLetter | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [malayalamVoice, setMalayalamVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [fallbackVoice, setFallbackVoice] = useState<SpeechSynthesisVoice | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [boxDimensions, setBoxDimensions] = useState({
    width: 400,  // Increased from 300
    height: 350, // Increased from 300
    left: 0,
    top: 0
  });

  useEffect(() => {
    // Create a hidden canvas element for capturing frames
    canvasRef.current = document.createElement("canvas");

    // Test API connectivity on component mount
    testApiConnection().catch(error => {
      console.error("API connection test failed:", error);
      setApiError("Failed to test API connection");
    });

    // Initialize speech synthesis voices
    const synth = window.speechSynthesis;
    const findVoices = () => {
      const availableVoices = synth.getVoices();
      const mlVoice = availableVoices.find((v) => v.lang.includes("ml"));
      if (mlVoice) setMalayalamVoice(mlVoice);

      const hindiVoice = availableVoices.find((v) => v.lang.includes("hi"));
      const tamilVoice = availableVoices.find((v) => v.lang.includes("ta"));
      const teluguVoice = availableVoices.find((v) => v.lang.includes("te"));
      const kannadaVoice = availableVoices.find((v) => v.lang.includes("kn"));
      setFallbackVoice(mlVoice || hindiVoice || tamilVoice || teluguVoice || kannadaVoice || availableVoices[0]);
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = findVoices;
    }
    findVoices();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && videoRef.current && videoContainerRef.current) {
      const updateBoxPosition = () => {
        const videoContainer = videoContainerRef.current;
        if (!videoContainer) return;

        const containerWidth = videoContainer.offsetWidth;
        const containerHeight = videoContainer.offsetHeight;

        // Center the box within the video container
        setBoxDimensions(prev => ({
          ...prev,
          left: (containerWidth - prev.width) / 2,
          top: (containerHeight - prev.height) / 2
        }));
      };

      updateBoxPosition();
      // Also update on resize
      window.addEventListener('resize', updateBoxPosition);

      return () => window.removeEventListener('resize', updateBoxPosition);
    }
  }, [isRecording]);

  // Test API connectivity
  const testApiConnection = async () => {
    try {
      const response = await fetch(`${API_URL.split("/predict")[0]}/health`, {
        method: "GET",
      });

      if (response.ok) {
        console.log("Backend API is reachable!");
        setApiError(null);
      } else {
        console.error("Backend health check failed");
        setApiError("Backend health check failed. API may be down.");
      }
    } catch (error) {
      console.error("Cannot reach backend:", error);
      setApiError("Cannot connect to backend server");
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      streamRef.current = stream;

      // Add timeout to ensure state updates
      setTimeout(() => {
        setIsRecording(true);
        startGestureRecognition();
      }, 100);
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRecording(false);
    setRecognizedGesture("");
    setMalayalamLetter(undefined);
    setConfidence(0);
  };

  const captureFrame = (): string | null => {
    if (!videoRef.current || !canvasRef.current || !videoContainerRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const videoContainer = videoContainerRef.current;

    // Get dimensions
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const containerWidth = videoContainer.offsetWidth;
    const containerHeight = videoContainer.offsetHeight;

    // Calculate the video display dimensions accounting for object-cover
    let displayWidth, displayHeight, offsetX = 0, offsetY = 0;

    // Video aspect ratio
    const videoAspect = videoWidth / videoHeight;
    // Container aspect ratio
    const containerAspect = containerWidth / containerHeight;

    if (videoAspect > containerAspect) {
      // Video is wider than container - height matches container, width is cropped
      displayHeight = containerHeight;
      displayWidth = containerHeight * videoAspect;
      offsetX = (containerWidth - displayWidth) / 2;
    } else {
      // Video is taller than container - width matches container, height is cropped
      displayWidth = containerWidth;
      displayHeight = containerWidth / videoAspect;
      offsetY = (containerHeight - displayHeight) / 2;
    }

    // Calculate scaling factors between actual video and displayed video
    const scaleX = videoWidth / displayWidth;
    const scaleY = videoHeight / displayHeight;

    // Box position relative to the displayed video
    const boxLeft = (containerWidth - boxDimensions.width) / 2 - offsetX;
    const boxTop = (containerHeight - boxDimensions.height) / 2 - offsetY;

    // Calculate the crop region in the original video coordinates
    const cropX = Math.max(0, boxLeft) * scaleX;
    const cropY = Math.max(0, boxTop) * scaleY;
    const cropWidth = Math.min(boxDimensions.width, displayWidth - Math.max(0, boxLeft)) * scaleX;
    const cropHeight = Math.min(boxDimensions.height, displayHeight - Math.max(0, boxTop)) * scaleY;

    // Set canvas size to match the crop area
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    // Draw only the cropped region to the canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(
      video,
      cropX, cropY, cropWidth, cropHeight,  // Source rectangle (crop area)
      0, 0, cropWidth, cropHeight           // Destination rectangle (whole canvas)
    );

    // Convert canvas to base64 image data
    return canvas.toDataURL("image/jpeg", 0.85);
  };

  const startGestureRecognition = () => {
    intervalRef.current = setInterval(async () => {
      try {
        setIsProcessing(true);
        const imageData = captureFrame();

        if (!imageData) {
          console.error("[ERROR] Failed to capture frame");
          return;
        }

        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imageData.split(",")[1] }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API request failed:", errorText);
          setApiError(`API request failed: ${response.status} ${errorText}`);
          return;
        }

        const data = await response.json();

        // Use the top prediction
        if (data.predictions && data.predictions.length > 0) {
          const topPrediction = data.predictions[0];
          const gestureClass = topPrediction.class;
          setRecognizedGesture(gestureClass);

          // Find corresponding Malayalam letter
          const letter = findMalayalamByEnglish(gestureClass);
          setMalayalamLetter(letter);

          setConfidence(Math.round(topPrediction.confidence * 100));
        } else {
          setRecognizedGesture("");
          setMalayalamLetter(undefined);
          setConfidence(0);
        }
      } catch (error) {
        console.error("Error detecting gestures:", error);
        setApiError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        setIsProcessing(false);
      }
    }, 2000); // Process every 2 seconds
  };

  const speak = () => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance();

    // Set the text to speak based on what's available
    if (malayalamLetter && malayalamLetter.pronunciation) {
      utterance.text = malayalamLetter.pronunciation;

      // Try to use Malayalam voice if available
      if (malayalamVoice) {
        utterance.voice = malayalamVoice;
      } else if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      }
    } else {
      utterance.text = recognizedGesture.replace(/_/g, " ");

      // Use fallback voice
      if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Sign Language Translation</h1>

      {apiError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Live Video Feed</CardTitle>
            <CardDescription>Position your hands inside the box for best results</CardDescription>
          </CardHeader>
          <CardContent className="p-0 aspect-video bg-muted relative" ref={videoContainerRef}>
            {cameraError ? (
              <Alert variant="destructive" className="m-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Could not access camera. Please check permissions and try again.</AlertDescription>
              </Alert>
            ) : (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                {isRecording && (
                  <div
                    className="absolute pointer-events-none border-4 border-green-500"
                    style={{
                      width: `${boxDimensions.width}px`,
                      height: `${boxDimensions.height}px`,
                      left: `${boxDimensions.left}px`,
                      top: `${boxDimensions.top}px`,
                    }}
                  >
                    <div className="absolute top-0 left-0 transform -translate-y-full text-xs bg-black bg-opacity-50 text-white p-1 rounded">
                      Place hand here
                    </div>
                  </div>
                )}
              </>
            )}
            {!isRecording && !cameraError && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <Button size="lg" onClick={startCamera}>
                  Start Camera
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between p-4">
            {isRecording ? (
              <Button variant="destructive" onClick={stopCamera}>
                Stop Translation
              </Button>
            ) : (
              <Button onClick={startCamera} disabled={cameraError}>
                Start Translation
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recognized Gesture</CardTitle>
            <CardDescription>The translated sign will appear here</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Processing gesture...</p>
              </div>
            ) : recognizedGesture ? (
              <div className="text-center">
                <div className="flex flex-col items-center gap-4">
                  {/* Recognized Gesture */}
                  <p className="text-4xl font-bold">{recognizedGesture.replace(/_/g, " ")}</p>

                  {/* Malayalam Letter */}
                  {malayalamLetter && malayalamLetter.malayalam ? (
                    <p className="text-5xl font-bold">{malayalamLetter.malayalam}</p>
                  ) : (
                    <p className="text-lg text-muted-foreground">No Malayalam translation available</p>
                  )}

                  {/* Pronunciation */}
                  {malayalamLetter && malayalamLetter.pronunciation && (
                    <p className="text-sm text-muted-foreground">
                      Pronunciation: {malayalamLetter.pronunciation}
                    </p>
                  )}

                  {/* Confidence */}
                  <p className="text-muted-foreground">Sign recognized with {confidence}% confidence</p>

                  {/* Voice Controls */}
                  <div className="mt-4 w-full max-w-[200px]">
                    {isSpeaking ? (
                      <Button variant="outline" onClick={stopSpeaking} className="w-full">
                        <VolumeX className="mr-2 h-4 w-4" />
                        Stop Speaking
                      </Button>
                    ) : (
                      <Button onClick={speak} className="w-full">
                        <Volume2 className="mr-2 h-4 w-4" />
                        Speak
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center">
                {isRecording ? "Position your hand in the green box..." : "Start the translation to see recognized gestures"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}