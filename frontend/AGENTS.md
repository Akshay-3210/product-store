<!-- BEGIN:nextjs-agent-rules -->
# Product Store Frontend

This frontend is a Next.js 16 app router project in `frontend/src/app`.

- Use `frontend/src/app` for routes and layouts.
- `frontend/src/pages/` is a local component folder, not the Next.js pages router.
- The project uses React 19, Tailwind CSS 4, DaisyUI, and `@/*` imports mapped to `frontend/src/*`.
- `Navbar.jsx` and other shared UI live under `frontend/src/components/`.

Do not assume old Next.js route or data fetching APIs from older versions. Follow the app router conventions and only use `use client` in files that need browser-only hooks or state.
<!-- END:nextjs-agent-rules -->
