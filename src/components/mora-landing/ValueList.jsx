import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** Just names in a column. Minimal. */
export default function ValueList({ values = [] }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      {values.map((v) => (
        <Typography key={v.name} variant="body2" sx={{ color: 'text.primary' }}>
          {v.name}
        </Typography>
      ))}
    </Box>
  );
}
