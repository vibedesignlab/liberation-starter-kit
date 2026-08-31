import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { HorizontalScrollContainer } from './HorizontalScrollContainer';

/**
 * HorizontalScrollContainer
 *
 * 세로 스크롤을 가로 이동으로 변환하는 컨테이너.
 * 마지막 아이템이 화면에 완전히 들어오면 즉시 세로 스크롤로 전환됩니다.
 */
export default {
  title: 'Components/HorizontalScrollContainer',
  component: HorizontalScrollContainer,
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'text',
      description: '슬라이드 간 간격 (CSS 단위)',
    },
    padding: {
      control: 'text',
      description: '좌우 패딩 (CSS 단위)',
    },
    backgroundColor: {
      control: 'color',
      description: '배경색',
    },
    onScrollProgress: {
      action: 'scrollProgress',
      description: '스크롤 진행도 콜백 (0-1)',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * SlotBox - 스토리 데모용 슬롯 블록
 *
 * Props:
 * @param {string} label - 라벨 [Required]
 * @param {number} width - 폭 [Optional, 기본값: 360]
 * @param {number} height - 높이 [Optional, 기본값: 240]
 */
function SlotBox({ label, width = 360, height = 240 }) {
  return (
    <Box
      sx={ {
        width,
        height,
        backgroundColor: 'grey.100',
        border: '1px dashed',
        borderColor: 'grey.300',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      } }
    >
      <Typography variant="caption" color="text.disabled" sx={ { fontFamily: 'monospace' } }>
        { label }
      </Typography>
    </Box>
  );
}

/**
 * SectionBox - 스토리 데모용 섹션 블록
 *
 * Props:
 * @param {string} label - 라벨 [Required]
 * @param {string} height - 높이 [Optional, 기본값: '50vh']
 */
function SectionBox({ label, height = '50vh' }) {
  return (
    <Box
      sx={ {
        height,
        backgroundColor: 'grey.50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      } }
    >
      <Typography variant="caption" color="text.disabled" sx={ { fontFamily: 'monospace' } }>
        { label }
      </Typography>
    </Box>
  );
}

export const Default = {
  args: {
    gap: '24px',
    padding: '40px',
  },
  render: (args) => (
    <Box>
      <SectionBox label="Scroll Down" />

      <HorizontalScrollContainer { ...args }>
        { Array.from({ length: 10 }, (_, i) => (
          <HorizontalScrollContainer.Slide key={ i }>
            <SlotBox label={ `Slide ${i + 1}` } />
          </HorizontalScrollContainer.Slide>
        )) }
      </HorizontalScrollContainer>

      <SectionBox label="End of Section" />
    </Box>
  ),
};

export const WideSlides = {
  render: () => (
    <Box>
      <SectionBox label="Scroll Down" height="30vh" />

      <HorizontalScrollContainer gap="32px" padding="48px">
        { Array.from({ length: 8 }, (_, i) => (
          <HorizontalScrollContainer.Slide key={ i }>
            <SlotBox label={ `Panel ${i + 1}` } width={ 600 } height={ 320 } />
          </HorizontalScrollContainer.Slide>
        )) }
      </HorizontalScrollContainer>

      <SectionBox label="End of Section" height="30vh" />
    </Box>
  ),
};

export const ManyItems = {
  render: () => (
    <Box>
      <SectionBox label="Scroll Down" height="30vh" />

      <HorizontalScrollContainer gap="16px" padding="32px" backgroundColor="grey.900">
        { Array.from({ length: 15 }, (_, i) => (
          <HorizontalScrollContainer.Slide key={ i }>
            <SlotBox label={ `Item ${i + 1}` } width={ 280 } height={ 180 } />
          </HorizontalScrollContainer.Slide>
        )) }
      </HorizontalScrollContainer>

      <SectionBox label="End of Section" height="30vh" />
    </Box>
  ),
};
