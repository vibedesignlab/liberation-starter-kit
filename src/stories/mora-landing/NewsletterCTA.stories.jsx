import Box from '@mui/material/Box';
import NewsletterCTA from '../../components/mora-landing/NewsletterCTA';

export default {
  title: 'Components/MORA Landing/NewsletterCTA',
  component: NewsletterCTA,
  parameters: { layout: 'fullscreen' },
};

export const Playground = {
  render: () => (
    <Box sx={{ bgcolor: 'background.default' }}>
      <NewsletterCTA />
    </Box>
  ),
};
