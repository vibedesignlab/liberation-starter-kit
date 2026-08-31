import Typography from '@mui/material/Typography';
import FullBleedSection from '../../components/mora-landing/FullBleedSection';
import assets from '../../data/mora/assets';

export default {
  title: 'Components/MORA Landing/FullBleedSection',
  component: FullBleedSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    textPosition: {
      control: 'select',
      options: ['bottom-left', 'left-center', 'center'],
    },
    aspectRatio: { control: 'text' },
  },
  args: {
    image: assets.heroAtelier,
    alt: 'MORA atelier',
    aspectRatio: '3 / 2',
    textPosition: 'bottom-left',
  },
};

export const Playground = {
  render: (args) => (
    <FullBleedSection {...args}>
      <Typography variant="h1" sx={{ color: 'background.default' }}>좋은 재료를 고르는 데서 끝나지 않습니다.</Typography>
      <Typography sx={{ fontSize: '16px', color: 'background.default', opacity: 0.8, mt: 1 }}>
        재료를 고르고, 변환의 중간을 살피고, 마지막 한 컵까지 확인합니다.
      </Typography>
    </FullBleedSection>
  ),
};

export const LeftCenter = {
  args: { textPosition: 'left-center' },
  render: (args) => (
    <FullBleedSection {...args}>
      <Typography variant="h1">좋은 재료를 고르는 데서 끝나지 않습니다.</Typography>
      <Typography sx={{ fontSize: '16px', color: 'text.secondary', mt: 1 }}>
        재료를 고르고, 변환의 중간을 살피고, 마지막 한 컵까지 확인합니다.
      </Typography>
    </FullBleedSection>
  ),
};

export const Center = {
  args: { image: assets.clothTransition, textPosition: 'center' },
  render: (args) => (
    <FullBleedSection {...args}>
      <Typography variant="h1" sx={{ color: 'background.default' }}>
        한 컵의 중간을<br />숨기지 않습니다.
      </Typography>
    </FullBleedSection>
  ),
};
