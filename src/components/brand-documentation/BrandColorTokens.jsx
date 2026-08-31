import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { BrandBlockFrame } from './BrandBlockFrame.jsx';
import { BrandDocumentValue } from './BrandDocumentValue.jsx';

function tokenDetails(item) {
  if (Array.isArray(item.details)) return item.details;

  return [
    { label: 'Relationship', value: item.relationship },
    { label: 'Contrast pair', value: item.contrastPair },
    { label: 'Contrast', value: item.contrastRatio },
    { label: 'Usage ratio', value: item.usageRatio },
    { label: 'Landing use', value: item.landingUse },
    { label: 'Status', value: item.status },
  ].filter(({ value }) => value !== null && value !== undefined && value !== '');
}

/**
 * Render directional brand colors as real swatches with token metadata.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.block - Color-token block with normalized `items`.
 */
export function BrandColorTokens({ block }) {
  const items = Array.isArray(block.items) ? block.items : [];

  return (
    <BrandBlockFrame title={ block.title } description={ block.description }>
      <Box
        sx={ {
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          borderTop: '1px solid',
          borderLeft: '1px solid',
          borderColor: 'divider',
        } }
      >
        { items.map((item, itemIndex) => {
          const value = item.value ?? item.hex ?? 'transparent';
          const foreground = item.onColor ?? item.foreground ?? 'text.primary';
          const details = tokenDetails(item);

          return (
            <Box
              component="figure"
              key={ item.id ?? item.token ?? item.label ?? itemIndex }
              sx={ {
                display: 'grid',
                gridTemplateRows: 'minmax(10rem, 1fr) auto',
                minWidth: 0,
                m: 0,
                borderRight: '1px solid',
                borderBottom: '1px solid',
                borderColor: 'divider',
              } }
            >
              <Box
                role="img"
                aria-label={ `${ item.label ?? item.token ?? 'Color token' } ${ value }` }
                sx={ {
                  display: 'flex',
                  minHeight: { xs: '10rem', md: '13rem' },
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: 2,
                  p: { xs: 2, md: 2.5 },
                  color: foreground,
                  backgroundColor: value,
                } }
              >
                <Box sx={ { display: 'grid', gap: 0.5, minWidth: 0 } }>
                  <Typography
                    variant="overline"
                    sx={ {
                      color: 'inherit',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      overflowWrap: 'anywhere',
                    } }
                  >
                    { item.token ?? `color.${ itemIndex + 1 }` }
                  </Typography>
                  <Typography
                    component="div"
                    sx={ {
                      color: 'inherit',
                      fontSize: 'clamp(1.35rem, 2.5vw, 2.25rem)',
                      fontWeight: 700,
                      lineHeight: 1.05,
                      letterSpacing: '-0.025em',
                      wordBreak: 'keep-all',
                    } }
                  >
                    { item.label ?? item.role ?? 'Color token' }
                  </Typography>
                </Box>
                <Typography
                  sx={ {
                    flex: '0 0 auto',
                    color: 'inherit',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                  } }
                >
                  { value }
                </Typography>
              </Box>

              <Box component="figcaption" sx={ { display: 'grid', gap: 2, p: { xs: 2, md: 2.5 } } }>
                { item.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={ { lineHeight: 1.6, textWrap: 'pretty', wordBreak: 'keep-all' } }
                  >
                    <BrandDocumentValue value={ item.description } />
                  </Typography>
                ) }
                { details.length > 0 && (
                  <Box
                    component="dl"
                    sx={ {
                      display: 'grid',
                      gridTemplateColumns: 'minmax(6.5rem, 0.55fr) minmax(0, 1.45fr)',
                      gap: '0.5rem 1rem',
                      m: 0,
                    } }
                  >
                    { details.map(({ label, value: detailValue }) => (
                      <Box key={ label } sx={ { display: 'contents' } }>
                        <Typography
                          component="dt"
                          variant="caption"
                          color="text.secondary"
                          sx={ { m: 0, fontWeight: 600 } }
                        >
                          { label }
                        </Typography>
                        <Typography
                          component="dd"
                          variant="caption"
                          sx={ { m: 0, lineHeight: 1.55, overflowWrap: 'anywhere' } }
                        >
                          <BrandDocumentValue value={ detailValue } />
                        </Typography>
                      </Box>
                    )) }
                  </Box>
                ) }
              </Box>
            </Box>
          );
        }) }
      </Box>
    </BrandBlockFrame>
  );
}
