import ProcessScroll from '../../components/mora-landing/ProcessScroll';
import { processSteps } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/ProcessScroll',
  component: ProcessScroll,
  parameters: { layout: 'fullscreen' },
};

export const Playground = {
  render: () => <ProcessScroll steps={processSteps} />,
};
