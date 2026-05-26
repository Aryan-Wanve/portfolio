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

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldLoad || !props.autoPlay) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          video.play().catch(() => {});
          return;
        }

        video.pause();
      },
      {
        rootMargin: "80px 0px",
        threshold: 0.2,
      }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [props.autoPlay, shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      preload={shouldLoad ? preload : "none"}
      controlsList="nodownload noplaybackrate"
      {...props}
    >
      {shouldLoad ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
