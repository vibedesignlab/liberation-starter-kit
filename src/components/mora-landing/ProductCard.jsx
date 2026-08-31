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
      <Typography variant="overline" sx={{ mt: 0.75, mb: 0.75, px: { xs: 1.5, md: 2 }, display: 'block' }}>
        {product.name}
      </Typography>
    </Box>
  );
}
