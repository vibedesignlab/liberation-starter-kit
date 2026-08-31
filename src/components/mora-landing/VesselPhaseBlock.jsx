import Typography from '@mui/material/Typography';
import FullBleedSection from './FullBleedSection';

/** Vessel story phase: full-bleed scene with sticky narrative copy. */
export default function VesselPhaseBlock({ phase, label, desc, image, mobileImage, alt = '', aspectRatio }) {
  return (
    <FullBleedSection
      image={image}
      mobileImage={mobileImage}
      alt={alt || [phase, label].filter(Boolean).join(' — ')}
      aspectRatio={aspectRatio}
    >
      {label && (
        <Typography
          variant="overline"
          sx={{
            color: 'background.default',
            opacity: 0.82,
            letterSpacing: '0.16em',
          }}
        >
          {label}
        </Typography>
      )}
      <Typography variant="h1" sx={{ color: 'background.default' }}>
        {phase}
      </Typography>
      <Typography variant="body1" sx={{ color: 'background.default', opacity: 0.85, mt: 0.5 }}>
        {desc}
      </Typography>
    </FullBleedSection>
  );
}
