import { BrandReportDocument } from '../../components/brand-documentation';

const templateReport = {
  meta: {
    title: 'Brand Report Component Template',
    brandName: 'Liberation',
    stage: 'System preview',
    status: 'Available',
    version: '1.0',
    summary: 'Stage별 정본 JSON이 공통 문서 모델로 변환된 뒤 조립되는 기본 구조입니다.',
  },
  sections: [
    {
      id: 'template-structure',
      index: 1,
      label: 'Structure',
      title: '공통 문서 모델',
      description: '리포트마다 마크업을 새로 만들지 않고 섹션과 블록 조합으로 표현합니다.',
      blocks: [
        {
          type: 'prose',
          title: '정본과 표현 계층',
          paragraphs: [
            'Stage JSON은 분석과 브랜드 결정을 보존하는 정본입니다.',
            'Storybook 어댑터는 정본을 읽기 위한 구조로 정리하지만 내용을 새로 해석하지 않습니다.',
          ],
        },
        {
          type: 'table',
          title: '지원 블록',
          columns: [
            { key: 'block', label: 'Block' },
            { key: 'purpose', label: 'Purpose' },
          ],
          rows: [
            { block: 'prose / list', purpose: '서술과 원칙' },
            { block: 'table / card-grid', purpose: '구조화된 비교와 관계' },
            { block: 'evidence-grid', purpose: '근거 이미지와 provenance' },
            { block: 'typography-specimens', purpose: '검증된 웹폰트 표본' },
          ],
        },
      ],
    },
    {
      id: 'template-lifecycle',
      index: 2,
      label: 'Lifecycle',
      title: '등록과 갱신',
      blocks: [
        {
          type: 'list',
          title: '운영 규칙',
          items: [
            'Stage 패키지를 먼저 수정하고 검증합니다.',
            '등록 CLI로 public 패키지와 CSF 엔트리를 다시 생성합니다.',
            '생성된 Storybook 파일과 public 복사본은 직접 편집하지 않습니다.',
          ],
        },
      ],
    },
  ],
  review: {
    status: 'example',
    prompt: '실제 리포트에서는 stage-review.json의 조정 질문이 이 위치에 표시됩니다.',
  },
};

export default {
  title: 'Brand Reports/Report Template',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Docs = {
  render: () => <BrandReportDocument report={ templateReport } />,
};
