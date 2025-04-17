"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, VolumeX } from "lucide-react";
import type { MalayalamLetter } from "@/lib/malayalam-alphabet";

interface TextToSpeechProps {
  text: string;
  malayalamLetter?: MalayalamLetter;
}

export default function TextToSpeech({ text, malayalamLetter }: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [malayalamVoice, setMalayalamVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [fallbackVoice, setFallbackVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Initialize speech synthesis and find appropriate voices
  useEffect(() => {
    const synth = window.speechSynthesis;

    // Function to find the best voice for Malayalam
    const findVoices = () => {
      const availableVoices = synth.getVoices();

      // Try to find Malayalam voice
      const mlVoice = availableVoices.find((v) => v.lang.includes("ml"));
      if (mlVoice) {
        setMalayalamVoice(mlVoice);
      }

      // Set fallback voice (Hindi or any Indian language, or default)
      const hindiVoice = availableVoices.find((v) => v.lang.includes("hi"));
      const tamilVoice = availableVoices.find((v) => v.lang.includes("ta"));
      const teluguVoice = availableVoices.find((v) => v.lang.includes("te"));
      const kannadaVoice = availableVoices.find((v) => v.lang.includes("kn"));

      // Choose the first available Indian language voice as fallback
      setFallbackVoice(mlVoice || hindiVoice || tamilVoice || teluguVoice || kannadaVoice || availableVoices[0]);
    };

    // Chrome loads voices asynchronously
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = findVoices;
    }

    // Initial load attempt
    findVoices();

    // Cleanup
    return () => {
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, []);

  const speak = () => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance();

    // Set the text to speak based on what's available
    if (malayalamLetter && malayalamLetter.pronunciation) {
      // Use the pronunciation field for Malayalam letters
      utterance.text = malayalamLetter.pronunciation;

      // Try to use Malayalam voice if available
      if (malayalamVoice) {
        utterance.voice = malayalamVoice;
      } else if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      }
    } else {
      // Fallback to English text if no Malayalam translation is available
      utterance.text = text.replace(/_/g, " ");

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
    <Card>
      <CardHeader>
        <CardTitle>Text to Speech</CardTitle>
        <CardDescription>Listen to the pronunciation of the recognized gesture</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-4xl font-bold">{text.replace(/_/g, " ")}</p>
            {malayalamLetter ? (
              <>
                <p className="text-5xl font-bold mt-2">{malayalamLetter.malayalam}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Pronunciation: {malayalamLetter.pronunciation}
                </p>
              </>
            ) : (
              <p className="text-lg text-muted-foreground mt-2">No Malayalam translation available</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
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
      </CardFooter>
    </Card>
  );
}