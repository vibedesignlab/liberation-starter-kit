import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

/**
 * MUI Card 대표 데모
 *
 * CardContent / CardActions / CardMedia 조합과 elevation·variant 표현.
 * 간격은 theme.spacing 토큰(sx)을 사용한다.
 */
export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
};

/** 기본 카드 (콘텐츠 + 액션) */
export const Basic = {
  render: () => (
    <Card sx={{ width: 320 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Liberation Starter Kit
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          MUI 기본 컴포넌트만 담은 라이트 스타터킷입니다. 디자인 토큰과 Storybook 설정을 그대로 제공합니다.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>자세히</Button>
        <Button size='small' color='secondary'>공유</Button>
      </CardActions>
    </Card>
  ),
};

/** 미디어 포함 카드 */
export const WithMedia = {
  render: () => (
    <Card sx={{ width: 320 }}>
      <CardMedia
        component='div'
        sx={{ height: 160, bgcolor: 'primary.main' }}
      />
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Media Card
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          CardMedia 영역에 이미지·영상·색상 블록을 배치할 수 있습니다.
        </Typography>
      </CardContent>
    </Card>
  ),
};

/** elevation / variant 비교 */
export const Variants = {
  render: () => (
    <Stack direction='row' spacing={3}>
      <Card elevation={1} sx={{ width: 180, p: 2 }}>
        <Typography variant='body2'>elevation 1</Typography>
      </Card>
      <Card elevation={8} sx={{ width: 180, p: 2 }}>
        <Typography variant='body2'>elevation 8</Typography>
      </Card>
      <Card variant='outlined' sx={{ width: 180, p: 2 }}>
        <Typography variant='body2'>outlined</Typography>
      </Card>
    </Stack>
  ),
};
