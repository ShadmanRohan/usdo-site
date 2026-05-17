# USDO Website

Uttaran Social Development Organization — marketing homepage (Vite + React).

## Development

```bash
npm install
npm run dev
```

## GitHub Pages

**Live URL:** https://shadmanrohan.github.io/usdo-site/

If the page is blank, set the Pages source once:

1. Open [Repository Settings → Pages](https://github.com/ShadmanRohan/usdo-site/settings/pages)
2. Under **Build and deployment**, choose **Deploy from a branch**
3. **Branch:** `main` · **Folder:** `/docs`  
   — or — **Branch:** `gh-pages` · **Folder:** `/ (root)`
4. Save and wait ~1 minute

Do **not** use `/ (root)` on `main` — that serves the dev `index.html` (blank page).

Pushes to `main` rebuild `docs/` and `gh-pages` automatically via GitHub Actions.
