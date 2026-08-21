import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Display one source-brand typography specimen with its observed metadata.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.item - Specimen record with sample and typography properties.
 */
export function BrandTypographySpecimen({ item }) {
  const fontSize = item.fontSize ?? item.size ?? 'clamp(1.75rem, 4vw, 3.5rem)';
  const meta = item.meta ?? [
    item.fontFamily,
    item.fontWeight ? `Weight ${ item.fontWeight }` : null,
    item.fontStyle,
    item.lineHeight ? `Leading ${ item.lineHeight }` : null,
  ].filter(Boolean).join(' · ');

  return (
    <Box sx={ { display: 'grid', gap: 2, p: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider' } }>
      <Box sx={ { display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' } }>
        <Typography variant="subtitle2" sx={ { fontWeight: 700 } }>
          { item.label ?? item.title ?? 'Typography specimen' }
        </Typography>
        { meta && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={ { fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' } }
          >
            { meta }
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
          textWrap: 'balance',
          wordBreak: 'keep-all',
          overflowWrap: 'anywhere',
        } }
      >
        { item.sample ?? item.text ?? 'Aa 가나 0123' }
      </Typography>
      { item.description && (
        <Typography variant="caption" color="text.secondary" sx={ { lineHeight: 1.55 } }>
          { item.description }
        </Typography>
      ) }
    </Box>
  );
}
