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
    maxWidth: { xs: '85vw', sm: 500 },
    p: { xs: 2, md: 3 },
  },
  'left-center': {
    position: 'absolute',
    top: '50%',
    left: { xs: '6vw', md: '8vw' },
    transform: 'translateY(-50%)',
    maxWidth: { xs: '85vw', sm: 'sm' },
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    maxWidth: { xs: '90vw', sm: 'sm' },
    width: '100%',
    px: 3,
  },
};

export default function FullBleedSection({
  image,
  mobileImage,
  alt = '',
  aspectRatio = '3 / 2',
  textPosition = 'bottom-left',
  loading = 'lazy',
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
        component="picture"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        {mobileImage && <source media="(max-width: 899.95px)" srcSet={mobileImage} />}
        <Box
          component="img"
          src={image}
          alt={alt}
          loading={loading}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 0,
            display: 'block',
          }}
        />
      </Box>
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
