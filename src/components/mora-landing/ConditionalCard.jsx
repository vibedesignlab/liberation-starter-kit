import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * ProductCard + saturate(0.9) + small status text.
 */
export default function ConditionalCard({ product }) {
  return (
    <Box sx={{ filter: 'saturate(0.9)' }}>
      <Box
        component="img"
        src={product.product}
        alt={product.productAlt || product.name}
        loading="lazy"
        sx={{
          display: 'block',
          width: '100%',
          aspectRatio: '3 / 4',
          objectFit: 'cover',
          borderRadius: 0,
        }}
      />
      <Typography variant="body2" sx={{ mt: '8px' }}>
        {product.name}
      </Typography>
      {product.status && (
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: '2px', display: 'block' }}>
          {product.status}
        </Typography>
      )}
    </Box>
  );
}
