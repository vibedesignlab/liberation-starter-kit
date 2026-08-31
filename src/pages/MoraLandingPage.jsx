import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  MoraNav,
  FullBleedSection,
  SplitEditorial,
  StickyProductGrid,
  VesselPhaseBlock,
  NewsletterCTA,
} from '../components/mora-landing';

import { motion, useTransform } from 'framer-motion';
import { HorizontalScrollContainer, useHorizontalScrollProgress } from '../components/content-transition';

import landingContent from '../data/mora/content';

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
          component="img"
          src={product.ingredient}
          alt={product.ingredientAlt}
          loading="lazy"
          sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block', borderRadius: 0 }}
        />
      ))}
    </Box>
  );
}

/**
 * RecipeSlideCard - 레시피 가로 스크롤 슬라이드 (Horizontal Parallax)
 *
 * 세로 패럴랙스 원리를 가로에 적용:
 * - 이미지: 빠른 속도로 진입 (translateX 배율 1.3x), 퇴장은 트랙과 동일 속도
 * - 텍스트: 이미지보다 더 빠르게 진입 (배율 1.5x), 퇴장은 트랙과 동일 속도
 * - opacity 없음, 순수 위치 차이만으로 깊이감 생성
 *
 * Props:
 * @param {Object} slide - recipeSlides 데이터 항목 [Required]
 * @param {number} index - 슬라이드 인덱스 [Required]
 * @param {number} total - 전체 슬라이드 수 [Required]
 */
function RecipeSlideCard({ slide, index, total }) {
  const scrollYProgress = useHorizontalScrollProgress();

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

  const textXRaw = useTransform(
    scrollYProgress,
    [slideCenter - segmentSize, slideCenter, slideCenter + segmentSize],
    [200, 0, -50]
  );
  const textX = useTransform(textXRaw, (v) => {
    if (v > 0) return v * v / 200;
    return -(Math.abs(v) ** 0.6);
  });

  return (
    <Box
      sx={{
        width: { xs: '85vw', sm: '60vw', md: '50vw' },
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div style={{ x: imgX }}>
        <Box
          component="img"
          src={slide.etching}
          alt={`${slide.name} material folio`}
          loading="lazy"
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            display: 'block',
            borderRadius: 0,
          }}
        />
      </motion.div>
      <motion.div
        style={{
          x: textX,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <Box sx={{ pt: { xs: '24px', md: '40px' }, pl: { xs: '20px', md: '32px' }, maxWidth: '80%' }}>
          <Typography
            variant="h1"
            sx={{ fontSize: 'clamp(2rem, calc(1.5rem + 2.5vw), 4rem)' }}
          >
            {slide.number} {slide.name}
          </Typography>
          <Typography
            sx={{
              fontSize: 'clamp(1.125rem, calc(1rem + 0.75vw), 1.75rem)',
              color: 'text.primary',
              mt: 2,
              lineHeight: 1.5,
            }}
          >
            {slide.headline}
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}

export default function MoraLandingPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>

      <MoraNav {...navigation} />

      {/* Hero — left center */}
      <FullBleedSection image={sections.hero.image} alt={sections.hero.imageAlt} textPosition="left-center">
        <Typography variant="h1" sx={{ color: 'primary.contrastText' }}>
          {sections.hero.headline}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: 'clamp(1.125rem, calc(1rem + 0.5vw), 1.375rem)',
            lineHeight: 1.5,
            color: 'rgba(245, 241, 232, 0.85)',
            mt: 3,
          }}
        >
          {sections.hero.support}
        </Typography>
      </FullBleedSection>

      {/* Feature — center */}
      <FullBleedSection image={sections.transition.image} alt={sections.transition.imageAlt} textPosition="center">
        <Typography variant="h1" sx={{ color: 'background.default', whiteSpace: 'pre-line' }}>
          {sections.transition.headline}
        </Typography>
      </FullBleedSection>

      {/* Recipe Scroll — Core 4 etchings with descriptions */}
      <Box id="transformation">
        <HorizontalScrollContainer gap="32px" padding="40px">
          {recipeSlides.map((slide, i) => (
            <HorizontalScrollContainer.Slide key={slide.id}>
              <RecipeSlideCard slide={slide} index={i} total={recipeSlides.length} />
            </HorizontalScrollContainer.Slide>
          ))}
        </HorizontalScrollContainer>
      </Box>

      {/* Why MORA: Maker + First Furrow */}
      <Box>
        <SplitEditorial
          left={
            <Box
              component="img"
              src={sections.whyMora.makerImage}
              alt={sections.whyMora.makerAlt}
              loading="lazy"
              sx={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block', borderRadius: 0 }}
            />
          }
          right={
            <Box
              component="img"
              src={sections.whyMora.etchingImage}
              alt={sections.whyMora.etchingAlt}
              loading="lazy"
              sx={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block', borderRadius: 0 }}
            />
          }
        />
      </Box>

      {/* Core Collection */}
      <Box id="collection">
        <StickyProductGrid
          mainImage={sections.coreCollection.mainImage}
          mainAlt={sections.coreCollection.mainImageAlt}
          products={coreProducts}
          title={sections.coreCollection.title}
          body={sections.coreCollection.body}
        />
      </Box>

      {/* Core ingredient grid (aerial only) */}
      <IngredientGrid products={coreProducts} />

      {/* Studio Trials — reversed */}
      <Box>
        <StickyProductGrid
          mainImage={sections.studioTrials.mainImage}
          mainAlt={sections.studioTrials.mainImageAlt}
          products={trialProducts}
          title={sections.studioTrials.title}
          body={sections.studioTrials.body}
          reverse
        />
      </Box>

      {/* Trial ingredient grid (aerial only) */}
      <IngredientGrid products={trialProducts} />

      {/* Cloth to Body etching */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          src={sections.clothToBody.image}
          alt={sections.clothToBody.imageAlt}
          sx={{ width: '100%', maxWidth: '60%', display: 'block' }}
        />
      </Box>

      {/* Collection Statement — left center */}
      <FullBleedSection image={sections.materialMethod.image} alt={sections.materialMethod.imageAlt} textPosition="left-center">
        <Typography variant="h1" sx={{ color: 'background.default', whiteSpace: 'pre-line' }}>
          {sections.materialMethod.headline}
        </Typography>
      </FullBleedSection>

      {/* Vessel Record */}
      <Box id="vessel">
        {vesselPhases.map((vp) => (
          <VesselPhaseBlock
            key={vp.phase}
            phase={vp.phase}
            label={vp.label}
            desc={vp.desc}
            image={vp.image}
            alt={vp.alt}
          />
        ))}
      </Box>

      {/* Use Moment */}
      <FullBleedSection image={sections.evening.image} alt={sections.evening.imageAlt} textPosition="bottom-left">
        <Typography variant="h2" sx={{ color: 'background.default' }}>
          {sections.evening.headline}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: 'clamp(1.0625rem, calc(1rem + 0.3vw), 1.25rem)',
            color: 'background.default',
            opacity: 0.85,
            mt: 2,
          }}
        >
          {sections.evening.body}
        </Typography>
      </FullBleedSection>

      <NewsletterCTA {...newsletter} />

      {/* Footer */}
      <Box
        component="footer"
        id="truth"
        sx={{
          display: 'flex', justifyContent: 'space-between',
          px: '10px', py: '40px',
          borderTop: 1, borderColor: 'divider',
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {footer.legal}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {footer.facts}
        </Typography>
      </Box>
    </Box>
  );
}
