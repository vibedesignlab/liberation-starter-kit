import StatementBreaker from '../../components/mora-landing/StatementBreaker';
import assets from '../../data/mora/assets';

export default {
  title: 'Components/MORA Landing/StatementBreaker',
  component: StatementBreaker,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    statement: { control: 'text' },
  },
  args: {
    image: assets.methodProcessTable,
    statement: 'Not what to add, but what to leave behind.',
  },
};

export const Playground = {};
