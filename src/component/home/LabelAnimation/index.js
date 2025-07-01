import { Box, FormLabel } from "@mui/material";
import { useEffect, useState } from "react";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import { useSelector } from "react-redux";

const LabelAnimation = () => {
  // Letter typing texts
  
  const texts = useSelector((state) => state.base.inputLabelTexts); // replace `ui` with your actual slice name

  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const deleteAmount = 5; // Number of characters to delete before switching
  const delayBeforeDeleting = 1500; // Delay before deletion starts

    // 🔁 Reset animation on texts change
  useEffect(() => {
    setDisplayedText("");
    setTextIndex(0);
    setIsDeleting(false);
  }, [texts]);
  // Blinking Cursor Effect
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  useEffect(() => {
    let timeout;

    if (!isDeleting && displayedText.length < texts[textIndex].length) {
      // Typing the text
      timeout = setTimeout(() => {
        setDisplayedText(texts[textIndex].substring(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === texts[textIndex].length) {
      // Wait before starting to delete
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBeforeDeleting);
    } else if (isDeleting) {
      // Delete only a few characters, not the entire text
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.substring(0, prev.length - deleteAmount));

        if (displayedText.length - deleteAmount <= 0) {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }, deletingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex]);

  return (
    <Box textAlign={"left"}>
      <FormLabel className={inputStyles.label}>
        {displayedText}
        
      </FormLabel>
    </Box>
  );
};

export default LabelAnimation;
