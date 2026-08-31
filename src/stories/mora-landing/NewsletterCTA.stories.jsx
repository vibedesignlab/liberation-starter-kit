import Box from '@mui/material/Box';
import NewsletterCTA from '../../components/mora-landing/NewsletterCTA';
import { newsletter } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/NewsletterCTA',
  component: NewsletterCTA,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    headline: { control: 'text' },
    body: { control: 'text' },
    emailPlaceholder: { control: 'text' },
    ctaLabel: { control: 'text' },
    ctaHref: { control: 'text' },
  },
  args: newsletter,
};

export const Playground = {
  render: (args) => (
    <Box sx={{ bgcolor: 'background.default' }}>
      <NewsletterCTA {...args} />
    </Box>
  ),
};
