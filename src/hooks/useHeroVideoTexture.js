import { useEffect, useState } from 'react';
import * as THREE from 'three';

export const HERO_BRAND_VIDEO = '/assets/gen_8b15461d-d1d9-4b37-9ed0-cd05e27c01ca.mp4';

/** Top-left anchor, wide crop — as much of the frame as fits in the letters. */
const VIDEO_CROP = {
  repeatX: 0.98,
  repeatY: 0.94,
  offsetX: 0,
  offsetY: 0.06,
};

const LOOP_START_RATIO = 0.46;
const LOOP_END_RATIO = 0.54;

function applyVideoCrop(texture) {
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(VIDEO_CROP.repeatX, VIDEO_CROP.repeatY);
  texture.offset.set(VIDEO_CROP.offsetX, VIDEO_CROP.offsetY);
  texture.needsUpdate = true;
}

export function useHeroVideoTexture() {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const video = document.createElement('video');
    video.src = HERO_BRAND_VIDEO;
    video.muted = true;
    video.loop = false;
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    applyVideoCrop(videoTexture);

    let loopStart = 0;
    let loopEnd = 0;
    let rafId = 0;

    const syncLoopBounds = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      loopStart = video.duration * LOOP_START_RATIO;
      loopEnd = video.duration * LOOP_END_RATIO;
      video.currentTime = loopStart;
    };

    const keepInBrightRange = () => {
      if (!loopEnd) return;
      if (video.currentTime >= loopEnd - 0.03) {
        video.currentTime = loopStart;
      }
    };

    const tryPlay = () => {
      if (reducedMotion) return;
      video.play().catch(() => {});
    };

    const tick = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        videoTexture.needsUpdate = true;
      }
      rafId = requestAnimationFrame(tick);
    };

    const onReady = () => {
      syncLoopBounds();
      setTexture(videoTexture);
      tryPlay();
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    video.addEventListener('loadedmetadata', syncLoopBounds);
    video.addEventListener('loadeddata', onReady);
    video.addEventListener('timeupdate', keepInBrightRange);
    if (video.readyState >= 2) onReady();

    let observer;
    const hero = document.querySelector('.hero-below-grid');
    if (hero) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) {
            video.pause();
            return;
          }
          tryPlay();
        },
        { threshold: 0.12 },
      );
      observer.observe(hero);
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      video.removeEventListener('loadedmetadata', syncLoopBounds);
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('timeupdate', keepInBrightRange);
      videoTexture.dispose();
      video.pause();
      video.removeAttribute('src');
      video.load();
      setTexture(null);
    };
  }, []);

  return texture;
}
