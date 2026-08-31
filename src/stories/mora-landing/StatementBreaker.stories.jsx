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
    statement: '재료마다 다르게 준비하고, 한 번 접습니다.',
  },
};

export const Playground = {};
