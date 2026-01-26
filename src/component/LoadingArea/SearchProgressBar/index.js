import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SearchProgressBar = () => {
  const isPolling = useSelector((state) => state.sendMessage.isPolling.status);
  const pollingComplete = useSelector((state) => state.sendMessage.pollingComplete);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (isPolling) {
      setProgress(0);

      interval = setInterval(() => {
        setProgress((prev) => {
          let next = prev;
          if (prev < 50) {
            next += Math.random() * 5; // faster increment before 50%
          } else if (prev < 90) {
            next += Math.random() * 2; // slower increment from 50% to 80%
          }
          return next >= 90 ? 90 : next; // cap at 80% while polling
        });
      }, 300);
    }

    if (pollingComplete) {
      setProgress(100); // jump to 100% immediately
      setTimeout(() => setProgress(0), 500); // hide after short delay
    }

    if (!isPolling && !pollingComplete) {
      setProgress(0); // reset
    }

    return () => clearInterval(interval);
  }, [isPolling, pollingComplete]);

  if (!isPolling && !pollingComplete) return null;

  return (
    <div style={{ width: "100%", marginBottom: "10px" }}>
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
