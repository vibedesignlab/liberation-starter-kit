# Claude-to-Codex porting contract

Use this contract to decide what to preserve, translate, share, or omit. The goal is behavioral equivalence in the current repository, not textual parity.

## Discovery and invocation

| Claude source | Codex target |
| --- | --- |
| `name` | Keep the same lowercase hyphenated name unless a real collision or scope change requires another name. |
| `description` | Rewrite as a concise capability plus activation condition and, when useful, a nearby exclusion. |
| `when_to_use` | Fold useful trigger information into `description` or the body; do not assume the field controls Codex discovery. |
| `user-invocable` | Do not copy. Codex UI behavior belongs in `agents/openai.yaml`. |
| `disable-model-invocation: true` | Use `policy.allow_implicit_invocation: false` only when explicit-only invocation is an intentional source invariant. |
| `/skill-name` examples | Use `$skill-name` in Codex prompts and UI metadata. |

Keep automatic invocation enabled by default. Sensitivity or destructive capability is not a reason to disable discovery; require authorization at the operation boundary instead.

## Instructions and runtime behavior

| Claude-specific pattern | Porting decision |
| --- | --- |
| `Read`, `Write`, `Edit`, or `Bash` named as generic steps | Express the required outcome and let Codex choose the available filesystem or command tool. Keep exact commands when they are part of a real validation or build contract. |
| Claude subagent or agent name | Map only when an equivalent Codex role exists and repository or user instructions authorize delegation. Otherwise preserve the responsibility locally or report the missing dependency. |
| Claude hook or permission setting | Keep it in repository configuration. Do not copy it into the Codex skill as if the skill could enforce it. |
| Claude browser or computer-use instruction | Preserve explicit prohibitions and approval gates. Never broaden access during the port. |
| Claude-specific response UI | Translate to the closest available Codex interaction only when it changes the deliverable; otherwise state the required question or checkpoint plainly. |
| Absolute home or installation path | Replace with a repository-relative path or a discovered skill/tool location. Never embed a different user's path. |

Preserve domain rules, input and output contracts, deterministic commands, validation thresholds, stop conditions, review gates, and safety invariants unless the user requests a behavioral change.

## Package contents

- Use `SKILL.md` for shared routing and essential decisions.
- Prefer `references/` for substantial instructions loaded only in relevant modes. A source `resources/` directory may be translated to `references/`; update all links consistently.
- Keep `scripts/` only for repeatable deterministic behavior. Port script runtimes and paths deliberately, then execute meaningful tests.
- Keep `assets/` only for files copied or adapted into outputs. Do not treat assets as hidden instructions.
- Add `agents/openai.yaml` for UI-facing metadata. Quote strings, keep `short_description` scannable, and make `default_prompt` a short sentence that names `$skill-name`.
- Do not create placeholders, duplicate references, compatibility aliases, or an extra README without a concrete consumer.

For each source dependency, choose exactly one disposition:

1. **Copy** when the target must remain self-contained and the file is target-relevant.
2. **Share** when the repository intentionally maintains one canonical file and both runtimes can resolve it reliably.
3. **Translate** when the content is useful but contains Claude-specific paths, tools, or invocation syntax.
4. **Omit** when it is unused, redundant, generated elsewhere, or unsupported without changing the core capability.

## Sync behavior

When a Codex counterpart already exists, treat it as an adapted implementation rather than a generated mirror.

- Compare behavior and dependencies before replacing text.
- Preserve valid Codex-only metadata, tool routing, references, scripts, and safety improvements.
- Bring over source changes only when they affect shared intent or contracts.
- Never delete a target-only resource until its callers and purpose are understood.
- Record genuine intentional divergence in the completion report instead of forcing parity.

## Project integration

Update only integration surfaces that exist and consume the new target:

- project skill inventory or routing documentation;
- generated rule/skill relationship data and its generator source;
- condition matrices when the new skill changes task routing;
- relevant validation commands.

Do not commit, push, deploy, install globally, edit account credentials, or remove the Claude source as an implied part of a port.

## Quality gate

A port is complete only when:

- the target name and folder agree;
- the description selects the intended requests without becoming a catchall;
- the source's material safety and approval boundaries remain intact;
- Claude-only invocation and unsupported tool assumptions are removed or intentionally documented;
- all target links resolve and necessary resources are present;
- `agents/openai.yaml` matches the skill and its invocation policy;
- copied or adapted scripts pass meaningful execution checks;
- the bundled Codex skill validator passes;
- repository relationship data is regenerated when applicable;
- the source Claude package is unchanged unless the user explicitly requested otherwise.
