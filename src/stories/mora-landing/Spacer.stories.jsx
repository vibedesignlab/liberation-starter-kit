import Box from '@mui/material/Box';
import Spacer from '../../components/mora-landing/Spacer';

export default {
  title: 'Components/MORA Landing/Spacer',
  component: Spacer,
  parameters: { layout: 'centered' },
  argTypes: {
    height: { control: 'number' },
  },
  args: {
    height: 128,
  },
};

export const Playground = {
  render: (args) => (
    <Box sx={{ border: 1, borderColor: 'divider', width: 300 }}>
      <Box sx={{ p: 1, bgcolor: 'text.primary', color: 'background.default', fontSize: '11px' }}>
        Section above
      </Box>
      <Spacer {...args} />
      <Box sx={{ p: 1, bgcolor: 'text.primary', color: 'background.default', fontSize: '11px' }}>
        Section below
      </Box>
    </Box>
  ),
};

export const Tall = {
  args: { height: 256 },
  render: (args) => (
    <Box sx={{ border: 1, borderColor: 'divider', width: 300 }}>
      <Box sx={{ p: 1, bgcolor: 'text.primary', color: 'background.default', fontSize: '11px' }}>
        Section above
      </Box>
      <Spacer {...args} />
      <Box sx={{ p: 1, bgcolor: 'text.primary', color: 'background.default', fontSize: '11px' }}>
        Section below
      </Box>
    </Box>
  ),
};
