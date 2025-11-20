import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface AutoFitTextProps {
  text: string;
  className?: string;
  minPx?: number; // minimum font size on mobile
  maxPx?: number; // maximum font size on mobile
}

export default function AutoFitText({ text, className, minPx = 10, maxPx = 14 }: AutoFitTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<number>(maxPx);

  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

  const fit = () => {
    const el = spanRef.current;
    if (!el) return;

    // Only auto-fit on mobile; let classes handle larger screens
    if (!isMobile()) {
      el.style.whiteSpace = '';
      setFontSize(maxPx);
      return;
    }

    // Use parent width as the available width
    const parent = el.parentElement;
    const containerWidth = parent?.clientWidth || window.innerWidth;

    // Start from max and shrink until it fits on one line
    let size = maxPx;
    el.style.whiteSpace = 'nowrap';
    el.style.fontSize = `${size}px`;

    // Guard loop to avoid excessive iterations
    let guard = 0;
    while (el.scrollWidth > containerWidth && size > minPx && guard < 40) {
      size -= 0.5;
      el.style.fontSize = `${size}px`;
      guard++;
    }

    setFontSize(size);
  };

  useLayoutEffect(() => {
    fit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    const onResize = () => fit();
    window.addEventListener('resize', onResize);

    // Observe parent width changes as well
    const parent = spanRef.current?.parentElement;
    const ro = parent ? new ResizeObserver(() => fit()) : undefined;
    if (parent && ro) ro.observe(parent);

    fit();

    return () => {
      window.removeEventListener('resize', onResize);
      if (parent && ro) ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      ref={spanRef}
      className={className}
      style={{ fontSize: isMobile() ? `${fontSize}px` : undefined, whiteSpace: isMobile() ? 'nowrap' as const : undefined }}
    >
      {text}
    </span>
  );
}
