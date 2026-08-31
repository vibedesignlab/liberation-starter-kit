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

import landingContent from '../data/mora/content';

const {
  navigation,
  sections,
  newsletter,
  footer,
  coreProducts,
  trialProducts,
  vesselPhases,
} = landingContent;

/** Full-width material grid: illustrations first, raw ingredients second. */
function IngredientFolioGrid({ products }) {
  const visibleProducts = products.filter((product) => product.ingredient && product.etching);
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
          key={`${product.id}-folio`}
          component="img"
          src={product.etching}
          alt={product.etchingAlt}
          loading="lazy"
          sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block', borderRadius: 0 }}
        />
      ))}
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

export default function MoraLandingPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>

      <MoraNav {...navigation} />

      {/* Hero — left center */}
      <FullBleedSection image={sections.hero.image} alt={sections.hero.imageAlt} textPosition="left-center">
        <Typography variant="h1">
          {sections.hero.headline}
        </Typography>
        <Typography sx={{ fontSize: '16px', color: 'text.secondary', mt: 2 }}>
          {sections.hero.support}
        </Typography>
        <Typography
          component="a"
          href={sections.hero.ctaHref}
          sx={{
            display: 'inline-block', fontSize: '16px', color: 'text.primary',
            textDecoration: 'none', mt: 2,
            '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
          }}
        >
          {sections.hero.ctaLabel}
        </Typography>
      </FullBleedSection>

      {/* Brand Trace etching */}
      <Box id="transformation" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          src={sections.brandTrace.image}
          alt={sections.brandTrace.imageAlt}
          sx={{ width: '100%', maxWidth: '55%', display: 'block' }}
        />
      </Box>

      {/* Feature — center */}
      <FullBleedSection image={sections.transition.image} alt={sections.transition.imageAlt} textPosition="center">
        <Typography variant="h1" sx={{ color: 'background.default', whiteSpace: 'pre-line' }}>
          {sections.transition.headline}
        </Typography>
        <Typography
          component="a"
          href={sections.transition.ctaHref}
          sx={{
            display: 'inline-block', fontSize: '16px', color: 'background.default',
            textDecoration: 'none', mt: 2,
            '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
          }}
        >
          {sections.transition.ctaLabel}
        </Typography>
      </FullBleedSection>

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
          cta={sections.coreCollection.ctaLabel}
          ctaHref={sections.coreCollection.ctaHref}
        />
      </Box>

      {/* Core ingredient + etching pairs */}
      <IngredientFolioGrid products={coreProducts} />

      {/* Studio Trials — reversed */}
      <Box>
        <StickyProductGrid
          mainImage={sections.studioTrials.mainImage}
          mainAlt={sections.studioTrials.mainImageAlt}
          products={trialProducts}
          title={sections.studioTrials.title}
          body={sections.studioTrials.body}
          cta={sections.studioTrials.ctaLabel}
          ctaHref={sections.studioTrials.ctaHref}
          reverse
        />
      </Box>

      {/* Trial ingredient + etching pairs */}
      <IngredientFolioGrid products={trialProducts} />

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
        <Typography
          component="a"
          href={sections.materialMethod.ctaHref}
          sx={{
            display: 'inline-block', fontSize: '16px', color: 'background.default',
            textDecoration: 'none', mt: 2,
            '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
          }}
        >
          {sections.materialMethod.ctaLabel}
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
        <Typography sx={{ fontSize: '16px', color: 'background.default', opacity: 0.8, mt: 1 }}>
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
        <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>
          {footer.legal}
        </Typography>
        <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>
          {footer.facts}
        </Typography>
      </Box>
    </Box>
  );
}
