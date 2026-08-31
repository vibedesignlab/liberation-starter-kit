import UseMomentCard from '../../components/mora-landing/UseMomentCard';
import { sections } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/UseMomentCard',
  component: UseMomentCard,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    label: { control: 'text' },
    productName: { control: 'text' },
  },
  args: {
    image: sections.evening.image,
    label: sections.evening.headline,
    productName: sections.evening.productName,
  },
};

export const Playground = {};
