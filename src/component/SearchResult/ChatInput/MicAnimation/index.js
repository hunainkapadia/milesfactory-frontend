import React, { useEffect, useRef, useState } from "react";
import styles from "@/src/styles/sass/components/input-box/MicAnimation.module.scss";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";


const MicAnimation = ({ active }) => {
  const barsRef = useRef([]);
  const animationFrame = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const previousAvg = useRef(0);
  const [barCount, setbarCount]= useState(80);

  const lerp = (a, b, t) => a + (b - a) * t;
  useEffect(() => {
    const updateBarCount = () => {
      if (window.innerWidth < 767) {
        setbarCount(50);
      } else {
        setbarCount(150);
      }
    };
    updateBarCount();
    window.addEventListener("resize", updateBarCount);
    return () => {
      window.removeEventListener("resize", updateBarCount);
    };
  }, []);
  

  useEffect(() => {
    if (active) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        sourceRef.current.connect(analyserRef.current);

        analyserRef.current.fftSize = 64;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        barsRef.current.forEach((bar) => {
          if (bar) {
            bar.style.transition = "transform 0.2s ease-out, background-color 0.2s ease-out";
            bar.style.transformOrigin = "center"; // grow from center
          }
        });

        const animate = () => {
  analyserRef.current.getByteFrequencyData(dataArrayRef.current);

  const speechData = dataArrayRef.current.slice(5);
  const avg = speechData.reduce((a, b) => a + b, 0) / speechData.length;

  const noiseGateThreshold = 18;
  const baseScale = 0.2;
  const maxScale = 1.5;

  const isSilent = avg < noiseGateThreshold;

  barsRef.current.forEach((bar, i) => {
    if (bar) {
      const randomWave = Math.sin(i + Date.now() / 150) * 0.1;

      const scale = isSilent
        ? baseScale
        : baseScale + Math.min((avg - noiseGateThreshold) / 70, maxScale) + randomWave;

      bar.style.transform = `scaleY(${Math.max(scale, baseScale)})`;
      bar.style.backgroundColor = isSilent
        ? "rgba(21, 57, 207, 0.2)"
        : "#3c6095";
    }
  });

  animationFrame.current = requestAnimationFrame(animate);
};


        animate();
      });
    } else {
      cancelAnimationFrame(animationFrame.current);

      barsRef.current.forEach((bar) => {
        if (bar) {
          bar.style.transition = "transform 0.2s ease-out, background-color 0.2s ease-out";
          bar.style.transform = "scaleY(0.3)"; // base small scale centered
          bar.style.backgroundColor = "rgba(21, 57, 207, 0.4)";
        }
      });

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }

    return () => {
      cancelAnimationFrame(animationFrame.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [active]);

  return (
    <div className={`${styles.barContainer} ${inputStyles.Micanimation}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          className={styles.bar}
        />
      ))}
    </div>
  );
};

export default MicAnimation;
