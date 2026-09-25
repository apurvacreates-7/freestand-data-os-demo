# FreeStand Data OS · demo hub

Click-through sales demo for Mondelez India and GroupM. Plain HTML, CSS and vanilla JS. GitHub Pages ready.

## Run

Open `index.html` over any static server (fonts and images are local):

```
python3 -m http.server 8790
```

Then visit `http://localhost:8790/`. On GitHub Pages: Settings → Pages → Deploy from branch `main`, folder `/ (root)`.

## Presenting

- `→` / `←` or the Next / Previous buttons step through each tab. `Home` and `End` jump.
- The bottom pills jump to a section of the current tab.
- `D` toggles the "Under the hood" drawer on any screen. The presenter path never needs it.
- Progress is remembered per browser (localStorage). `Home` on tab 1 restarts.

## Structure

| File | What |
|---|---|
| `index.html`, `shell.css`, `shell.js` | Hub shell: numbered sidebar, framed 1280×832 stage scaled to fit, bottom bar |
| `registry.js` | Tabs, step captions and section pills (`HUB_DEMOS`) |
| `stage.html`, `stage.css`, `stage.js` | Platform chrome, router, drawer |
| `stage-common.js` | Shared blocks: cards, tables, bars, rings, phone frame, WhatsApp bubbles |
| `stage-dataos.js` | Tab 1 · Data OS · 12 screens with drawers |
| `stage-library.js` | Tab 2 · Value exchange library · 10 mechanics |
| `stage-scale.js` | Tab 3 · Built for your scale · capacity and comparison |
| `assets/` | FreeStand logo, Poppins and Inter, icon set, reference visuals |
| `qa/` | Playwright scripts used for screenshots and the timed run |
| `CLAIMS.md` | Every integration and capacity claim shown, for engineering sign-off |

All data on screen is synthetic and marked "illustrative". PII is masked.

Design tokens and shell behaviour match the existing FreeStand demo hubs: `--brand #052762`, `--brand2 #0A49B7`, `--accent #FA6600`, `--bg #EDF1F8`, Poppins for the shell, Inter for the platform UI.
