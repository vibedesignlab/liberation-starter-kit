import Box from '@mui/material/Box';

/** 1px line. No animation. */
export default function EtchingDivider() {
  return <Box sx={{ borderTop: 1, borderColor: 'divider', width: '100%' }} />;
}
