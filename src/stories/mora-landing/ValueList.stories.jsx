import Box from '@mui/material/Box';
import ValueList from '../../components/mora-landing/ValueList';
import { values } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/ValueList',
  component: ValueList,
  parameters: { layout: 'centered' },
};

export const Playground = {
  render: () => (
    <Box sx={{ width: 300, bgcolor: 'background.default', p: 2 }}>
      <ValueList values={values} />
    </Box>
  ),
};
