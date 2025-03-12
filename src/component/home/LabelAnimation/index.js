import { FormLabel } from "@mui/material";
import { useEffect, useState } from "react";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";

const LabelAnimation = () => {
   // letter typing
  const texts = [
   "Where do you want to go today?",
   "Explore the world, one destination at a time.",
   "Adventure is waiting for you!",
 ];
 
 const [displayedText, setDisplayedText] = useState("");
 const [textIndex, setTextIndex] = useState(0);
 const [isDeleting, setIsDeleting] = useState(false);
 const typingSpeed = 80;
 const deletingSpeed = 40;
 const delayBeforeDeleting = 1000;

 // Blinking Cursor Effect
 const [showCursor, setShowCursor] = useState(true);
 useEffect(() => {
   const cursorBlink = setInterval(() => {
     setShowCursor((prev) => !prev);
   }, 500); // Blinks every 500ms
   return () => clearInterval(cursorBlink);
 }, []);

 useEffect(() => {
   let timeout;

   if (!isDeleting && displayedText.length < texts[textIndex].length) {
     timeout = setTimeout(() => {
       setDisplayedText(texts[textIndex].substring(0, displayedText.length + 1));
     }, typingSpeed);
   } else if (isDeleting && displayedText.length > 0) {
     timeout = setTimeout(() => {
       setDisplayedText(texts[textIndex].substring(0, displayedText.length - 1));
     }, deletingSpeed);
   } else if (displayedText.length === texts[textIndex].length) {
     timeout = setTimeout(() => {
       setIsDeleting(true);
     }, delayBeforeDeleting);
   } else if (isDeleting && displayedText.length === 0) {
     setIsDeleting(false);
     setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
   }

   return () => clearTimeout(timeout);
 }, [displayedText, isDeleting, textIndex]);

   return (
     <>
       <FormLabel className={inputStyles.label}>
         {displayedText}
         {showCursor ? " |" : ""}
       </FormLabel>
     </>
   );
}

export default LabelAnimation;