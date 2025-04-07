import { useRef } from "react";

const useScrollToRef = () => {
  const ref = useRef(null);

  const scrollIntoView = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return [ref, scrollIntoView];
};

export default useScrollToRef;
