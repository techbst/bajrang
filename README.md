# Bajrang Commerce

A production-minded Next.js eCommerce foundation prepared for a large storefront, API integration, secure authentication, checkout, SEO, analytics, and future admin work.

## Tech Stack

- Next.js 16 App Router, React 19, TypeScript strict mode
- Tailwind CSS 4, shadcn-compatible UI primitives, Radix UI, Lucide React
- TanStack Query for server state, Zustand for small client-only UI state
- React Hook Form with Zod validation
- Framer Motion dependency ready for meaningful client interactions
- ESLint, Prettier, next/font, Metadata API, sitemap, robots, middleware

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill values as integrations are added.

- `NEXT_PUBLIC_API_URL`: public browser-safe API base URL
- `NEXT_PUBLIC_SITE_URL`: canonical site URL
- `SERVER_API_URL`: server-only API base URL
- `API_SECRET`: server-only private secret

Never expose payment secrets, admin tokens, database credentials, or refresh tokens to client code.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run format
npm run format:check
```

## Architecture

- `src/app`: App Router layouts, route placeholders, health API, metadata routes
- `src/components`: reusable UI, layout, navigation, common states, skeletons
- `src/features`: feature-owned API exports, hooks, schemas, types, utilities
- `src/lib/api`: replaceable typed API client and domain modules
- `src/lib/seo`: Metadata API and JSON-LD helpers
- `src/lib/security`: security utility foundations
- `src/stores`: Zustand stores for safe client-only UI state
- `src/types`: shared eCommerce and API contracts
- `src/config`: typed env and site configuration

## API Strategy

Components should not call `fetch` directly. Add backend-specific implementation details in `src/lib/api` and expose feature-safe hooks or server functions from `src/features`.

The current API layer is database-independent and can be connected to WooCommerce, Shopify, Laravel, Node.js, or a headless CMS without changing UI components.

## State Strategy

TanStack Query manages server state such as products, categories, cart, and orders. Zustand is reserved for UI state such as mobile menu, drawer, search overlay, and safe wishlist UI preferences. Sensitive tokens must not be persisted in localStorage.

## SEO Strategy

Public pages are server-first and ready for dynamic metadata. `robots.ts`, `sitemap.ts`, and JSON-LD utilities are included for products, breadcrumbs, organization, website search, offers, and ratings.

## Security Notes

- Auth is prepared around HttpOnly cookies through middleware route protection.
- API secrets are server-only.
- Zod schemas validate external input and future API payloads.
- Security headers are configured in `next.config.ts`.
- User-facing errors avoid stack traces and internal details.

## Deployment Notes

Set `NEXT_PUBLIC_SITE_URL` to the production origin. Configure remote image domains more narrowly before production once asset providers are known.

## Future Extensions

Add real pages and integrations in feature modules first, then connect them to route-level Server Components. Keep storefront routes separate from future `/admin` architecture.
