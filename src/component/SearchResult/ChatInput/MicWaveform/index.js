// MicWaveform.jsx or MicWaveform.js

import React, { useEffect, useRef, useState } from "react";

const MicWaveform = ({ active }) => {
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [scriptsReady, setScriptsReady] = useState(false);

  // Dynamically load scripts only once
  useEffect(() => {
    const loadScripts = async () => {
      const loadScript = (src) =>
        new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.async = true;
          document.body.appendChild(script);
        });

      if (!window.WaveSurfer || !window.WaveSurfer.microphone) {
        await loadScript("https://unpkg.com/wavesurfer.js");
        await loadScript("https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js");
      }

      setScriptsReady(true);
    };

    loadScripts();
  }, []);

  useEffect(() => {
    if (
      active &&
      scriptsReady &&
      containerRef.current &&
      window.WaveSurfer &&
      window.WaveSurfer.microphone
    ) {
      const MicrophonePlugin = window.WaveSurfer.microphone;

      waveSurferRef.current = window.WaveSurfer.create({
        container: containerRef.current,
        waveColor: "#1539CF",
        progressColor: "#0a237d",
        interact: false,
        cursorWidth: 0,
        height: 60,
        barWidth: 2,
        normalize: true,
        responsive: true,
        plugins: [
          MicrophonePlugin.create({
            bufferSize: 1024,
            numberOfInputChannels: 1,
            numberOfOutputChannels: 1,
            constraints: {
              video: false,
              audio: true,
            },
          }),
        ],
      });

      waveSurferRef.current.microphone.on("deviceReady", () => {
        console.log("Microphone ready!");
      });

      waveSurferRef.current.microphone.on("deviceError", (code) => {
        console.warn(" Microphone error:", code);
      });

      waveSurferRef.current.microphone.start();

      return () => {
        if (waveSurferRef.current) {
          waveSurferRef.current.microphone.stop();
          waveSurferRef.current.destroy();
          waveSurferRef.current = null;
        }
      };
    }
  }, [active, scriptsReady]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "transparent",
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
        zIndex: 2,
      }}
    />
  );
};

export default MicWaveform;
