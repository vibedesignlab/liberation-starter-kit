import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** Just names in a column. Minimal. */
export default function ValueList({ values = [] }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {values.map((v) => (
        <Typography key={v.name} sx={{ fontSize: '16px', color: 'text.primary' }}>
          {v.name}
        </Typography>
      ))}
    </Box>
  );
}
