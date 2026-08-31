import Typography from '@mui/material/Typography';
import FullBleedSection from '../../components/mora-landing/FullBleedSection';
import assets from '../../data/mora/assets';

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
    image: assets.heroAtelier,
    alt: 'MORA atelier',
    aspectRatio: '3 / 2',
    textPosition: 'bottom-left',
  },
};

export const Playground = {
  render: (args) => (
    <FullBleedSection {...args}>
      <Typography variant="h1">A cup where ingredients leave their trace.</Typography>
      <Typography sx={{ fontSize: '16px', color: 'text.secondary', mt: 1 }}>
        We show the process before the product.
      </Typography>
    </FullBleedSection>
  ),
};

export const LeftCenter = {
  args: { textPosition: 'left-center' },
  render: (args) => (
    <FullBleedSection {...args}>
      <Typography variant="h1">A cup where ingredients leave their trace.</Typography>
      <Typography sx={{ fontSize: '16px', color: 'text.secondary', mt: 1 }}>
        We show the process before the product.
      </Typography>
    </FullBleedSection>
  ),
};

export const Center = {
  args: { image: assets.clothTransition, textPosition: 'center' },
  render: (args) => (
    <FullBleedSection {...args}>
      <Typography variant="h1">
        Not what to add,<br />but what to leave behind.
      </Typography>
    </FullBleedSection>
  ),
};
