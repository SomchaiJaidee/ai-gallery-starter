# AI Gallery Starter

> Fork → Customize → Deploy. A clean, production-ready starter for AI prompt galleries.
> **Stack:** Vite + React 19 + TypeScript + Tailwind CSS 4

![AI Gallery Starter](./public/favicon.svg)

---

## ⚡ Quick Start (No Code — Just Click)

### 1. Fork this repo

Click **"Fork"** at the top right of this page. The repo will be copied to your GitHub account.

### 2. Deploy on Hostinger

1. Sign up at [**Hostinger** (use code `AICEO` for discount)](https://hostinger.com/AICEO) — pick **Premium Web Hosting** (has Node.js)
2. Open hPanel → **Websites** → **Add Website** → **Node.js**
3. Click **Connect with GitHub** → authorize → pick your fork
4. Branch: `main` → click **Deploy**
5. Wait ~30 seconds → your site is **live** on a free `*.hstgr.app` URL 🎉

### 3. Customize with Claude Code (no terminal needed)

In VSCode + Claude Code extension, paste this in the chat:

```
อ่านไฟล์ design.md ในโฟลเดอร์นี้ แล้ว apply design ให้กับเว็บ
เก็บ data + functionality เดิม เปลี่ยนแค่ layout/สี/font
```

Push → Hostinger auto-rebuilds the same URL.

### 4. Custom domain (free, included in plan)

In hPanel → **Domains** → **Get a Free Domain** → claim → bind to your site.
SSL auto-provisions. No Cloudflare needed.

---

## 🛠 Local Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

Node 20.x or higher recommended.

---

## 📁 Structure

```
ai-gallery-starter/
├── public/
│   ├── prompts.json     ← 215 prompts (edit to change data)
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.tsx           ← Main gallery page
│   ├── main.tsx          ← Entry point
│   ├── components/
│   │   ├── PromptCard.tsx
│   │   ├── PromptModal.tsx
│   │   ├── SearchBar.tsx
│   │   └── CategoryFilter.tsx
│   ├── hooks/
│   │   └── usePrompts.ts
│   ├── types.ts
│   └── index.css         ← Tailwind imports
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🎨 What You Can Customize

| File | Edit to change… |
|---|---|
| `public/prompts.json` | The 215 prompts (or replace with your own) |
| `src/App.tsx` | Page layout, header, footer |
| `src/components/PromptCard.tsx` | Card design |
| `src/components/PromptModal.tsx` | Detail view |
| `index.html` | Page title, SEO, OG tags |
| `src/index.css` | Tailwind config + global styles |

---

## 🙏 Credits

Prompt data curated from [YouMind-OpenLab/awesome-gpt-image-2](https://github.com/YouMind-OpenLab/awesome-gpt-image-2) — MIT licensed.
Each prompt credits the original author.

---

## 📜 License

MIT — use, fork, modify, deploy freely.

---

## 🎬 Built for the Hostinger × Claude tutorial

This starter pairs with the YouTube tutorial showing zero-code deployment using Hostinger Node.js Hosting + Claude Code in VSCode.

- 📺 Channel: [@TimJanepat](https://youtube.com/@TimJanepat)
- 🌐 [aiceo.im](https://aiceo.im)

### 💚 Support this project

If this starter helped you, sign up via the affiliate link below — you get a discount, and it supports more free tutorials like this:

- 🚀 [**Hostinger Node.js Hosting** + coupon `AICEO`](https://hostinger.com/AICEO) — for this starter
- 🖥 [**Hostinger VPS** + coupon `aiceo10`](https://hostinger.com/aiceo10) — for advanced SaaS deployments (covered in Video 2)
