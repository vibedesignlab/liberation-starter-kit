import Box from '@mui/material/Box';
import ProductCard from '../../components/mora-landing/ProductCard';
import { coreProducts } from '../../data/mora/content';

export default {
  title: 'Components/MORA Landing/ProductCard',
  component: ProductCard,
  parameters: { layout: 'centered' },
};

export const Playground = {
  render: () => (
    <Box sx={{ width: 200, bgcolor: 'background.default' }}>
      <ProductCard product={coreProducts[0]} />
    </Box>
  ),
};

export const AllCore = {
  render: () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', maxWidth: 400 }}>
      {coreProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </Box>
  ),
};
