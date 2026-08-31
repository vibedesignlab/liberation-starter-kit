import Box from '@mui/material/Box';
import StickyProductGrid from '../../components/mora-landing/StickyProductGrid';
import assets from '../../data/mora/assets';
import { coreProducts, trialProducts } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/StickyProductGrid',
  component: StickyProductGrid,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    reverse: { control: 'boolean' },
    title: { control: 'text' },
    body: { control: 'text' },
    cta: { control: 'text' },
  },
  args: {
    mainImage: assets.momentMorning,
    mainAlt: 'Core Collection last fold and final check',
    title: 'Vol. 1 — Four Directions',
    body: '한 번의 마지막 판단으로 이어지는 네 가지 방향.',
    cta: 'Core Collection 보기',
    ctaHref: '#',
    reverse: false,
  },
};

export const Playground = {
  render: (args) => (
    <Box sx={{ my: '128px' }}>
      <StickyProductGrid {...args} products={coreProducts} />
    </Box>
  ),
};

export const Reversed = {
  args: {
    mainImage: assets.momentAfternoon,
    mainAlt: 'Studio Trials conditional state check',
    title: 'Studio Trials',
    body: '확인되기 전에는 출시하지 않는 두 가지 조건부 방향.',
    cta: '검증 기준 보기',
    reverse: true,
  },
  render: (args) => (
    <Box sx={{ my: '128px' }}>
      <StickyProductGrid {...args} products={trialProducts} />
    </Box>
  ),
};
