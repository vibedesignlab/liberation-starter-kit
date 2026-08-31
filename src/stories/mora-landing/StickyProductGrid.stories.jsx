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
  },
  args: {
    scrollImages: [
      { src: sections.coreCollection.mainImage, alt: sections.coreCollection.mainImageAlt, aspectRatio: '3 / 4' },
      { src: sections.whyMora.makerImage, alt: sections.whyMora.makerAlt, aspectRatio: '3 / 2' },
      { src: sections.whyMora.etchingImage, alt: sections.whyMora.etchingAlt, aspectRatio: '3 / 2' },
    ],
    title: sections.coreCollection.title,
    body: sections.coreCollection.body,
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
    scrollImages: [
      { src: sections.studioTrials.mainImage, alt: sections.studioTrials.mainImageAlt, aspectRatio: '3 / 4' },
      { src: sections.clothToBody.image, alt: sections.clothToBody.imageAlt, aspectRatio: '4 / 5' },
    ],
    title: sections.studioTrials.title,
    body: sections.studioTrials.body,
    reverse: true,
  },
  render: (args) => (
    <Box>
      <StickyProductGrid {...args} products={trialProducts} />
    </Box>
  ),
};
