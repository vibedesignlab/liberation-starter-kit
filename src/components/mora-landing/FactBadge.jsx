import Typography from '@mui/material/Typography';

/** Simple text span. Not a Chip. */
export default function FactBadge({ label }) {
  return (
    <Typography
      variant="overline"
      component="span"
      sx={{
        color: 'text.secondary',
        border: 1,
        borderColor: 'divider',
        px: 1,
        py: 0.375,
        borderRadius: 0,
        display: 'inline-block',
      }}
    >
      {label}
    </Typography>
  );
}
