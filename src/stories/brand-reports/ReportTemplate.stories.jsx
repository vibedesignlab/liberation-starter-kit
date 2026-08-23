import { BrandReportDocument } from '../../components/brand-documentation';
import { REPORT_STRUCTURES } from '../../utils/brand-reports';

const STAGE_META = {
  source_brand_analysis: {
    title: 'Source Brand Analysis Template',
    brandName: 'Reference brand',
    stage: 'source_brand_analysis',
  },
  extended_brand_anatomy: {
    title: 'Extended Brand Anatomy Template',
    brandName: 'Working brand',
    stage: 'extended_brand_anatomy',
  },
  landing_materials: {
    title: 'Landing Materials Template',
    brandName: 'Working brand',
    stage: 'landing_materials',
  },
};

function createTemplateReport(artifactType) {
  const meta = STAGE_META[artifactType];
  return {
    meta: {
      ...meta,
      status: 'Template',
      version: '2.0.0',
      summary: '모든 브랜드 리포트는 이 고정 섹션 구조와 공용 React 문서 컴포넌트를 사용합니다.',
    },
    sections: REPORT_STRUCTURES[artifactType].map(([id, title], index) => ({
      id,
      index: index + 1,
      label: `Stage ${String(Object.keys(STAGE_META).indexOf(artifactType) + 1).padStart(2, '0')}`,
      title,
      insight: `${title} 섹션은 정본 JSON의 승인된 내용만 표시합니다.`,
      blocks: [
        {
          type: 'prose',
          title: 'Fixed report slot',
          paragraphs: [
            `Section ID: ${id}`,
            '실제 리포트에서는 Stage 어댑터가 이 위치에 근거, 결정, 이미지 또는 구조화된 표를 배치합니다.',
          ],
        },
      ],
    })),
    review: {
      status: 'template',
      prompt: '실제 리포트에서는 stage-review.json의 조정 질문이 여기에 표시됩니다.',
    },
  };
}

const sourceReport = createTemplateReport('source_brand_analysis');
const extendedReport = createTemplateReport('extended_brand_anatomy');
const landingReport = createTemplateReport('landing_materials');

export default {
  title: 'Brand Reports/Templates',
  component: BrandReportDocument,
  parameters: {
    layout: 'fullscreen',
  },
};

export const SourceBrandAnalysis = {
  render: () => <BrandReportDocument report={ sourceReport } />,
};

export const ExtendedBrandAnatomy = {
  render: () => <BrandReportDocument report={ extendedReport } />,
};

export const LandingMaterials = {
  render: () => <BrandReportDocument report={ landingReport } />,
};
