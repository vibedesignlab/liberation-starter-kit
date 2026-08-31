import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { navLinks } from '../../data/mora/content';

/**
 * 34px sticky nav. MORA left, plain text links right.
 * Transparent → cream on scroll. No buttons.
 */
export default function MoraNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '10px',
        bgcolor: scrolled ? 'background.default' : 'transparent',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Typography
        component="a"
        href="#"
        sx={{
          fontSize: '11px',
          fontWeight: 500,
          color: 'text.primary',
          textDecoration: 'none',
          letterSpacing: '0.06em',
        }}
      >
        MORA
      </Typography>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        {navLinks.map((link) => (
          <Typography
            key={link.label}
            component="a"
            href={link.href}
            sx={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
            }}
          >
            {link.label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
