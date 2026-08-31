import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductCard from './ProductCard';

/**
 * 2-column grid: scrolling image column + sticky content column.
 *
 * Props:
 * @param {Array} scrollImages - 스크롤 열에 쌓을 이미지 배열 [{src, alt, aspectRatio?}] [Optional]
 * @param {string} mainImage - scrollImages 미사용 시 단일 이미지 폴백 [Optional]
 * @param {string} mainAlt - mainImage alt 텍스트 [Optional]
 * @param {Array} products - 2×2 제품 그리드 데이터 [Optional]
 * @param {string} title - 제목 [Optional]
 * @param {string} body - 본문 [Optional]
 * @param {boolean} reverse - 열 순서 반전 [Optional, 기본값: false]
 *
 * Example usage:
 * <StickyProductGrid scrollImages={[{src, alt, aspectRatio: '3 / 2'}]} products={coreProducts} title="Vol. 1" />
 */
export default function StickyProductGrid({
  scrollImages,
  mainImage,
  mainAlt = '',
  products = [],
  title = '',
  body = '',
  reverse = false,
}) {
  const images = scrollImages || (mainImage ? [{ src: mainImage, alt: mainAlt, aspectRatio: '1 / 2' }] : []);

  const imageCol = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {images.map((img, i) => (
        <Box
          key={i}
          component="img"
          src={img.src}
          alt={img.alt || ''}
          loading="lazy"
          sx={{
            width: '100%',
            aspectRatio: img.aspectRatio || '3 / 4',
            objectFit: 'cover',
            borderRadius: 0,
            display: 'block',
          }}
        />
      ))}
    </Box>
  );

  const contentCol = (
    <Box sx={{ overflow: 'visible', display: 'flex', flexDirection: 'column' }}>
      {/* Title + body at top */}
      {(title || body) && (
        <Box sx={{ px: { xs: 2, md: 3 }, pt: { xs: 2, md: 3 }, pb: { xs: 2.5, md: 3.5 } }}>
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
          top: { xs: 48, md: 40 },
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
