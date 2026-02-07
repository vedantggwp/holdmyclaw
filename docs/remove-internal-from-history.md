# Removing internal files from Git history

These paths are now in `.gitignore` and should be removed from the repo and from **all past commits** so they never appear on GitHub:

- `.prodman/`
- `ProductPlan.md`
- `docs/internal/`

**Warning:** Rewriting history changes commit SHAs. Anyone else with a clone will need to re-clone or reset. Do this before pushing, or coordinate before force-pushing.

---

## Option A: Using `git filter-repo` (recommended)

1. **Install** (if needed):
   ```bash
   pip install git-filter-repo
   ```
   or: `brew install git-filter-repo`

2. **From the repo root**, remove the paths from entire history:
   ```bash
   git filter-repo --path .prodman --path ProductPlan.md --path docs/internal --invert-paths --force
   ```
   `--force` is required because filter-repo refuses to run on a repo that already has history (safety check).

3. **Re-add your remote** (filter-repo removes remotes):
   ```bash
   git remote add origin <your-github-repo-url>
   ```

4. **Push rewritten history** (overwrites GitHub):
   ```bash
   git push --force-with-lease origin main
   ```
   Use your actual branch name if it’s not `main`.

---

## Option B: Using built-in `git filter-branch`

If you prefer not to install `git filter-repo`:

```bash
git filter-branch --force --index-filter \
  'git rm -rf --cached --ignore-unmatch .prodman ProductPlan.md docs/internal 2>/dev/null || true' \
  --prune-empty --tag-name-filter cat -- --all
```

Then re-add remote if needed and force-push:

```bash
git push --force-with-lease origin main
```

---

## Afterward

- The files remain on your **local disk**; only the Git history and GitHub are cleaned.
- New clones and future commits will never contain those paths.
- If the repo was already pushed, run the chosen option once, then force-push. No need to “remove from GitHub” separately; the force-push replaces history.
