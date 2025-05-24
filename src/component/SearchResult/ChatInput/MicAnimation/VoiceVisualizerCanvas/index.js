import React, { useEffect, useRef, useState } from "react";

const VoiceVisualizerCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    function draw() {
      if (!analyserRef.current) return;

      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

      const average =
        dataArrayRef.current.reduce((sum, val) => sum + Math.abs(val - 128), 0) /
        dataArrayRef.current.length;

      ctx.fillStyle = "#ccc"; // Default background
      ctx.fillRect(0, 0, width, height);

      const barWidth = (average / 128) * width; // Normalize and scale

      ctx.fillStyle = "#000"; // Active voice color
      ctx.fillRect(0, 0, barWidth, height);

      animationRef.current = requestAnimationFrame(draw);
    }

    if (isListening) {
      draw();
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isListening]);

  const startMic = async () => {
    if (isListening) {
      stopMic();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      const bufferLength = analyserRef.current.fftSize;
      dataArrayRef.current = new Uint8Array(bufferLength);

      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      setIsListening(true);
    } catch (err) {
      console.error("Mic access denied:", err);
    }
  };

  const stopMic = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={608}
        height={32}
        style={{ width: "100%", height: "32px", backgroundColor: "#eee" }}
      />
      <button onClick={startMic} style={{ marginTop: "10px" }}>
        {isListening ? "Stop Mic" : "Start Mic"}
      </button>
    </div>
  );
};

export default VoiceVisualizerCanvas;
