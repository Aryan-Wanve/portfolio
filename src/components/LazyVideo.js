"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyVideo({
  src,
  priority = false,
  preload = "metadata",
  className,
  ...props
}) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(priority);

  useEffect(() => {
    if (priority || shouldLoad || !videoRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: 0.15,
      }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      preload={shouldLoad ? preload : "none"}
      {...props}
    >
      {shouldLoad ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
