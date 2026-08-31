import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FullBleedSection from './FullBleedSection';

/**
 * Each step with an image gets a FullBleedSection (absolute image + sticky bottom label).
 * Steps without images are listed as plain text.
 */
export default function ProcessScroll({ steps = [] }) {
  const withImage = steps.filter((s) => s.image);
  const withoutImage = steps.filter((s) => !s.image);

  return (
    <Box>
      {/* Steps without images as a simple list */}
      {withoutImage.length > 0 && (
        <Box sx={{ my: '128px', px: '10px', maxWidth: 600 }}>
          {withoutImage.map((s) => (
            <Typography key={s.step} sx={{ fontSize: '16px', color: 'text.secondary', mb: 1 }}>
              {s.label}
            </Typography>
          ))}
        </Box>
      )}

      {/* Steps with images as full-bleed sections */}
      {withImage.map((s) => (
        <FullBleedSection key={s.step} image={s.image} alt={s.label}>
          <Typography variant="h1">{s.label}</Typography>
          <Typography sx={{ fontSize: '16px', color: 'background.default', mt: 0.5 }}>
            {s.desc}
          </Typography>
        </FullBleedSection>
      ))}
    </Box>
  );
}
