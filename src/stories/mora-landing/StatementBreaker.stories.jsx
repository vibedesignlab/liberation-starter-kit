import StatementBreaker from '../../components/mora-landing/StatementBreaker';
import { sections } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/StatementBreaker',
  component: StatementBreaker,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    statement: { control: 'text' },
  },
  args: {
    image: sections.materialMethod.image,
    statement: sections.materialMethod.headline.replace('\n', ' '),
  },
};

export const Playground = {};
