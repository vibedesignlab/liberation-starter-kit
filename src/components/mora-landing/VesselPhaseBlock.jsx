import Typography from '@mui/material/Typography';
import FullBleedSection from './FullBleedSection';

/**
 * Vessel Record phase: full-bleed image + sticky bottom phase label.
 */
export default function VesselPhaseBlock({ phase, label, desc, image }) {
  return (
    <FullBleedSection image={image} alt={`${phase} — ${label}`}>
      <Typography variant="h1" sx={{ color: 'background.default' }}>
        {phase}
      </Typography>
      <Typography sx={{ fontSize: '16px', color: 'background.default', opacity: 0.8, mt: 0.5 }}>
        {desc}
      </Typography>
    </FullBleedSection>
  );
}
