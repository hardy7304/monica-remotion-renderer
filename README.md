# monica-remotion-renderer

Monica + Remotion automatic video renderer.

Generates vertical 1080×1920 MP4 videos from structured props — suitable for
social media, marketing, and automated content pipelines.

## Quick Start

```bash
npm install
npm run dev          # Open Remotion Studio at http://localhost:3000
npm run render:demo  # Render a demo video to out/demo.mp4
```

## Render with Custom Title / Subtitle

```bash
npm run render -- --title "你的標題" --subtitle "你的副標題"
npm run render -- --title "Hello" --subtitle "World" --out out/custom.mp4
```

## File Structure

```
monica-remotion-renderer/
├─ package.json
├─ tsconfig.json
├─ remotion.config.ts
├─ src/
│  ├─ index.ts          # Remotion entry point
│  ├─ Root.tsx           # Composition registration
│  └─ MonicaDemo.tsx     # Video component
├─ scripts/
│  └─ render.mjs         # CLI render script
├─ out/                  # Rendered videos (git-ignored)
└─ README.md
```

## Roadmap

- [ ] Accept payload from Monica API Router via webhook
- [ ] Render job API (POST /api/render)
- [ ] Upload output to Cloudflare R2
- [ ] Return artifact URL to caller
- [ ] Support dynamic compositions from JSON templates