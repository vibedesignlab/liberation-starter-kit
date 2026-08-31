import TableFooter from '../../components/mora-landing/TableFooter';
import { footer, newsletter, sections } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/TableFooter',
  component: TableFooter,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    image: { control: false },
    imageAlt: { control: 'text' },
    headline: { control: 'text' },
    body: { control: 'text' },
    newsletter: { control: 'object' },
    footer: { control: 'object' },
  },
  args: {
    image: sections.evening.image,
    imageAlt: sections.evening.imageAlt,
    headline: sections.evening.headline,
    body: sections.evening.body,
    newsletter,
    footer,
  },
};

export const Playground = {};
