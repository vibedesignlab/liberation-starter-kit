import UseMomentCard from '../../components/mora-landing/UseMomentCard';
import assets from '../../data/mora/assets';

export default {
  title: 'Components/MORA Landing/UseMomentCard',
  component: UseMomentCard,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    label: { control: 'text' },
    productName: { control: 'text' },
  },
  args: {
    image: assets.momentEvening,
    label: '한 컵이 놓이는 식탁',
    productName: 'MORA Craft Greek Yogurt',
  },
};

export const Playground = {};
