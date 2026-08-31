import Box from '@mui/material/Box';
import SplitEditorial from '../../components/mora-landing/SplitEditorial';
import assets from '../../data/mora/assets';

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
          src={assets.whyMoraMaker}
          alt="Maker"
          sx={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block' }}
        />
      }
      right={
        <Box
          component="img"
          src={assets.etchFirstFurrow}
          alt="First Furrow etching"
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
          src={assets.ingredientThymeHoney}
          alt="Thyme Honey ingredient"
          sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }}
        />
      }
      right={
        <Box
          component="img"
          src={assets.etchThymeHoney}
          alt="Thyme Honey material folio"
          sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }}
        />
      }
    />
  ),
};
