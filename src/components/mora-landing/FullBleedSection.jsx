import Box from '@mui/material/Box';

/**
 * Niksen inner-spacing: absolute image + positioned text.
 *
 * textPosition:
 *   'left-center'  — left 40px, vertical center (Hero, Collection Statement)
 *   'center'       — horizontal+vertical center (Feature/Why MORA)
 *   'bottom-left'  — sticky bottom left (default, Niksen original)
 */

const positionStyles = {
  'bottom-left': {
    position: 'sticky',
    bottom: 0,
    alignSelf: 'flex-end',
    maxWidth: 500,
    p: '24px',
  },
  'left-center': {
    position: 'absolute',
    top: '50%',
    left: { xs: '24px', md: '40px' },
    transform: 'translateY(-50%)',
    maxWidth: 600,
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    maxWidth: 700,
    width: '100%',
    px: '24px',
  },
};

export default function FullBleedSection({
  image,
  alt = '',
  aspectRatio = '3 / 2',
  textPosition = 'bottom-left',
  children,
  sx = {},
}) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        aspectRatio,
        width: '100%',
        overflow: 'visible',
        ...sx,
      }}
    >
      <Box
        component="img"
        src={image}
        alt={alt}
        loading="lazy"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 0,
          display: 'block',
        }}
      />
      {children && (
        <Box
          sx={{
            zIndex: 1,
            ...positionStyles[textPosition],
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}
