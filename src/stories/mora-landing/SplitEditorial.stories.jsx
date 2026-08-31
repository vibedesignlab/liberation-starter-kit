import Box from '@mui/material/Box';
import SplitEditorial from '../../components/mora-landing/SplitEditorial';
import { coreProducts, sections } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/SplitEditorial',
  component: SplitEditorial,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    reverse: { control: 'boolean' },
  },
  args: {
    reverse: false,
  },
};

export const Playground = {
  render: (args) => (
    <SplitEditorial
      {...args}
      left={
        <Box
          component="img"
          src={sections.whyMora.makerImage}
          alt={sections.whyMora.makerAlt}
          sx={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block' }}
        />
      }
      right={
        <Box
          component="img"
          src={sections.whyMora.etchingImage}
          alt={sections.whyMora.etchingAlt}
          sx={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block' }}
        />
      }
    />
  ),
};

export const Reversed = {
  args: { reverse: true },
  render: (args) => (
    <SplitEditorial
      {...args}
      left={
        <Box
          component="img"
          src={coreProducts[0].ingredient}
          alt={coreProducts[0].ingredientAlt}
          sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }}
        />
      }
      right={
        <Box
          component="img"
          src={coreProducts[0].etching}
          alt={coreProducts[0].etchingAlt}
          sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }}
        />
      }
    />
  ),
};
