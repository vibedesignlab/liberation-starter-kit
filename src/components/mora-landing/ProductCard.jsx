import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Product card: image + name. No decoration.
 */
export default function ProductCard({ product }) {
  return (
    <Box>
      <Box
        component="img"
        src={product.product}
        alt={product.productAlt || product.name}
        loading="lazy"
        sx={{
          display: 'block',
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          borderRadius: 0,
        }}
      />
      <Typography sx={{ fontSize: '11px', mt: '4px', mb: '4px', px: '12px' }}>
        {product.name}
      </Typography>
    </Box>
  );
}
