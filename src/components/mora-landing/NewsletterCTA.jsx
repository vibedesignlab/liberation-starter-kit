import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Newsletter subscribe section.
 *
 * Props:
 * @param {string} headline - 제목 [Optional]
 * @param {string} body - 본문 [Optional]
 * @param {string} emailPlaceholder - 이메일 입력 플레이스홀더 [Optional]
 * @param {string} ctaLabel - CTA 버튼 텍스트 [Optional]
 * @param {string} ctaHref - CTA 링크 [Optional]
 *
 * Example usage:
 * <NewsletterCTA headline="Join" body="..." emailPlaceholder="you@email.com" ctaLabel="Subscribe" />
 */
export default function NewsletterCTA({
  headline = '',
  body = '',
  emailPlaceholder = '',
  ctaLabel = '',
  ctaHref = '#',
}) {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 6 }, width: '100%' }}>
      <Typography variant="h1" sx={{ mb: 2, position: 'relative', zIndex: 1 }}>
        {headline}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, position: 'relative', zIndex: 1 }}>
        {body}
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.25 }}>
        <Box
          component="input"
          type="email"
          placeholder={emailPlaceholder}
          sx={{
            flex: 1,
            border: 1,
            borderColor: 'divider',
            borderRadius: 0,
            px: 1.25,
            py: 1,
            fontSize: (theme) => theme.typography.button.fontSize,
            fontFamily: 'inherit',
            bgcolor: 'transparent',
            color: 'text.primary',
            outline: 'none',
            '&:focus': { borderColor: 'text.primary' },
          }}
        />
        <Typography
          variant="button"
          component="a"
          href={ctaHref}
          sx={{
            color: 'text.primary',
            textDecoration: 'none',
            px: 2,
            py: 1,
            alignSelf: 'center',
            '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
          }}
        >
          {ctaLabel}
        </Typography>
      </Box>
    </Box>
  );
}
