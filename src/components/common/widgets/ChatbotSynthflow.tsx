"use client";

export function ChatbotSynthflow() {
  return (
    <div className="fixed bottom-[24px] right-[24px] z-[99999]">
      <iframe
        id="audio_iframe"
        src="https://widget.synthflow.ai/widget/v2/1731945936136x369917254755448100/1731945936057x408198026249173600"
        allow="microphone"
        className="h-[568px] w-[calc(100vw-12px)] md:h-[600px] md:w-[400px]"
        scrolling="no"
        style={{
          position: "relative",
          background: "transparent",
          border: "none",
          zIndex: 99999,
        }}
      ></iframe>
    </div>
  );
} 
