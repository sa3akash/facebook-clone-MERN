import { useEffect } from "react";

export default function useClickOutSide(ref, fun) {
    
  useEffect(() => {
    let listner = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      fun();
    };

    document.addEventListener("mousedown", listner);
    document.addEventListener("touchstart", listner);

    return () => {
      document.removeEventListener("mousedown", listner);
      document.removeEventListener("touchstart", listner);
    };
  }, [fun, ref]);
}
