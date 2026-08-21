import Box from '@mui/material/Box';

import { BrandBlockFrame } from './BrandBlockFrame.jsx';
import { BrandTypographySpecimen } from './BrandTypographySpecimen.jsx';

/**
 * Render a stack of observed source-brand typography specimens.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.block - Typography block with specimen `items`.
 */
export function BrandTypographySpecimens({ block }) {
  const items = Array.isArray(block.items)
    ? block.items
    : Array.isArray(block.specimens) ? block.specimens : [];

  return (
    <BrandBlockFrame title={ block.title } description={ block.description }>
      <Box sx={ { display: 'grid', gap: 2 } }>
        { items.map((item, itemIndex) => {
          const normalizedItem = typeof item === 'object' && item !== null
            ? item
            : { sample: String(item ?? '') };

          return (
            <BrandTypographySpecimen
              key={ normalizedItem.id ?? normalizedItem.label ?? normalizedItem.title ?? itemIndex }
              item={ normalizedItem }
            />
          );
        }) }
      </Box>
    </BrandBlockFrame>
  );
}
