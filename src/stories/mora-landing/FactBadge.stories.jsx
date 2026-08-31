import Box from '@mui/material/Box';
import FactBadge from '../../components/mora-landing/FactBadge';
import { facts } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/FactBadge',
  component: FactBadge,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: 'Refrigerated',
  },
};

export const Playground = {};

export const AllFacts = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {facts.map((f) => (
        <FactBadge key={f.label} label={f.label} />
      ))}
    </Box>
  ),
};
