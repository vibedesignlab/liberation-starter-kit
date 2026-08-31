import Box from '@mui/material/Box';
import EtchingDivider from '../../components/mora-landing/EtchingDivider';

export default {
  title: 'Components/MORA Landing/EtchingDivider',
  component: EtchingDivider,
  parameters: { layout: 'centered' },
};

export const Playground = {
  render: () => (
    <Box sx={{ width: 600, py: 4, bgcolor: 'background.default' }}>
      <EtchingDivider />
    </Box>
  ),
};
