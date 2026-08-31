import Typography from '@mui/material/Typography';

/** Simple text span. Not a Chip. */
export default function FactBadge({ label }) {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: '11px',
        color: 'text.secondary',
        border: 1,
        borderColor: 'divider',
        px: '8px',
        py: '3px',
        borderRadius: 0,
        display: 'inline-block',
      }}
    >
      {label}
    </Typography>
  );
}
