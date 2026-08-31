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
    image: assets.momentMorning,
    label: 'Morning',
    productName: 'Thyme Honey',
  },
};

export const Playground = {};

export const Afternoon = {
  args: {
    image: assets.momentAfternoon,
    label: 'Afternoon',
    productName: 'Roasted Buckwheat',
  },
};

export const Evening = {
  args: {
    image: assets.momentEvening,
    label: 'Evening (Studio Trial)',
    productName: 'Olive Oil & Sea Salt',
  },
};
