import Typography from '@mui/material/Typography';
import FullBleedSection from '../../components/mora-landing/FullBleedSection';
import { sections } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/FullBleedSection',
  component: FullBleedSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    textPosition: {
      control: 'select',
      options: ['bottom-left', 'left-center', 'center'],
    },
    aspectRatio: { control: 'text' },
  },
  args: {
    image: sections.hero.image,
    alt: sections.hero.imageAlt,
    aspectRatio: '3 / 2',
    textPosition: 'bottom-left',
  },
};

export const Playground = {
  render: (args) => (
    <FullBleedSection {...args}>
      <Typography variant="h1" sx={{ color: 'background.default' }}>{sections.hero.headline}</Typography>
      <Typography sx={{ fontSize: '16px', color: 'background.default', opacity: 0.8, mt: 1 }}>
        {sections.hero.support}
      </Typography>
    </FullBleedSection>
  ),
};

export const LeftCenter = {
  args: { textPosition: 'left-center' },
  render: (args) => (
    <FullBleedSection {...args}>
      <Typography variant="h1">{sections.hero.headline}</Typography>
      <Typography sx={{ fontSize: '16px', color: 'text.secondary', mt: 1 }}>
        {sections.hero.support}
      </Typography>
    </FullBleedSection>
  ),
};

export const Center = {
  args: { image: sections.transition.image, alt: sections.transition.imageAlt, textPosition: 'center' },
  render: (args) => (
    <FullBleedSection {...args}>
      <Typography variant="h1" sx={{ color: 'background.default', whiteSpace: 'pre-line' }}>
        {sections.transition.headline}
      </Typography>
    </FullBleedSection>
  ),
};
