import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { BrandDocumentValue } from './BrandDocumentValue.jsx';

/**
 * Display one source-brand typography specimen with its observed metadata.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.item - Specimen record with sample and typography properties.
 */
export function BrandTypographySpecimen({ item, fontLoadStatus }) {
  const fontSize = item.fontSize ?? item.size ?? 'clamp(1.75rem, 4vw, 3.5rem)';
  const meta = item.meta ?? [
    item.token,
    item.fontFamily,
    fontSize ? `Size ${ fontSize }` : null,
    item.fontWeight ? `Weight ${ item.fontWeight }` : null,
    item.fontStyle,
    item.lineHeight ? `Leading ${ item.lineHeight }` : null,
    item.letterSpacing ? `Tracking ${ item.letterSpacing }` : null,
  ].filter(Boolean).join(' · ');
  const details = Array.isArray(item.details) ? item.details : [];

  return (
    <Box sx={ { display: 'grid', gap: 2.5, p: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider' } }>
      <Box sx={ { display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' } }>
        <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' } }>
          <Typography variant="subtitle2" sx={ { fontWeight: 750, overflowWrap: 'anywhere' } }>
            { item.label ?? item.title ?? 'Typography specimen' }
          </Typography>
          { item.valueStatus && (
            <Chip
              size="small"
              variant="outlined"
              label={ item.valueStatus }
              sx={ { height: 24, borderRadius: 0, fontFamily: 'monospace', fontSize: 11 } }
            />
          ) }
          { fontLoadStatus && (
            <Chip
              size="small"
              variant="outlined"
              label={ `font ${ fontLoadStatus }` }
              color={ fontLoadStatus === 'error' ? 'error' : 'default' }
              sx={ { height: 24, borderRadius: 0, fontFamily: 'monospace', fontSize: 11 } }
            />
          ) }
        </Box>
        { meta && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={ {
              fontFamily: 'monospace',
              fontVariantNumeric: 'tabular-nums',
              overflowWrap: 'anywhere',
            } }
          >
            <BrandDocumentValue value={ meta } />
          </Typography>
        ) }
      </Box>
      <Typography
        component="p"
        sx={ {
          m: 0,
          fontFamily: item.fontFamily,
          fontSize,
          fontWeight: item.fontWeight,
          fontStyle: item.fontStyle,
          fontVariationSettings: item.fontVariationSettings,
          lineHeight: item.lineHeight ?? 1.15,
          letterSpacing: item.letterSpacing,
          color: item.color ?? 'text.primary',
          textTransform: item.textTransform,
          textWrap: item.role === 'body' ? 'pretty' : 'balance',
          wordBreak: 'keep-all',
          overflowWrap: 'anywhere',
          maxWidth: item.role === 'body' ? '68ch' : 'none',
        } }
      >
        { item.sample ?? item.text ?? 'Aa 가나 0123' }
      </Typography>
      { details.length > 0 && (
        <Box
          component="dl"
          sx={ {
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(6.5rem, 0.55fr) minmax(0, 1.45fr)', md: 'repeat(4, minmax(0, auto))' },
            gap: '0.5rem 1rem',
            m: 0,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          } }
        >
          { details.map(({ label, value }) => (
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
                <BrandDocumentValue value={ value } />
              </Typography>
            </Box>
          )) }
        </Box>
      ) }
      { item.description && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={ { lineHeight: 1.55, overflowWrap: 'anywhere' } }
        >
          <BrandDocumentValue value={ item.description } />
        </Typography>
      ) }
    </Box>
  );
}
