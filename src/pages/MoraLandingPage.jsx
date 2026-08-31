import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  MoraNav,
  FullBleedSection,
  Spacer,
  SplitEditorial,
  StickyProductGrid,
  VesselPhaseBlock,
  NewsletterCTA,
} from '../components/mora-landing';

import assets from '../data/mora/assets';
import {
  brand,
  coreProducts,
  trialProducts,
  vesselPhases,
} from '../data/mora/content';

/** Ingredient + etching pair for one product. SplitEditorial: aerial left, etching right. */
function IngredientFolioPair({ product }) {
  if (!product.ingredient || !product.etching) return null;
  return (
    <SplitEditorial
      left={
        <Box
          component="img"
          src={product.ingredient}
          alt={`${product.name} ingredient`}
          loading="lazy"
          sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block', borderRadius: 0 }}
        />
      }
      right={
        <Box
          component="img"
          src={product.etching}
          alt={`${product.name} material folio`}
          loading="lazy"
          sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block', borderRadius: 0 }}
        />
      }
    />
  );
}

export default function MoraLandingPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>

      <MoraNav />

      {/* Hero — left center */}
      <FullBleedSection image={assets.heroAtelier} alt="원재료를 선별하는 MORA 메이커" textPosition="left-center">
        <Typography variant="h1">
          {brand.headline}
        </Typography>
        <Typography sx={{ fontSize: '16px', color: 'text.secondary', mt: 2 }}>
          {brand.support}
        </Typography>
        <Typography
          component="a"
          href="#collection"
          sx={{
            display: 'inline-block', fontSize: '16px', color: 'text.primary',
            textDecoration: 'none', mt: 2,
            '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
          }}
        >
          {brand.primaryCta}
        </Typography>
      </FullBleedSection>

      {/* Brand Trace etching */}
      <Box id="transformation" sx={{ py: '100px', display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          src={assets.etchBrandTrace}
          alt="The Trace That Remains"
          sx={{ width: '100%', maxWidth: '55%', display: 'block' }}
        />
      </Box>

      {/* Feature — center */}
      <FullBleedSection image={assets.clothTransition} alt="Straining cloth" textPosition="center">
        <Typography variant="h1" sx={{ color: 'background.default' }}>
          한 컵의 중간을<br />숨기지 않습니다.
        </Typography>
        <Typography
          component="a"
          href="#vessel"
          sx={{
            display: 'inline-block', fontSize: '16px', color: 'background.default',
            textDecoration: 'none', mt: 2,
            '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
          }}
        >
          {brand.secondaryCta}
        </Typography>
      </FullBleedSection>

      {/* Why MORA: Maker + First Furrow */}
      <Box sx={{ my: '128px' }}>
        <SplitEditorial
          left={
            <Box
              component="img"
              src={assets.whyMoraMaker}
              alt="승인할 재료와 제외할 재료를 비교하는 MORA 메이커"
              loading="lazy"
              sx={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block', borderRadius: 0 }}
            />
          }
          right={
            <Box
              component="img"
              src={assets.etchFirstFurrow}
              alt="The First Furrow"
              loading="lazy"
              sx={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block', borderRadius: 0 }}
            />
          }
        />
      </Box>

      {/* Core Collection */}
      <Box id="collection" sx={{ my: '128px' }}>
        <StickyProductGrid
          mainImage={assets.momentMorning}
          mainAlt="Core Collection의 마지막 fold와 final check"
          products={coreProducts}
          title="Vol. 1 — Four Directions"
          body="한 번의 마지막 판단으로 이어지는 네 가지 방향."
          cta="Core Collection 보기"
          ctaHref="#collection"
        />
      </Box>

      {/* Core ingredient + etching pairs */}
      {coreProducts.map((p) => (
        <IngredientFolioPair key={p.id} product={p} />
      ))}

      <Spacer />

      {/* Studio Trials — reversed */}
      <Box sx={{ my: '128px' }}>
        <StickyProductGrid
          mainImage={assets.momentAfternoon}
          mainAlt="Studio Trials의 조건부 중간 상태 확인"
          products={trialProducts}
          title="Studio Trials"
          body="확인되기 전에는 출시하지 않는 두 가지 조건부 방향."
          cta="검증 기준 보기"
          ctaHref="#truth"
          reverse
        />
      </Box>

      {/* Trial ingredient + etching pairs */}
      {trialProducts.map((p) => (
        <IngredientFolioPair key={p.id} product={p} />
      ))}

      {/* Cloth to Body etching */}
      <Box sx={{ py: '100px', display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          src={assets.etchClothToBody}
          alt="From Cloth to Body"
          sx={{ width: '100%', maxWidth: '60%', display: 'block' }}
        />
      </Box>

      {/* Collection Statement — left center */}
      <FullBleedSection image={assets.methodProcessTable} alt="Material method" textPosition="left-center">
        <Typography variant="h1" sx={{ color: 'background.default' }}>
          재료마다 다르게 준비하고,<br />한 번 접습니다.
        </Typography>
        <Typography
          component="a"
          href="#vessel"
          sx={{
            display: 'inline-block', fontSize: '16px', color: 'background.default',
            textDecoration: 'none', mt: 2,
            '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
          }}
        >
          Batch Record 보기
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
          />
        ))}
      </Box>

      {/* Use Moment */}
      <FullBleedSection image={assets.momentEvening} alt="Evening table" textPosition="bottom-left">
        <Typography variant="h2" sx={{ color: 'background.default' }}>
          한 컵이 놓이는 식탁.
        </Typography>
        <Typography sx={{ fontSize: '16px', color: 'background.default', opacity: 0.8, mt: 1 }}>
          한 jar와 한 spoon만으로 남긴 절제된 사용 맥락.
        </Typography>
      </FullBleedSection>

      <NewsletterCTA />

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
        <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>
          &copy; 2026 MORA. All images are commercial photography direction visualizations.
        </Typography>
        <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>
          Refrigerated direction &middot; 150 g candidate &middot; Wide-mouth vessel &middot; Partial Batch Record
        </Typography>
      </Box>
    </Box>
  );
}
