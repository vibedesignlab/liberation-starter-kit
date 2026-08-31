import Box from '@mui/material/Box';
import VesselPhaseBlock from '../../components/mora-landing/VesselPhaseBlock';
import { vesselPhases } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/VesselPhaseBlock',
  component: VesselPhaseBlock,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    phase: { control: 'text' },
    label: { control: 'text' },
    desc: { control: 'text' },
    alt: { control: 'text' },
  },
  args: {
    ...vesselPhases[0],
  },
};

export const Playground = {};

export const AllPhases = {
  render: () => (
    <Box>
      {vesselPhases.map((vp) => (
        <VesselPhaseBlock key={vp.phase} {...vp} />
      ))}
    </Box>
  ),
};
