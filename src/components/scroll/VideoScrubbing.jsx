import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const DEFAULT_SCROLL_RANGE = Object.freeze({ start: 0, end: 1 });

/**
 * VideoScrubbing Component
 * 스크롤 위치에 따라 비디오를 프레임 단위로 재생(스크러빙)하는 컴포넌트입니다.
 *
 * Props:
 * @param {string} src - 비디오 소스 경로 [Required]
 * @param {React.RefObject} containerRef - 스크롤 추적용 컨테이너 요소 [Optional]
 * @param {Object} sx - MUI sx 스타일 [Optional]
 * @param {Object} scrollRange - 스크롤 범위 매핑 { start: 0, end: 1 } [Optional]
 * @param {function} onProgressChange - 진행도 변경 콜백 (progress: 0-1) [Optional]
 *
 * Example usage:
 * <VideoScrubbing src="/video.mp4" />
 * <VideoScrubbing src="/video.mp4" onProgressChange={setProgress} />
 */
const VideoScrubbing = ({
  src,
  containerRef = null,
  sx = {},
  scrollRange = DEFAULT_SCROLL_RANGE,
  onProgressChange,
  ...props
}) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      video.currentTime = 0;
    };

    video.addEventListener('loadeddata', handleLoadedData);

    if (video.readyState >= 2) {
      video.currentTime = 0;
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    if (reduceMotion) {
      video.currentTime = 0;
      onProgressChange?.(0);
      return;
    }

    let animationFrameId = null;

    const updateVideoTime = () => {
      animationFrameId = null;

      let progress = 0;

      if (containerRef && containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const scrollableDistance = Math.max(1, container.offsetHeight - window.innerHeight);
        progress = -rect.top / scrollableDistance;
      } else {
        const rect = video.getBoundingClientRect();
        const travelDistance = Math.max(1, window.innerHeight + rect.height);
        progress = (window.innerHeight - rect.top) / travelDistance;
      }

      const { start, end } = scrollRange;
      const range = Math.max(0.0001, end - start);
      progress = (progress - start) / range;
      progress = Math.max(0, Math.min(1, progress));

      if (onProgressChange) {
        onProgressChange(progress);
      }

      if (video.duration) {
        const targetTime = video.duration * progress;
        if (Math.abs(video.currentTime - targetTime) > 0.033) {
          video.currentTime = targetTime;
        }
      }

    };

    const requestUpdate = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateVideoTime);
      }
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, containerRef, scrollRange, onProgressChange, reduceMotion]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        component="video"
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
          position: 'relative',
          zIndex: 0,
          ...sx,
        }}
        {...props}
      >
        <source src={src} type="video/mp4" />
      </Box>
    </Box>
  );
};

export default VideoScrubbing;
