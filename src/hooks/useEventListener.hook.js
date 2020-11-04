import React from "react";

function useEventListener(code, callback) {
  React.useEffect(() => {
    // window.addEventListener("keydown", handleUserKeyPress);
    const handleKeyDown = (ev) => {
      if (ev.code === 32) {
        callback();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
}

export default useEventListener;
