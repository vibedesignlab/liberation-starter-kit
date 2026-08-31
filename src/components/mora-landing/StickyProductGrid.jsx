import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductCard from './ProductCard';

/**
 * Niksen "Shop the Look" → MORA "Shop the Cup".
 *
 * 2-column grid: image (1fr) + content (1fr).
 * Content column: title/body → 2×2 product grid (sticky) → CTA (sticky bottom).
 * `reverse` flips column order.
 */
export default function StickyProductGrid({
  mainImage,
  mainAlt = '',
  products = [],
  title = '',
  body = '',
  cta = '',
  ctaHref = '#',
  reverse = false,
}) {
  const imageCol = (
    <Box
      sx={{
        position: 'relative',
        overflow: 'visible',
        aspectRatio: '1 / 2',  // 이미지 열을 매우 세로로 → sticky 여유 확보
      }}
    >
      <Box
        component="img"
        src={mainImage}
        alt={mainAlt}
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
    </Box>
  );

  const contentCol = (
    <Box sx={{ overflow: 'visible', display: 'flex', flexDirection: 'column' }}>
      {/* Title + body at top */}
      {(title || body) && (
        <Box sx={{ px: '12px', pt: '10px', pb: '16px' }}>
          {title && (
            <Typography variant="h2" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
          )}
          {body && (
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {body}
            </Typography>
          )}
        </Box>
      )}

      {/* 2×2 product grid — sticky, fills remaining space */}
      <Box
        sx={{
          position: 'sticky',
          top: '34px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2px',
          alignContent: 'start',
        }}
      >
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Box>

      {/* CTA at bottom */}
      {cta && (
        <Box sx={{ position: 'sticky', bottom: 0, px: '12px', py: '10px' }}>
          <Typography
            component="a"
            href={ctaHref}
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
            }}
          >
            {cta}
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: reverse ? '1fr 1fr' : '1fr 1fr',
        },
        gridTemplateRows: '1fr',
        gap: '2px',
        width: '100%',
        overflow: 'visible',
      }}
    >
      {reverse ? (
        <>
          {contentCol}
          {imageCol}
        </>
      ) : (
        <>
          {imageCol}
          {contentCol}
        </>
      )}
    </Box>
  );
}
