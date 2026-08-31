import Box from '@mui/material/Box';

/**
 * Full-bleed 2-column grid. gap 2px. Each column holds an image
 * or content. No max-width constraint.
 */
export default function SplitEditorial({ left, right, reverse = false }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: '2px',
        width: '100%',
      }}
    >
      {reverse ? (
        <>
          {right}
          {left}
        </>
      ) : (
        <>
          {left}
          {right}
        </>
      )}
    </Box>
  );
}
