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
      <FullBleedSection image={assets.heroAtelier} alt="MORA atelier" textPosition="left-center">
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
      <Box sx={{ py: '100px', display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          src={assets.etchBrandTrace}
          alt="The Trace That Remains"
          sx={{ width: '100%', maxWidth: '55%', display: 'block' }}
        />
      </Box>

      {/* Feature — center */}
      <FullBleedSection image={assets.clothTransition} alt="Straining cloth" textPosition="center">
        <Typography variant="h1">
          Not what to add,<br />but what to leave behind.
        </Typography>
        <Typography
          component="a"
          href="#transformation"
          sx={{
            display: 'inline-block', fontSize: '16px', color: 'text.primary',
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
              alt="Maker comparing three yogurt states"
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
          mainAlt="Morning — Thyme Honey"
          products={coreProducts}
          title="Vol. 1 — Four Directions"
          body="The first Core Collection."
          cta="See Core Collection"
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
          mainAlt="Afternoon — Roasted Buckwheat"
          products={trialProducts.concat(coreProducts.slice(0, 2))}
          title="Studio Trials"
          body="When verified, they join the next volume."
          cta="See development criteria"
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
        <Typography variant="h1">
          Same density,<br />six ingredient<br />directions.
        </Typography>
        <Typography
          component="a"
          href="#vessel"
          sx={{
            display: 'inline-block', fontSize: '16px', color: 'text.primary',
            textDecoration: 'none', mt: 2,
            '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
          }}
        >
          See Vessel Record
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
        <Typography variant="h2">
          The table where a cup is placed.
        </Typography>
        <Typography sx={{ fontSize: '16px', color: 'text.secondary', mt: 1 }}>
          Same density, different moment.
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
          Refrigerated &middot; 150 g &middot; Glass vessel &middot; Direct print
        </Typography>
      </Box>
    </Box>
  );
}
