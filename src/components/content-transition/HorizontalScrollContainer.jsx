import React, { useRef, useState, useLayoutEffect, createContext, useContext } from 'react';
import Box from '@mui/material/Box';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const ScrollProgressContext = createContext(null);

/**
 * useHorizontalScrollProgress - 부모 HorizontalScrollContainer의 scrollYProgress 접근 훅
 *
 * @returns {import('framer-motion').MotionValue<number>|null} scrollYProgress (0-1)
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useHorizontalScrollProgress() {
  return useContext(ScrollProgressContext);
}

/**
 * HorizontalScrollContainer - 가로 스크롤 컨테이너
 *
 * 세로 스크롤을 가로 이동으로 변환하는 순수 컨테이너입니다.
 * 주어진 콘텐츠만큼만 스크롤하고, 마지막 아이템이 화면에 완전히 들어오는 순간
 * 즉시 세로 스크롤로 전환됩니다.
 *
 * Props:
 * @param {React.ReactNode} children - HorizontalScrollContainer.Slide로 감싼 슬라이드들 [Required]
 * @param {string} gap - 슬라이드 간 간격 (CSS 단위) [Optional, 기본값: '0px']
 * @param {string} padding - 좌우 패딩 (CSS 단위) [Optional, 기본값: '0px']
 * @param {string} backgroundColor - 배경색 [Optional, 기본값: 'transparent']
 * @param {boolean} seamlessEntry - 앞 sticky 섹션의 마지막 화면과 한 viewport 겹쳐 즉시 인계 [Optional]
 * @param {function} onScrollProgress - 스크롤 진행도 콜백 (0-1) [Optional]
 *
 * Example usage:
 * <HorizontalScrollContainer gap="24px" padding="40px">
 *   <HorizontalScrollContainer.Slide>콘텐츠1</HorizontalScrollContainer.Slide>
 *   <HorizontalScrollContainer.Slide>콘텐츠2</HorizontalScrollContainer.Slide>
 * </HorizontalScrollContainer>
 */
function HorizontalScrollContainer({
  children,
  gap = '0px',
  padding = '0px',
  backgroundColor = 'transparent',
  seamlessEntry = false,
  onScrollProgress,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [entryOverlap, setEntryOverlap] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setScrollDistance(Math.max(0, trackWidth - viewportWidth));

      const nextOverlap = seamlessEntry ? window.innerHeight : 0;
      setEntryOverlap(nextOverlap);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [children, gap, padding, seamlessEntry]);

  const containerHeight = window.innerHeight + scrollDistance;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    onScrollProgress?.(v);
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollDistance]
  );

  return (
    <ScrollProgressContext.Provider value={ scrollYProgress }>
      <Box
        ref={ containerRef }
        component="section"
        sx={ {
          height: containerHeight,
          position: 'relative',
          mt: seamlessEntry ? `${-entryOverlap}px` : 0,
          zIndex: seamlessEntry ? 1 : 'auto',
        } }
      >
        <Box
          sx={ {
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor,
          } }
        >
          <motion.div
            ref={ trackRef }
            style={ {
              x,
              display: 'flex',
              width: 'max-content',
              gap,
              alignItems: 'center',
              height: '100%',
              paddingLeft: padding,
              paddingRight: padding,
            } }
          >
            { children }
          </motion.div>
        </Box>
      </Box>
    </ScrollProgressContext.Provider>
  );
}

/**
 * HorizontalScrollContainer.Slide - 슬라이드 아이템
 *
 * Props:
 * @param {React.ReactNode} children - 슬라이드 내부 콘텐츠 [Required]
 */
function Slide({ children }) {
  return (
    <Box
      sx={ {
        position: 'relative',
        width: 'fit-content',
        height: 'fit-content',
        flexShrink: 0,
      } }
    >
      { children }
    </Box>
  );
}

HorizontalScrollContainer.Slide = Slide;

export { HorizontalScrollContainer };
