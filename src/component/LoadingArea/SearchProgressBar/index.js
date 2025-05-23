import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SearchProgressBar = () => {
  const isPollComplete = useSelector(
    (state) => state?.sendMessage?.SearchHistorySend?.is_complete
  );

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval;
    let timeout;

    if (isPollComplete === false) {
      setVisible(true);
      setProgress(0);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 80) return prev + 1; // Stop at 90% to wait for real complete
          return prev;
        });
      }, 120); // Slightly slower for a smoother feel
    }

    if (isPollComplete === true) {
      clearInterval(interval);
      setProgress(100);

      timeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 500);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isPollComplete]);

  if (typeof isPollComplete === "undefined" || !visible) return null;

  return (
    <div style={{ width: "100%", position: "relative", marginBottom: "10px" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 4,
          borderRadius: 2,
          backgroundColor: "#F2F2F7",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#00C4CC",
          },
        }}
      />
    </div>
  );
};

export default SearchProgressBar;
