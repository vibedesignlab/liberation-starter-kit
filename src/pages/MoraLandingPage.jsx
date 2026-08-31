import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  MoraNav,
  FullBleedSection,
  StickyProductGrid,
  VesselPhaseBlock,
  TableFooter,
} from '../components/mora-landing';

// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { HorizontalScrollContainer, useHorizontalScrollProgress } from '../components/content-transition';
import { VideoScrubbing } from '../components/scroll';

import landingContent from '../data/mora/content';
import transitionVideo from '../assets/video/mora-transition-r7.mp4';

const {
  navigation,
  sections,
  newsletter,
  footer,
  coreProducts,
  trialProducts,
  vesselPhases,
  recipeSlides,
} = landingContent;

/** Full-width material grid: raw ingredient images only. */
function IngredientGrid({ products }) {
  const visibleProducts = products.filter((product) => product.ingredient);
  if (!visibleProducts.length) return null;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, minmax(0, 1fr))',
          md: `repeat(${visibleProducts.length}, minmax(0, 1fr))`,
        },
        gap: '2px',
        width: '100%',
      }}
    >
      {visibleProducts.map((product) => (
        <Box
          key={`${product.id}-ingredient`}
          sx={{ position: 'relative' }}
        >
          <Box
            component="img"
            src={product.ingredient}
            alt={product.ingredientAlt}
            loading="lazy"
            sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block', borderRadius: 0 }}
          />
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              px: { xs: 1.5, md: 2 },
              py: { xs: 1, md: 1.5 },
              color: 'primary.contrastText',
              letterSpacing: '0.05em',
            }}
          >
            {product.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/**
 * RecipeSlideCard - 85vw split-layout 레시피 슬라이드
 *
 * 왼쪽: horizon-line 그리드 위에 단계적 텍스트 리빌 (number → name → headline → desc)
 * 오른쪽: 에칭 이미지
 * 가로 패럴랙스 (translateX only, no opacity)
 *
 * Props:
 * @param {Object} slide - recipeSlides 데이터 항목 [Required]
 * @param {number} index - 슬라이드 인덱스 [Required]
 * @param {number} total - 전체 슬라이드 수 [Required]
 */
function RecipeSlideCard({ slide, index, total }) {
  const scrollYProgress = useHorizontalScrollProgress();
  const reduceMotion = useReducedMotion();
  const segmentSize = 1 / total;
  const slideCenter = (index + 0.5) * segmentSize;

  const imgXRaw = useTransform(
    scrollYProgress,
    [slideCenter - segmentSize, slideCenter, slideCenter + segmentSize],
    [120, 0, -30]
  );
  const imgX = useTransform(imgXRaw, (v) => {
    if (v > 0) return v * v / 120;
    return -(Math.abs(v) ** 0.6);
  });

  const numberXRaw = useTransform(
    scrollYProgress,
    [slideCenter - segmentSize, slideCenter, slideCenter + segmentSize],
    [280, 0, -50]
  );
  const numberX = useTransform(numberXRaw, (v) => {
    if (v > 0) return v * v / 280;
    return -(Math.abs(v) ** 0.6);
  });

  const nameXRaw = useTransform(
    scrollYProgress,
    [slideCenter - segmentSize * 0.85, slideCenter, slideCenter + segmentSize],
    [240, 0, -50]
  );
  const nameX = useTransform(nameXRaw, (v) => {
    if (v > 0) return v * v / 240;
    return -(Math.abs(v) ** 0.6);
  });

  const headlineXRaw = useTransform(
    scrollYProgress,
    [slideCenter - segmentSize * 0.7, slideCenter, slideCenter + segmentSize],
    [200, 0, -50]
  );
  const headlineX = useTransform(headlineXRaw, (v) => {
    if (v > 0) return v * v / 200;
    return -(Math.abs(v) ** 0.6);
  });

  const descXRaw = useTransform(
    scrollYProgress,
    [slideCenter - segmentSize * 0.55, slideCenter, slideCenter + segmentSize],
    [160, 0, -50]
  );
  const descX = useTransform(descXRaw, (v) => {
    if (v > 0) return v * v / 160;
    return -(Math.abs(v) ** 0.6);
  });

  const mediaOpacity = useTransform(
    scrollYProgress,
    [0, 0.08],
    [0, 1]
  );

  const line1Scale = useTransform(
    scrollYProgress,
    [slideCenter - segmentSize * 0.9, slideCenter - segmentSize * 0.6],
    [0, 1]
  );
  const line2Scale = useTransform(
    scrollYProgress,
    [slideCenter - segmentSize * 0.7, slideCenter - segmentSize * 0.4],
    [0, 1]
  );
  const line3Scale = useTransform(
    scrollYProgress,
    [slideCenter - segmentSize * 0.5, slideCenter - segmentSize * 0.2],
    [0, 1]
  );

  return (
    <Box
      sx={{
        width: { xs: '92vw', md: '85vw' },
        height: '100%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Left — description with horizon-line separators */}
      <Box
        sx={{
          width: { xs: '100%', md: '40%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 6 },
          py: { xs: 2, md: 0 },
          overflow: 'hidden',
        }}
      >
        <motion.div style={{ x: numberX }}>
          <Typography
            variant="h2"
            sx={{
              letterSpacing: '0.1em',
              pb: { xs: 1.5, md: 4 },
            }}
          >
            {slide.number}
          </Typography>
        </motion.div>

        <motion.div style={{ scaleX: line1Scale, originX: 1 }}>
          <Box sx={{ width: '100%', height: '1px', bgcolor: 'text.primary' }} />
        </motion.div>

        <motion.div style={{ x: nameX }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: 'clamp(1.5rem, calc(0.5rem + 4vw), 5rem)',
              lineHeight: 0.95,
              py: { xs: 1.5, md: 5 },
            }}
          >
            {slide.name}
          </Typography>
        </motion.div>

        <motion.div style={{ scaleX: line2Scale, originX: 1 }}>
          <Box sx={{ width: '100%', height: '1px', bgcolor: 'text.primary' }} />
        </motion.div>

        <motion.div style={{ x: headlineX }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: 'clamp(0.875rem, calc(0.75rem + 1vw), 1.75rem)',
              lineHeight: 1.4,
              py: { xs: 1.5, md: 5 },
            }}
          >
            {slide.headline}
          </Typography>
        </motion.div>

        {slide.desc && (
          <>
            <motion.div style={{ scaleX: line3Scale, originX: 1 }}>
              <Box sx={{ width: '100%', height: '1px', bgcolor: 'text.primary' }} />
            </motion.div>
            <motion.div style={{ x: descX }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  pt: { xs: 1.5, md: 5 },
                }}
              >
                {slide.desc}
              </Typography>
            </motion.div>
          </>
        )}
      </Box>

      {/* Right — restrained recipe motion folio (60%) */}
      <Box sx={{ width: { xs: '100%', md: '60%' }, maxHeight: { xs: '42vh', md: 'none' }, overflow: 'hidden' }}>
        <motion.div style={{ x: imgX, opacity: mediaOpacity, height: '100%' }}>
          <Box
            component={reduceMotion || !slide.motion ? 'img' : 'video'}
            src={reduceMotion || !slide.motion ? slide.etching : slide.motion}
            poster={reduceMotion || !slide.motion ? undefined : slide.etching}
            alt={reduceMotion || !slide.motion ? `${slide.name} material folio` : undefined}
            aria-label={reduceMotion || !slide.motion ? undefined : `${slide.name} recipe motion folio`}
            autoPlay={reduceMotion || !slide.motion ? undefined : true}
            loop={reduceMotion || !slide.motion ? undefined : true}
            muted={reduceMotion || !slide.motion ? undefined : true}
            playsInline={reduceMotion || !slide.motion ? undefined : true}
            preload={reduceMotion || !slide.motion ? undefined : 'metadata'}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </motion.div>
      </Box>
    </Box>
  );
}

export default function MoraLandingPage() {
  const heroRef = useRef(null);
  const transitionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const [heroH, setHeroH] = useState(800);
  useEffect(() => {
    if (!heroRef.current) return;
    const update = () => setHeroH(heroRef.current.offsetHeight || 800);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(heroRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const hp = Math.max(0.02, (0.15 * heroH - 20) / heroH);
  const heroLogoScale = useTransform(heroScrollProgress, [0, hp * 0.5, hp], [3.5, 3.5, 1]);
  const heroLogoOpacity = useTransform(heroScrollProgress, [hp - 0.01, hp + 0.02], [1, 0]);

  const { scrollYProgress: transitionScrollProgress } = useScroll({
    target: transitionRef,
    offset: ['start start', 'end end'],
  });
  const transitionCopyY = useTransform(
    transitionScrollProgress,
    [0, 0.12, 0.42],
    ['0vh', '0vh', '-58vh']
  );
  const transitionCopyOpacity = useTransform(
    transitionScrollProgress,
    [0, 0.28, 0.42],
    [1, 1, 0]
  );
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', overflowX: 'clip' }}>

      <MoraNav {...navigation} heroRef={heroRef} />

      {/* Hero */}
      <Box ref={heroRef} data-nav-theme="dark" sx={{ position: 'relative' }}>
        <FullBleedSection image={sections.hero.image} alt={sections.hero.imageAlt} textPosition="left-center" aspectRatio={{ xs: '2 / 3', md: '3 / 2' }} loading="eager">
          <Typography variant="h1" sx={{ color: 'primary.contrastText' }}>
            {sections.hero.headline}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'primary.contrastText',
              opacity: 0.85,
              mt: 3,
            }}
          >
            {sections.hero.support}
          </Typography>
        </FullBleedSection>

        {/* Hero logotype — 히어로 안에서 자연스럽게 스크롤, GNB 도달 시 nav로 인수 */}
        <Box sx={{ position: 'absolute', top: { xs: '8%', md: '15%' }, left: { xs: '6vw', md: '8vw' }, zIndex: 2 }}>
          <motion.a
            href={navigation.brandHref || '#'}
            style={{
              scale: heroLogoScale,
              opacity: heroLogoOpacity,
              transformOrigin: 'left center',
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: (theme) => theme.typography.headingFontFamily,
                fontSize: 'clamp(0.875rem, calc(0.8rem + 0.3vw), 1rem)',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'primary.contrastText',
                lineHeight: 1,
              }}
            >
              {navigation.brandLabel}
            </Typography>
          </motion.a>
        </Box>
      </Box>

      {/* Feature — scroll-scrubbed process transition */}
      <Box
        ref={transitionRef}
        data-nav-theme="dark"
        component="section"
        aria-label={sections.transition.imageAlt}
        sx={{
          position: 'relative',
          height: { xs: '260vh', md: '320vh' },
          bgcolor: 'background.default',
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            bgcolor: 'background.default',
          }}
        >
          <VideoScrubbing
            src={transitionVideo}
            containerRef={transitionRef}
            aria-hidden="true"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 3,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              style={{
                y: reduceMotion ? 0 : transitionCopyY,
                opacity: reduceMotion ? 1 : transitionCopyOpacity,
                width: '100%',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: 'background.default',
                  fontSize: 'clamp(3.5rem, 8vw, 8.5rem)',
                  lineHeight: 0.94,
                  letterSpacing: '-0.035em',
                  whiteSpace: 'pre-line',
                  textAlign: 'center',
                  maxWidth: 'lg',
                  mx: 'auto',
                }}
              >
                {sections.transition.headline}
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </Box>

      {/* Recipe Scroll — Core 4 etchings with descriptions */}
      <Box id="transformation">
        <HorizontalScrollContainer
          gap="32px"
          padding="40px"
          backgroundColor="transparent"
          seamlessEntry
        >
          {recipeSlides.map((slide, i) => (
            <HorizontalScrollContainer.Slide key={slide.id}>
              <RecipeSlideCard slide={slide} index={i} total={recipeSlides.length} />
            </HorizontalScrollContainer.Slide>
          ))}
        </HorizontalScrollContainer>
      </Box>

      {/* Core Collection — main, maker, etching 통합 스크롤 */}
      <Box id="collection">
        <StickyProductGrid
          scrollImages={[
            { src: sections.coreCollection.mainImage, alt: sections.coreCollection.mainImageAlt, aspectRatio: '3 / 4' },
            { src: sections.whyMora.makerImage, alt: sections.whyMora.makerAlt, aspectRatio: '3 / 2' },
            { src: sections.whyMora.etchingImage, alt: sections.whyMora.etchingAlt, aspectRatio: '3 / 2' },
          ]}
          products={coreProducts}
          title={sections.coreCollection.title}
          body={sections.coreCollection.body}
        />
      </Box>

      {/* Core ingredient grid */}
      <IngredientGrid products={coreProducts} />

      {/* Studio Trials — main, cloth-to-body 통합 스크롤 */}
      <Box>
        <StickyProductGrid
          scrollImages={[
            { src: sections.studioTrials.mainImage, alt: sections.studioTrials.mainImageAlt, aspectRatio: '1 / 2' },
            { src: sections.clothToBody.image, alt: sections.clothToBody.imageAlt, aspectRatio: '3 / 2' },
          ]}
          products={trialProducts}
          title={sections.studioTrials.title}
          body={sections.studioTrials.body}
          reverse
        />
      </Box>

      {/* Trial ingredient grid */}
      <IngredientGrid products={trialProducts} />

      {/* Collection Statement — left center */}
      <Box data-nav-theme="dark">
        <FullBleedSection image={sections.materialMethod.image} alt={sections.materialMethod.imageAlt} textPosition="left-center" aspectRatio={{ xs: '2 / 3', md: '3 / 2' }}>
        <Typography variant="h1" sx={{ color: 'background.default', whiteSpace: 'pre-line' }}>
          {sections.materialMethod.headline}
        </Typography>
      </FullBleedSection>
      </Box>

      {/* Vessel Record */}
      <Box id="vessel" data-nav-theme="dark">
        {vesselPhases.map((vp) => (
          <VesselPhaseBlock
            key={vp.phase}
            phase={vp.phase}
            label={vp.label}
            desc={vp.desc}
            image={vp.image}
            alt={vp.alt}
            aspectRatio={{ xs: '2 / 3', md: '3 / 2' }}
          />
        ))}
      </Box>

      {/* Table story + mailing list + footer */}
      <TableFooter
        image={sections.evening.image}
        imageAlt={sections.evening.imageAlt}
        headline={sections.evening.headline}
        body={sections.evening.body}
        newsletter={newsletter}
        footer={footer}
      />
    </Box>
  );
}
