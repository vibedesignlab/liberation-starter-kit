import {
  asArray,
  asRecord,
  displayValue,
  firstText,
  hasContent,
  isRecord,
  meaningfulEntries,
  pickValue,
  slugify,
  titleize,
  toText,
  uniqueStrings,
} from './helpers.js';
import { resolveAsset, toPublicAssetUrl } from './paths.js';

export function proseBlock(title, paragraphs) {
  const normalized = asArray(paragraphs).map(toText).filter(Boolean);
  if (!normalized.length) return null;
  return {
    type: 'prose',
    ...(toText(title) ? { title: toText(title) } : {}),
    paragraphs: normalized,
  };
}

export function listBlock(title, items, options = {}) {
  const normalized = asArray(items)
    .map((item) => (isRecord(item) ? displayValue(item) : toText(item)))
    .filter(Boolean);
  if (!normalized.length) return null;
  return {
    type: 'list',
    ...(toText(title) ? { title: toText(title) } : {}),
    items: normalized,
    ...(options.ordered ? { ordered: true } : {}),
  };
}

function normalizedColumns(columns, rows) {
  const supplied = asArray(columns);
  if (supplied.length) {
    return supplied.map((column, index) => {
      if (isRecord(column)) {
        const key = firstText(column.key, column.id, column.label, `column_${index + 1}`);
        return { key, label: firstText(column.label, titleize(key)) };
      }
      const key = toText(column) || `column_${index + 1}`;
      return { key, label: titleize(key) };
    });
  }

  const keys = [];
  asArray(rows).forEach((row) => {
    Object.keys(asRecord(row)).forEach((key) => {
      if (!keys.includes(key)) keys.push(key);
    });
  });
  return keys.map((key) => ({ key, label: titleize(key) }));
}

export function tableBlock(title, columns, rows) {
  const sourceRows = asArray(rows).filter(isRecord);
  if (!sourceRows.length) return null;
  const normalized = normalizedColumns(columns, sourceRows);
  if (!normalized.length) return null;

  return {
    type: 'table',
    ...(toText(title) ? { title: toText(title) } : {}),
    columns: normalized,
    rows: sourceRows.map((row) =>
      Object.fromEntries(normalized.map(({ key }) => [key, displayValue(row[key])])),
    ),
  };
}

export function keyValueTable(title, record) {
  const rows = meaningfulEntries(record)
    .filter(([, value]) => !isRecord(value) && !Array.isArray(value))
    .map(([key, value]) => ({ field: titleize(key), value: displayValue(value) }));
  return tableBlock(title, [
    { key: 'field', label: 'Field' },
    { key: 'value', label: 'Value' },
  ], rows);
}

function cardFields(record, ignoredKeys) {
  return meaningfulEntries(record)
    .filter(([key, value]) =>
      !ignoredKeys.has(key) && !Array.isArray(value) && !isRecord(value),
    )
    .map(([key, value]) => ({ label: titleize(key), value: displayValue(value) }));
}

export function toCard(item, index, options = {}) {
  if (!isRecord(item)) {
    const body = toText(item);
    return { id: `${options.idPrefix || 'card'}-${index + 1}`, title: body, body: '' };
  }

  const titleKeys = ['title', 'name', 'product_name', 'working_name', 'headline', 'grammar_id', 'claim_id', 'asset_id', 'evidence_id', 'section'];
  const eyebrowKeys = ['eyebrow', 'role', 'lineup_role', 'status', 'epistemic_status', 'domain', 'asset_id', 'evidence_id'];
  const bodyKeys = ['body', 'description', 'summary', 'copy', 'promise', 'product_usp', 'claim', 'communication_job', 'intended_effect', 'meaning'];
  const title = firstText(...titleKeys.map((key) => item[key]), `Item ${index + 1}`);
  const eyebrow = firstText(...eyebrowKeys.map((key) => item[key]));
  const body = firstText(...bodyKeys.map((key) => item[key]));
  const ignoredKeys = new Set([...titleKeys, ...eyebrowKeys, ...bodyKeys]);
  const items = meaningfulEntries(item)
    .filter(([key, value]) => !ignoredKeys.has(key) && Array.isArray(value))
    .flatMap(([key, value]) =>
      value.map((entry) => `${titleize(key)}: ${displayValue(entry)}`).filter(Boolean),
    );
  const nestedRecords = meaningfulEntries(item)
    .filter(([key, value]) => !ignoredKeys.has(key) && isRecord(value))
    .map(([key, value]) => `${titleize(key)}: ${displayValue(value)}`);

  const fields = cardFields(item, ignoredKeys);
  const detailLines = [
    body,
    ...fields.map(({ label, value }) => `${label}: ${value}`),
    ...items,
    ...nestedRecords,
  ].filter(Boolean);

  return {
    id: slugify(firstText(item.id, item.asset_id, item.evidence_id, item.product_name, item.claim_id, item.grammar_id, title), `${options.idPrefix || 'card'}-${index + 1}`),
    ...(eyebrow ? { eyebrow } : {}),
    title,
    body: detailLines.join('\n'),
    ...(fields.length ? { fields } : {}),
    ...(items.length ? { items } : {}),
  };
}

export function cardGridBlock(title, items, options = {}) {
  const cards = asArray(items).filter(hasContent).map((item, index) => toCard(item, index, options));
  if (!cards.length) return null;
  return {
    type: 'card-grid',
    ...(toText(title) ? { title: toText(title) } : {}),
    items: cards,
  };
}

function assetMeta(asset) {
  const fields = [
    ['Role', firstText(asset.role, asset.product_image_job, asset.product_representation_job)],
    ['Source tier', asset.source_tier],
    ['Market', asset.market],
    ['Era / date', firstText(asset.era_or_date, asset.generated_at)],
    ['Credit', asset.credit],
    ['Rights', asset.rights_note],
    ['Status', asset.status],
    ['Aspect ratio', asset.aspect_ratio],
    ['Delivery dimensions', asset.delivery_dimensions],
    ['Reference lineage', asset.reference_lineage],
    ['Invariants', asset.invariants],
    ['Allowed variation', asset.allowed_variation],
    ['Invariant check', asset.invariant_check],
    ['Generation provenance', asset.generation_provenance],
    ['Prompt path', asset.prompt_path],
  ];
  return fields
    .map(([label, value]) => ({ label, value: toText(value) }))
    .filter(({ value }) => value);
}

export function toEvidenceItem(item, index, { assetIndex, publicBasePath } = {}) {
  const asset = resolveAsset(item, assetIndex);
  const id = firstText(asset.evidence_id, asset.asset_id, asset.id, `asset-${index + 1}`);
  const localPath = firstText(asset.local_path, asset.file_path, asset.path, asset.src);
  const sourceUrl = firstText(asset.source_url, asset.url);
  const title = firstText(asset.title, asset.product_name, asset.subject, asset.role, id);
  const description = firstText(asset.analysis_notes, asset.communication_job, asset.description);
  const src = toPublicAssetUrl(localPath, publicBasePath);

  const meta = assetMeta(asset);
  return {
    id,
    title,
    ...(description ? { description } : {}),
    ...(src ? { src, alt: firstText(asset.alt, `${title} — ${id}`) } : {}),
    ...(sourceUrl ? { sourceUrl } : {}),
    role: firstText(asset.role, asset.product_image_job, asset.product_representation_job),
    provenance: {
      sourceId: id,
      credit: toText(asset.credit),
      filePath: localPath,
      capturedAt: firstText(asset.captured_at, asset.generated_at),
      ...(sourceUrl ? { url: sourceUrl } : {}),
    },
    ...(meta.length ? { meta } : {}),
  };
}

export function evidenceGridBlock(title, items, options = {}) {
  const normalized = asArray(items)
    .map((item, index) => toEvidenceItem(item, index, options))
    .filter((item) => item.title || item.image);
  if (!normalized.length) return null;
  return {
    type: 'evidence-grid',
    ...(toText(title) ? { title: toText(title) } : {}),
    items: normalized,
  };
}

export function typographySpecimensBlock(title, records) {
  const specimens = asArray(records)
    .filter(isRecord)
    .map((record, index) => ({
      id: slugify(firstText(
        pickValue(record, ['Information role', 'Role', 'Source role']),
        pickValue(record, ['Family', 'Observed value']),
        `specimen-${index + 1}`,
      )),
      label: firstText(pickValue(record, ['Information role', 'Role', 'Source role']), `Specimen ${index + 1}`),
      fontFamily: firstText(pickValue(record, ['Family', 'Font family', 'Observed value'])),
      fontSize: firstText(pickValue(record, ['Size', 'Font size'])),
      fontWeight: firstText(pickValue(record, ['Weight', 'Font weight'])),
      lineHeight: firstText(pickValue(record, ['Line height', 'Leading'])),
      script: firstText(pickValue(record, ['Script', 'Locale', 'Language'])),
      description: firstText(pickValue(record, ['Evidence and scope', 'Evidence and limits', 'Channel / market / date'])),
    }))
    .filter((specimen) => specimen.fontFamily || specimen.fontSize || specimen.fontWeight || specimen.script);

  if (!specimens.length) return null;
  return {
    type: 'typography-specimens',
    ...(toText(title) ? { title: toText(title) } : {}),
    items: specimens,
  };
}

export function codeBlock(title, value, language = 'json') {
  if (!hasContent(value)) return null;
  const code = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  return {
    type: 'code',
    ...(toText(title) ? { title: toText(title) } : {}),
    language,
    code,
  };
}

export function recordToBlocks(record, options = {}) {
  const source = asRecord(record);
  const blocks = [];
  const primitiveRecord = Object.fromEntries(
    meaningfulEntries(source).filter(([, value]) => !Array.isArray(value) && !isRecord(value)),
  );
  const overview = keyValueTable(options.overviewTitle, primitiveRecord);
  if (overview) blocks.push(overview);

  meaningfulEntries(source).forEach(([key, value]) => {
    const title = titleize(key);
    if (Array.isArray(value)) {
      const block = value.some(isRecord)
        ? cardGridBlock(title, value, { idPrefix: slugify(key) })
        : listBlock(title, uniqueStrings(value));
      if (block) blocks.push(block);
      return;
    }
    if (isRecord(value)) {
      const nested = recordToBlocks(value, { overviewTitle: title });
      blocks.push(...nested);
    }
  });

  return blocks;
}
