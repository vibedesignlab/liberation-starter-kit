import Box from '@mui/material/Box';
import StickyProductGrid from '../../components/mora-landing/StickyProductGrid';
import { coreProducts, sections, trialProducts } from '../../data/mora/content';

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
    mainImage: sections.coreCollection.mainImage,
    mainAlt: sections.coreCollection.mainImageAlt,
    title: sections.coreCollection.title,
    body: sections.coreCollection.body,
    cta: sections.coreCollection.ctaLabel,
    ctaHref: sections.coreCollection.ctaHref,
    reverse: false,
  },
};

export const Playground = {
  render: (args) => (
    <Box>
      <StickyProductGrid {...args} products={coreProducts} />
    </Box>
  ),
};

export const Reversed = {
  args: {
    mainImage: sections.studioTrials.mainImage,
    mainAlt: sections.studioTrials.mainImageAlt,
    title: sections.studioTrials.title,
    body: sections.studioTrials.body,
    cta: sections.studioTrials.ctaLabel,
    ctaHref: sections.studioTrials.ctaHref,
    reverse: true,
  },
  render: (args) => (
    <Box>
      <StickyProductGrid {...args} products={trialProducts} />
    </Box>
  ),
};
