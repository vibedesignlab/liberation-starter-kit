import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Niksen "Join the family".
 */
export default function NewsletterCTA() {
  return (
    <Box sx={{ py: '128px', px: '10px', width: '100%' }}>
      <Typography variant="h1" sx={{ mb: 2, position: 'relative', zIndex: 1 }}>
        Stay close
      </Typography>
      <Typography sx={{ fontSize: '16px', color: 'text.secondary', mb: 3, position: 'relative', zIndex: 1 }}>
        Launch news and brand stories.
      </Typography>
      <Box sx={{ display: 'flex', gap: '2px' }}>
        <Box
          component="input"
          type="email"
          placeholder="Email"
          sx={{
            flex: 1,
            border: 1,
            borderColor: 'divider',
            borderRadius: 0,
            px: '10px',
            py: '8px',
            fontSize: '14px',
            fontFamily: 'inherit',
            bgcolor: 'transparent',
            color: 'text.primary',
            outline: 'none',
            '&:focus': { borderColor: 'text.primary' },
          }}
        />
        <Typography
          component="a"
          href="#"
          sx={{
            fontSize: '14px',
            color: 'text.primary',
            textDecoration: 'none',
            px: '16px',
            py: '8px',
            alignSelf: 'center',
            '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
          }}
        >
          Sign up
        </Typography>
      </Box>
    </Box>
  );
}
