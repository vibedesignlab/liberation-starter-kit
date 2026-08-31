import Box from '@mui/material/Box';
import MoraNav from '../../components/mora-landing/MoraNav';
import { navigation } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/MoraNav',
  component: MoraNav,
  parameters: { layout: 'fullscreen' },
  args: navigation,
};

export const Playground = {
  render: (args) => (
    <Box sx={{ height: '200vh', bgcolor: 'background.default' }}>
      <MoraNav {...args} />
      <Box sx={{ p: 4, pt: 10, color: 'text.secondary', fontSize: '14px' }}>
        Scroll down to see background transition.
      </Box>
    </Box>
  ),
};
