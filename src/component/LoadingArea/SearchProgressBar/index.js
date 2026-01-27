import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SearchProgressBar = () => {
  // Flight polling status
  const isComplete = useSelector(
    (state) => state.sendMessage?.SearchHistorySend?.flight?.is_complete
  );

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    // Only animate while polling (i.e., not complete)
    if (!isComplete) {
      setProgress(1); // start from 1%
      interval = setInterval(() => {
        setProgress((prev) => {
          let next = prev;

          // Faster increment up to 50%
          if (prev < 50) {
            next += Math.random() * 5; 
          }
          // Slower increment from 50% → 90%
          else if (prev < 90) {
            next += Math.random() * 2;
          }

          // Cap at 90%
          return next >= 90 ? 90 : next;
        });
      }, 300);
    }

    // If polling completes, jump to 100% and hide shortly
    if (isComplete) {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [isComplete]);

  // Hide bar when progress is 0
  if (progress === 0) return null;

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
