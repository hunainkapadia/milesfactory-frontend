import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SearchProgressBar = () => {
  const isPolling = useSelector((state) => state?.sendMessage?.isPolling);

  const isActive = isPolling?.type === "active";   // 👈 show/hide
  const isRunning = isPolling?.status === true;   // 👈 animate

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    // ▶ Animate only while polling is running
    if (isRunning) {
      setProgress(1);

      interval = setInterval(() => {
        setProgress((prev) => {
          let next = prev;

          if (prev < 50) next += Math.random() * 5;
          else if (prev < 90) next += Math.random() * 2;

          return next >= 90 ? 90 : next;
        });
      }, 300);
    }

    // ⏹ When polling stops, finish smoothly
    if (!isRunning && progress > 0) {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 400);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // 👇 Hide completely unless type is active
  if (!isActive || progress === 0) return null;

  return (
    <div style={{ width: "100%", marginBottom: 10 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 4,
          borderRadius: 2,
          backgroundColor: "#F2F2F7",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#00C4CC",
            transition: "width 0.3s ease",
          },
        }}
      />
    </div>
  );
};

export default SearchProgressBar;
