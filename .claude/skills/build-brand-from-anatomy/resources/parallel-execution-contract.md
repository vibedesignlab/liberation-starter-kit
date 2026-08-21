# Single-brand parallel execution contract

Use this contract only for a full routed pipeline. Standalone stage skills keep their normal execution behavior.

## Invariants

- Parallelize work inside the current accepted stage; never work ahead across a user-review gate.
- The root coordinator is the only writer for canonical JSON, Markdown, HTML, review, registry, handoff, and pipeline-state files.
- Workers own bounded shards or unique asset paths. They never edit the same file or another worker's output.
- Give workers the package path, one task, allowed output paths, required contracts, and acceptance conditions. Prefer `fork_turns: "none"`; do not fork the full conversation when package files contain the needed context.
- Reuse an existing worker for a related later-stage task when available. Do not preserve a worker merely to occupy a slot.
- When two or more independent jobs exist and worker slots are available, parallel execution is required. Use serial execution only when the runtime has no worker slots, the work has a true dependency, or parallel tool calls are unavailable. Record the stage-specific reason in `pipeline-state.json.execution.serial_fallback_reason`.

## Ownership and merge

Workers write under `<stage>/.work/<job-id>/` or a unique asset folder assigned by the coordinator. A worker returns:

- a structured shard rather than a second final report;
- source or reference lineage;
- unresolved gaps;
- the exact files it created.

The coordinator waits at the named barrier, resolves conflicts, writes the canonical model once, then runs deterministic renderers and validators. Do not merge prose by concatenation.

Track material jobs with:

```bash
python3 scripts/update_job.py <pipeline-directory-or-state> \
  --stage stage_1 --job visual_corpus --parallel-group stage1_research \
  --status running --owner visual-worker
```

Mark jobs `completed`, `failed`, or `skipped` with an output path or concise note. Job tracking is operational metadata, not a new report artifact.

The router will not accept a stage in `parallel_single_brand` mode until every recorded job for that stage is `completed` or `skipped`. It also rejects a stage that has neither a job record nor a stage-specific serial fallback reason. For a real serial fallback, record both the reason and a skipped operational job:

```bash
python3 scripts/update_job.py <pipeline-directory-or-state> \
  --stage stage_2 --job serial_fallback --status skipped \
  --note "worker slots unavailable" \
  --serial-fallback-reason "worker slots unavailable"
```

## Stage 1 waves

After scope lock, run three non-overlapping research lanes when slots allow:

1. strategy, authorship, verbal, and identity evidence;
2. key visual, UI/content, photography, font, color, and direct visual corpus;
3. physical/digital/hybrid product-native language, behavior, state, and feedback.

Barrier: merge and deduplicate evidence IDs, URLs, and local assets. After the barrier, the coordinator owns the final anatomy. Grammar/global-system drafting and contact-sheet/hash mechanics may run in parallel, but final claims and boundaries remain coordinator decisions.

## Stage 2 waves

Finish sequential intake and write one compact direction lock first: target, audience, lineup, source distance, shared product invariants, accent behavior, visual priority, and landing goal.

After that lock, verbal/narrative, product/lineup, and visual/token drafts may run in parallel as shards. The coordinator resolves them into one anatomy before image generation.

After the canonical model and report shell exist, compile one representative-product hero prompt and at least two brand-mood prompts concurrently by default. Claude never calls an image model. Serialize prompt work only when a brand-mood direction requires a locked product geometry or another completed prompt as a direct dependency. Register each finished prompt as `external_pending`; externally generated bitmaps are a later handoff.

## Stage 3 waves

Before fan-out, lock a shot plan containing each product, product USP, communication job, invariants, allowed variation, asset ID, and landing section.

Then run landing copy/section mapping and product-render generation concurrently. Split a 3–5 product lineup across at most two image workers so each owns unique prompts and assets. While images run, the coordinator prepares the model and report shell. Register assets and render the report only after every required image job reaches the barrier.

## Do not parallelize

- sequential user questions;
- source, direction, or shot-plan locks;
- user checkpoints and stage transitions;
- final brand-coherence decisions;
- canonical-model writes;
- fast scaffolding, digest, routing, or validator commands.

## Stall handling

During long image work, check progress at useful boundaries without blocking other workers. If all required images exist but a worker reports assembly work without updating its owned files across two checks, interrupt it and let the coordinator finish the deterministic merge/render. Never restart completed research or image generation merely because final assembly stalled.
