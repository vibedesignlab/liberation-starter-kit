import Typography from '@mui/material/Typography';
import FullBleedSection from './FullBleedSection';

/**
 * Full-bleed moment image with sticky bottom label.
 */
export default function UseMomentCard({ image, label, productName }) {
  return (
    <FullBleedSection image={image} alt={`${productName} — ${label}`} aspectRatio="3 / 2">
      <Typography variant="h2" sx={{ color: 'background.default' }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color: 'background.default', opacity: 0.85 }}>
        {productName}
      </Typography>
    </FullBleedSection>
  );
}
