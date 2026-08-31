import Box from '@mui/material/Box';
import ConditionalCard from '../../components/mora-landing/ConditionalCard';
import { trialProducts } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/ConditionalCard',
  component: ConditionalCard,
  parameters: { layout: 'centered' },
};

export const Playground = {
  render: () => (
    <Box sx={{ width: 200, bgcolor: 'background.default' }}>
      <ConditionalCard product={trialProducts[0]} />
    </Box>
  ),
};

export const AllTrials = {
  render: () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', maxWidth: 400 }}>
      {trialProducts.map((p) => (
        <ConditionalCard key={p.id} product={p} />
      ))}
    </Box>
  ),
};
