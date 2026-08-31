import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Ghost nav — 항상 투명, 콘텐츠 위에 떠 있음.
 *
 * nav 로고는 히어로 로고(MoraLandingPage 쪽)가
 * GNB 위치에 도달한 뒤 페이드인으로 인수.
 * data-nav-theme="dark" 섹션 감지로 텍스트 색상 자동 전환.
 *
 * Props:
 * @param {string} brandLabel - 브랜드명 [Required]
 * @param {string} brandHref - [Optional, 기본값: '#']
 * @param {Array} links - [{label, href}] [Optional]
 * @param {Object} heroRef - 히어로 섹션 ref [Required]
 */
export default function MoraNav({ brandLabel = '', brandHref = '#', links = [], heroRef }) {
  const [isDark, setIsDark] = useState(true);
  const [heroH, setHeroH] = useState(800);
  const activeDarkRef = useRef(new Set());

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    if (!heroRef?.current) return;
    const update = () => setHeroH(heroRef.current.offsetHeight || 800);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(heroRef.current);
    return () => ro.disconnect();
  }, [heroRef]);

  const hp = Math.max(0.02, (0.15 * heroH - 20) / heroH);

  const navLogoOpacity = useTransform(scrollYProgress, [hp - 0.01, hp + 0.02], [0, 1]);
  const linksOpacity = useTransform(scrollYProgress, [hp, hp + 0.08], [0, 1]);

  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
    if (!darkSections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeDarkRef.current.add(entry.target);
          else activeDarkRef.current.delete(entry.target);
        });
        setIsDark(activeDarkRef.current.size > 0);
      },
      { rootMargin: '0px 0px -85% 0px' }
    );

    darkSections.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      activeDarkRef.current.clear();
    };
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'appBar',
        height: { xs: 48, md: 40 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: '6vw', md: '8vw' },
        color: isDark ? 'primary.contrastText' : 'text.primary',
        transition: (theme) => theme.transitions.create('color', { duration: theme.transitions.duration.standard }),
        pointerEvents: 'none',
      }}
    >
      <motion.a
        href={brandHref}
        style={{
          opacity: navLogoOpacity,
          textDecoration: 'none',
          pointerEvents: 'auto',
          color: 'inherit',
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: 44,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: (theme) => theme.typography.headingFontFamily,
            fontSize: 'clamp(0.875rem, calc(0.8rem + 0.3vw), 1rem)',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: 'inherit',
            lineHeight: 1,
          }}
        >
          {brandLabel}
        </Typography>
      </motion.a>

      <motion.div style={{ opacity: linksOpacity, pointerEvents: 'auto' }}>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2.5 }}>
          {links.map((link) => (
            <Typography
              variant="overline"
              key={link.label}
              component="a"
              href={link.href}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: 44,
                '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
