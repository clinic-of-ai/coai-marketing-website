"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  VoiceEmotion,
} from "@heygen/streaming-avatar";
import { useEffect, useRef, useState } from "react";

export function InteractWithAssistant({ children }: { children?: React.ReactNode }) {
  const [stream, setStream] = useState<MediaStream>();
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);
  const [debug, setDebug] = useState<string>();

  async function fetchAccessToken() {
    try {
      const response = await fetch("/api/get-access-token", {
        method: "POST",
      });
      const token = await response.text();
      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      return "";
    }
  }

  async function startSession() {
    setIsLoadingSession(true);
    const newToken = await fetchAccessToken();

    avatar.current = new StreamingAvatar({
      token: newToken,
    });

    avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
      console.log("The stream is ready");
      setStream(event.detail);
    });

    try {
      await avatar.current.createStartAvatar({
        quality: AvatarQuality.Low,
        avatarName: "37f4d912aa564663a1cf8d63acd0e1ab",
        knowledgeId: "1e7d9ee7ef1a41c4ad174d70caf4bb93",
        voice: {
          rate: 1.5,
          emotion: VoiceEmotion.EXCITED,
        },
        language: "en",
        disableIdleTimeout: true,
      });

      await avatar.current?.startVoiceChat({
        useSilencePrompt: false,
      });
    } catch (error) {
      console.error("Error starting avatar session:", error);
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function endSession() {
    await avatar.current?.stopAvatar();
    setStream(undefined);
  }

  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        setDebug("Playing");
      };
    }
  }, [mediaStream, stream]);

  const handleDialogOpenChange = () => {
    if (avatar.current !== null) {
      endSession();
    }
  };

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="outline"
            className="group rounded-full bg-gray-800 text-white hover:bg-gray-900"
          >
            <span className="group-hover:text-white">Talk To Sophie</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="h-4/6 w-full">
        <div className="flex h-full w-full flex-col gap-4">
          <div className="relative flex-1">
            {stream ? (
              <video
                ref={mediaStream}
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              >
                <track kind="captions" />
              </video>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Button onClick={startSession} disabled={isLoadingSession}>
                  {isLoadingSession ? "Loading..." : "Start Session"}
                </Button>
              </div>
            )}
          </div>
          {debug && (
            <p className="font-mono text-sm">
              <span className="font-bold">Status:</span> {debug}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
