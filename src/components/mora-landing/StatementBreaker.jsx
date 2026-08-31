import Typography from '@mui/material/Typography';
import FullBleedSection from './FullBleedSection';

/**
 * Niksen Collection Statement: full-bleed image + sticky bottom message.
 */
export default function StatementBreaker({ image, statement }) {
  return (
    <FullBleedSection image={image} alt="">
      <Typography variant="h2" sx={{ color: 'background.default' }}>
        {statement}
      </Typography>
    </FullBleedSection>
  );
}
