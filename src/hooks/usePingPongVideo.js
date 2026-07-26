import { useEffect } from 'react';

const END_EPSILON = 0.12;
const START_EPSILON = 0.04;

export function usePingPongVideo(videoRef, containerRef) {
  useEffect(() => {
    const video = videoRef.current;
    const root = containerRef?.current;
    if (!video) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      video.pause();
      return undefined;
    }

    let disposed = false;
    let direction = 1;
    let driverRaf = 0;
    let lastTs = 0;
    let visible = false;

    const stopDriver = () => {
      cancelAnimationFrame(driverRaf);
      driverRaf = 0;
      lastTs = 0;
    };

    const playForward = () => {
      if (disposed || !visible) return;
      direction = 1;
      stopDriver();
      video.playbackRate = 1;

      if (video.currentTime >= video.duration - END_EPSILON) {
        video.currentTime = 0;
      }

      video.play().catch(() => {});
    };

    const startReverse = () => {
      if (disposed || !visible || direction === -1) return;
      direction = -1;
      stopDriver();
      video.pause();
      video.playbackRate = 1;
      video.currentTime = Math.min(video.duration - 0.001, Math.max(0, video.currentTime));
      lastTs = 0;
      driverRaf = requestAnimationFrame(reverseStep);
    };

    const reverseStep = (ts) => {
      if (disposed || direction !== -1 || !visible) return;

      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        driverRaf = requestAnimationFrame(reverseStep);
        return;
      }

      if (!lastTs) lastTs = ts;
      const delta = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      const next = Math.max(0, video.currentTime - delta);
      video.currentTime = next;

      if (next <= START_EPSILON) {
        video.currentTime = 0;
        playForward();
        return;
      }

      driverRaf = requestAnimationFrame(reverseStep);
    };

    const maybeStartReverse = () => {
      if (direction !== 1 || !visible) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      if (video.currentTime >= video.duration - END_EPSILON) {
        startReverse();
      }
    };

    const onEnded = () => {
      startReverse();
    };

    const onTimeUpdate = () => {
      maybeStartReverse();
    };

    const ensureForward = () => {
      if (disposed || !visible || direction === -1) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      if (video.currentTime >= video.duration - END_EPSILON) return;

      video.muted = true;
      video.playbackRate = 1;

      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('ended', onEnded);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadeddata', ensureForward);
    video.addEventListener('canplay', ensureForward);

    let observer;
    if (root) {
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = Boolean(entry?.isIntersecting);
          if (visible) {
            ensureForward();
            return;
          }
          stopDriver();
          video.pause();
        },
        { threshold: 0.08 },
      );
      observer.observe(root);
    } else {
      visible = true;
      video.currentTime = 0;
      ensureForward();
    }

    return () => {
      disposed = true;
      stopDriver();
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadeddata', ensureForward);
      video.removeEventListener('canplay', ensureForward);
      observer?.disconnect();
    };
  }, [videoRef, containerRef]);
}
