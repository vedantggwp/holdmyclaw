# holdmyclaw (CLI)

Deploy OpenClaw from the terminal. Same provisioning pipeline as the web wizard (`@holdmyclaw/core`).

## Run (from repository root)

```bash
# Build core + CLI
npm run build:cli

# Interactive wizard (cloud or local)
node packages/cli/dist/index.js

# Help / version
node packages/cli/dist/index.js --help
node packages/cli/dist/index.js --version
```

When published to npm: `npx holdmyclaw`.

## What it does

- **Cloud (Hetzner / DigitalOcean):** Prompts for API key, region, LLM + channel, optional customization → generates SSH key (saved to `~/.holdmyclaw/keys/openclaw.pem`) → creates server via provider API → polls `/health` until ready → prints server IP, SSH, dashboard, guide.
- **Local (My Computer):** Prompts for LLM + channel, optional customization → writes `.env`, `docker-compose.yml`, `config/openclaw.json`, `workspace/SOUL.md` / `IDENTITY.md` into `./openclaw/` → prints next steps.

## Package layout

| Path | Purpose |
|------|---------|
| `src/index.ts` | Commander entry, cloud/local deploy flow, validation |
| `src/prompts.ts` | @inquirer/prompts — deploy target, provider, LLM, channel, customization |
| `src/load-templates.ts` | Resolve and load cloud-init + config templates (cwd or package-relative) |
| `templates/` | Cloud-init.sh + configs/*.json5 (shipped with package for `npx`) |
| `__tests__/cli.test.ts` | Smoke test: `--version`, `--help` |

## Roadmap

- **npm publish:** CLI will be published to npm when ready; run `npm publish` from `packages/cli`.
- **Live LLM validation:** CLI currently validates key format only; the web app uses `/api/validate` for live API checks.

Full project status: [docs/internal/setup-and-progress.md](../../docs/internal/setup-and-progress.md).
