import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import VideoScrubbing from './VideoScrubbing';

import testVideo from '../../assets/video/9-motion.mp4';

/**
 * VideoScrubbing
 *
 * 스크롤 위치에 따라 비디오를 프레임 단위로 재생(스크러빙)하는 컴포넌트.
 * IntersectionObserver + requestAnimationFrame 기반 ~60fps 최적화.
 */
export default {
  title: 'Components/VideoScrubbing',
  component: VideoScrubbing,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    src: {
      control: 'text',
      description: '비디오 소스 경로',
    },
    scrollRange: {
      control: 'object',
      description: '스크롤 범위 매핑 { start, end }',
    },
  },
};

/**
 * ScrollArea - 스크롤 영역 래퍼
 *
 * Props:
 * @param {React.ReactNode} children - 내부 콘텐츠 [Required]
 * @param {string} height - 최소 높이 [Optional, 기본값: '150vh']
 */
function ScrollArea({ children, height = '150vh' }) {
  return (
    <Box sx={ { minHeight: height, pb: 8 } }>
      { children }
    </Box>
  );
}

export const Default = {
  render: () => (
    <Box sx={ { p: 4 } }>
      <Typography variant="h5" sx={ { fontWeight: 700, mb: 1 } }>
        VideoScrubbing
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
        스크롤하여 비디오 재생을 테스트하세요.
      </Typography>
      <ScrollArea>
        <Box sx={ { maxWidth: 800 } }>
          <VideoScrubbing src={ testVideo } />
        </Box>
      </ScrollArea>
    </Box>
  ),
};

export const WithProgressCallback = {
  render: () => {
    const [progress, setProgress] = useState(0);

    return (
      <Box sx={ { p: 4 } }>
        <Typography variant="h5" sx={ { fontWeight: 700, mb: 1 } }>
          Progress Callback
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
          onProgressChange 콜백으로 진행도(0-1)를 외부에서 활용할 수 있습니다.
        </Typography>
        <ScrollArea height="180vh">
          <Box
            sx={ {
              position: 'sticky',
              top: 0,
              zIndex: 5,
              backgroundColor: 'grey.100',
              py: 1.5,
              px: 2,
              mb: 3,
            } }
          >
            <Typography variant="body2" sx={ { fontFamily: 'monospace' } }>
              progress: { (progress * 100).toFixed(1) }%
            </Typography>
            <Box sx={ { height: 4, backgroundColor: 'grey.300', mt: 1 } }>
              <Box
                sx={ {
                  height: '100%',
                  width: `${progress * 100}%`,
                  backgroundColor: 'primary.main',
                  transition: 'width 0.05s linear',
                } }
              />
            </Box>
          </Box>
          <Box sx={ { maxWidth: 800 } }>
            <VideoScrubbing
              src={ testVideo }
              onProgressChange={ setProgress }
            />
          </Box>
        </ScrollArea>
      </Box>
    );
  },
};

export const WithContainerRef = {
  render: () => {
    const containerRef = useRef(null);

    return (
      <Box sx={ { p: 4 } }>
        <Typography variant="h5" sx={ { fontWeight: 700, mb: 1 } }>
          Container Reference
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
          containerRef를 전달하면 해당 컨테이너 기준으로 스크롤 진행도를 계산합니다.
        </Typography>
        <ScrollArea height="180vh">
          <Box
            ref={ containerRef }
            sx={ {
              height: '150vh',
              backgroundColor: 'grey.50',
              p: 2,
            } }
          >
            <Typography variant="caption" color="text.secondary" sx={ { mb: 2, display: 'block' } }>
              이 컨테이너 높이 기준으로 비디오 진행
            </Typography>
            <Box sx={ { position: 'sticky', top: 16, maxWidth: 800 } }>
              <VideoScrubbing
                src={ testVideo }
                containerRef={ containerRef }
              />
            </Box>
          </Box>
        </ScrollArea>
      </Box>
    );
  },
};

export const AspectRatios = {
  render: () => (
    <Box sx={ { p: 4 } }>
      <Typography variant="h5" sx={ { fontWeight: 700, mb: 1 } }>
        Aspect Ratios
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
        sx prop으로 다양한 비율을 적용할 수 있습니다.
      </Typography>
      <ScrollArea height="300vh">
        <Stack spacing={ 6 } sx={ { maxWidth: 800 } }>
          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, fontFamily: 'monospace' } }>
              aspectRatio: 21/9 (Cinematic)
            </Typography>
            <VideoScrubbing
              src={ testVideo }
              sx={ { aspectRatio: '21/9', objectFit: 'cover' } }
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, fontFamily: 'monospace' } }>
              aspectRatio: 16/9 (Standard)
            </Typography>
            <VideoScrubbing
              src={ testVideo }
              sx={ { aspectRatio: '16/9', objectFit: 'cover' } }
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, fontFamily: 'monospace' } }>
              aspectRatio: 4/3 (Classic)
            </Typography>
            <VideoScrubbing
              src={ testVideo }
              sx={ { aspectRatio: '4/3', objectFit: 'cover' } }
            />
          </Box>
        </Stack>
      </ScrollArea>
    </Box>
  ),
};
