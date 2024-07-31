import { useEffect, useRef, useState } from "react";
import { FaRev } from "react-icons/fa";

type TCursorPosition = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

const RetryBalFetch = () => {
  const [cursorPosition, setCursorPosition] = useState<TCursorPosition>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const [canShowTooltip, setCanShowTooltip] = useState(false);

  const hoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      setCanShowTooltip(true);
    };

    const handleMouseLeave = () => {
      setCanShowTooltip(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const distance = {
        top: clientY,
        right: window.innerWidth - clientX,
        bottom: window.innerHeight - clientY,
        left: clientX,
      };
      setCursorPosition(distance);
    };

    const element = hoverRef?.current;
    if (element) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      className="w-[30px] h-[30px] flex items-center justify-center relative "
      ref={hoverRef}
    >
      {/* this btn triggers increment in retryCount */}
      <button className="">
        <FaRev fontSize={25} />

        <div className="alarm w-[10px] h-[10px] bg-red-700 rounded-[100%] absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[45%]"></div>
      </button>

      {canShowTooltip && (
        <p
          className={`px-3 py-1 fixed text-center z-10 rounded-md shadow-md`}
          style={{
            backgroundColor: "rgba(236, 102, 255, 0.7)",
            top: cursorPosition.top + 20,
          }}
        >
          click to retry bal fetch
        </p>
      )}
    </div>
  );
};

export default RetryBalFetch;
