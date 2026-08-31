import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

/**
 * Full-page closing scene that combines the table story, mailing list and footer.
 */
export default function TableFooter({
  image,
  mobileImage,
  imageAlt = '',
  headline = '',
  body = '',
  newsletter = {},
  footer = {},
}) {
  return (
    <Box
      component="footer"
      id="truth"
      data-nav-theme="dark"
      sx={{
        position: 'relative',
        minHeight: { xs: 'max(800px, 100svh)', md: 'max(860px, 100svh)' },
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        color: 'primary.contrastText',
      }}
    >
      <Box
        component="picture"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        {mobileImage && <source media="(max-width: 899.95px)" srcSet={mobileImage} />}
        <Box
          component="img"
          src={image}
          alt={imageAlt}
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: { xs: '58% center', md: 'center' },
            display: 'block',
          }}
        />
      </Box>

      <Box
        aria-hidden="true"
        sx={(theme) => ({
          position: 'absolute',
          inset: 0,
          background: {
            xs: `linear-gradient(180deg, ${alpha(theme.palette.primary.dark, 0.68)} 0%, ${alpha(theme.palette.primary.dark, 0.34)} 54%, ${alpha(theme.palette.primary.dark, 0.88)} 100%)`,
            md: `linear-gradient(90deg, ${alpha(theme.palette.primary.dark, 0.86)} 0%, ${alpha(theme.palette.primary.dark, 0.63)} 35%, ${alpha(theme.palette.primary.dark, 0.08)} 68%), linear-gradient(0deg, ${alpha(theme.palette.primary.dark, 0.88)} 0%, transparent 28%)`,
          },
        })}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 4, md: 8, lg: 10 },
          pt: { xs: 12, md: 16 },
          pb: { xs: 12, md: 16 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: { xs: 600, md: '42vw', lg: 720 } }}>
          <Typography
            variant="h1"
            component="h2"
            sx={{
              maxWidth: '9ch',
              fontSize: 'clamp(3.25rem, 5.4vw, 6.75rem)',
              fontWeight: 500,
              lineHeight: 0.94,
            }}
          >
            {headline}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              maxWidth: '38ch',
              mt: { xs: 3, md: 4 },
              fontSize: 'clamp(1.125rem, 1.35vw, 1.5rem)',
              lineHeight: 1.55,
              opacity: 0.82,
            }}
          >
            {body}
          </Typography>

          <Box
            sx={(theme) => ({
              mt: { xs: 8, md: 12 },
              pt: { xs: 4, md: 5 },
              borderTop: `1px solid ${alpha(theme.palette.primary.contrastText, 0.42)}`,
            })}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{
                maxWidth: '25ch',
                fontSize: 'clamp(1.5rem, 2.2vw, 2.5rem)',
                lineHeight: 1.2,
              }}
            >
              {newsletter.headline}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: '44ch',
                mt: { xs: 2, md: 2.5 },
                fontSize: 'clamp(1rem, 1.05vw, 1.1875rem)',
                opacity: 0.72,
              }}
            >
              {newsletter.body}
            </Typography>

            <Box
              component="form"
              action={newsletter.ctaHref}
              sx={{
                display: 'flex',
                width: '100%',
                minHeight: { xs: 64, md: 72 },
                mt: { xs: 4, md: 5 },
                borderBottom: 1,
                borderColor: 'currentColor',
              }}
            >
              <Box
                component="input"
                type="email"
                name="email"
                required
                aria-label={newsletter.emailPlaceholder || 'Email'}
                placeholder={newsletter.emailPlaceholder}
                sx={{
                  minWidth: 0,
                  flex: 1,
                  border: 0,
                  borderRadius: 0,
                  px: 0,
                  py: 2,
                  font: 'inherit',
                  fontSize: 'clamp(1.0625rem, 1.1vw, 1.25rem)',
                  bgcolor: 'transparent',
                  color: 'inherit',
                  outline: 'none',
                  '&::placeholder': { color: 'inherit', opacity: 0.62 },
                }}
              />
              <Button
                type="submit"
                color="inherit"
                sx={{
                  minWidth: 0,
                  borderRadius: 0,
                  px: 0,
                  ml: { xs: 3, md: 5 },
                  color: 'inherit',
                  alignSelf: 'stretch',
                  fontSize: 'clamp(0.9375rem, 1vw, 1.125rem)',
                }}
              >
                {newsletter.ctaLabel}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'flex-end' },
          gap: { xs: 2.5, md: 8 },
          px: { xs: 4, md: 8, lg: 10 },
          py: { xs: 4, md: 6 },
          borderTop: `1px solid ${alpha(theme.palette.primary.contrastText, 0.36)}`,
        })}
      >
        <Typography
          variant="body2"
          sx={{
            maxWidth: '52ch',
            color: 'inherit',
            fontSize: 'clamp(0.8125rem, 0.8vw, 0.9375rem)',
            opacity: 0.72,
          }}
        >
          {footer.legal}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            maxWidth: '60ch',
            color: 'inherit',
            fontSize: 'clamp(0.8125rem, 0.8vw, 0.9375rem)',
            textAlign: { xs: 'left', md: 'right' },
            opacity: 0.72,
          }}
        >
          {footer.facts}
        </Typography>
      </Box>
    </Box>
  );
}
