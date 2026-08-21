---
name: port-claude-skill-to-codex
description: Port or synchronize a project-local Claude skill from `.claude/skills` into a Codex-native `.agents/skills` package while preserving its intent, safety gates, and useful resources and translating invocation metadata, tool assumptions, paths, and project integration. Use when asked to make a Claude skill available to Codex, migrate or sync a Claude skill, create a Codex counterpart, or audit a Claude/Codex skill pair. Do not use for ordinary skill authoring without a Claude source.
---

# Port Claude Skill to Codex

Create a Codex-native counterpart of an existing Claude skill. Treat the Claude package as a behavioral source, not as text to copy mechanically.

## Boundary

- Default to the current repository: source under `.claude/skills/<name>` and target under `.agents/skills/<name>`.
- Preserve the Claude source unless the user explicitly requests source changes or removal.
- Do not write to global skill directories when the request is project-local.
- Do not invent MCP tools, subagents, permissions, hooks, or commands that the target environment does not provide.
- Preserve approval gates, destructive-action boundaries, privacy constraints, and browser restrictions exactly or more safely.
- Do not commit, push, deploy, install globally, or change account state unless the user separately authorizes it.

## Choose the mode

- **Create**: No Codex counterpart exists. Build one project-local target package.
- **Sync**: A counterpart exists. Update only behavior affected by the Claude source or current Codex conventions; preserve valid Codex-only adaptations.
- **Audit**: Compare a pair and report drift, unsupported assumptions, broken references, or missing integration. Do not edit unless requested.

Infer the mode from the request. If several Claude sources are plausible and choosing one would change the output, ask for the source skill name. Otherwise proceed.

## Read before working

1. Read repository instructions and discover the actual Claude and Codex skill roots.
2. Read the source `SKILL.md` completely. Read every directly linked instruction or reference required by its normal workflow; inspect scripts and assets by purpose rather than loading binary or irrelevant content.
3. Inspect the existing target package, if any, plus callers and project routing documents that refer to either skill.
4. Read [references/codex-porting-contract.md](references/codex-porting-contract.md) before writing the target.
5. Use the bundled `$skill-creator` workflow and validator when available. Its current Codex conventions override generic formatting habits in this skill.

## Port the skill

### 1. Lock identity and scope

- Keep the source name by default so the Claude and Codex variants are easy to pair. Rename only for a collision, a user request, or a materially different capability.
- Identify the source capability, positive triggers, exclusions, required inputs, outputs, safety invariants, resources, scripts, integrations, and approval boundaries.
- Separate domain behavior from Claude runtime coupling before editing anything.

### 2. Design the Codex package

- For a new target, initialize it with the bundled `skill-creator` initializer and request only the resource directories the port actually needs.
- Keep `SKILL.md` concise: shared purpose, boundaries, routing, and the non-obvious workflow belong there. Move substantial conditional detail into focused `references/` files.
- Reuse portable scripts and assets only when they remain necessary. Test copied or adapted scripts.
- Do not add a README, changelog, placeholder directory, duplicated manual, or migration diary to the target package.

### 3. Translate runtime-specific behavior

- Write Codex frontmatter with a lowercase hyphenated `name` and a discriminating `description` that states what the skill does and when it applies.
- Convert Claude slash invocation such as `/skill-name` to Codex `$skill-name` examples.
- Translate Claude-only frontmatter and tool wording according to the porting contract. Prefer required outcomes over hard-coded tool names unless a concrete tool is essential.
- Add `agents/openai.yaml` with consistent display metadata and a short default prompt that explicitly invokes `$skill-name`. Keep implicit invocation enabled unless the Claude source intentionally requires explicit-only use.
- Resolve every relative link from the target package. Avoid user-specific absolute paths and stale links back to the Claude package unless the file is intentionally maintained as a shared repository source.
- Preserve user choices and operational gates. Runtime translation does not grant new authority.

### 4. Integrate with the repository

- Update existing skill indexes or routing docs only where the new Codex counterpart changes what the project exposes.
- If the repository generates Storybook rule or skill relationships, edit the generator source when semantic mappings change, run the documented generator once, and include its generated output.
- Keep Claude and Codex entries visibly distinct when both appear in the same relationship graph.
- Do not modify unrelated skills merely to make the new package look uniform.

## Validate

Before finishing:

1. Run the bundled `skill-creator` `quick_validate.py` against the target.
2. Confirm every referenced file exists and every script or asset path resolves from the target package.
3. Check that no unsupported Claude-only invocation field, nonexistent tool, fake subagent, global path, or unfinished scaffold placeholder remains.
4. Verify one positive trigger and one nearby negative trigger from the description. For Sync mode, confirm intended Codex-only behavior was not overwritten.
5. Run the repository's skill/rule generator and relevant static checks when present. Do not launch browser automation or a Storybook build unless explicitly requested.
6. Review the final diff and keep it limited to the target package and required project integration files.

Report the target path, translated behaviors, intentionally shared dependencies, validation results, and any unresolved runtime gap. State explicitly that the Claude source was preserved.
