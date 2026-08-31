import Box from '@mui/material/Box';
import StickyProductGrid from '../../components/mora-landing/StickyProductGrid';
import assets from '../../data/mora/assets';
import { coreProducts, trialProducts } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/StickyProductGrid',
  component: StickyProductGrid,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    reverse: { control: 'boolean' },
    title: { control: 'text' },
    body: { control: 'text' },
    cta: { control: 'text' },
  },
  args: {
    mainImage: assets.momentMorning,
    mainAlt: 'Morning — Thyme Honey',
    title: 'Vol. 1 — Four Directions',
    body: 'The first Core Collection.',
    cta: 'See Core Collection',
    ctaHref: '#',
    reverse: false,
  },
};

export const Playground = {
  render: (args) => (
    <Box sx={{ my: '128px' }}>
      <StickyProductGrid {...args} products={coreProducts} />
    </Box>
  ),
};

export const Reversed = {
  args: {
    mainImage: assets.momentAfternoon,
    mainAlt: 'Afternoon — Roasted Buckwheat',
    title: 'Studio Trials',
    body: 'When verified, they join the next volume.',
    cta: 'See development criteria',
    reverse: true,
  },
  render: (args) => (
    <Box sx={{ my: '128px' }}>
      <StickyProductGrid {...args} products={trialProducts.concat(coreProducts.slice(0, 2))} />
    </Box>
  ),
};
