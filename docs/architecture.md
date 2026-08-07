# Architecture

This project starts as a foundation rather than a finished storefront. The goal is to keep public eCommerce content server-rendered, API communication centralized, and client JavaScript limited to interactions that truly need it.

## Decisions

- App Router route groups separate storefront routes from global app files.
- Server Components are the default for pages and layouts.
- Client Components are isolated to providers, forms, dialogs, sheets, stores, and query hooks.
- `src/lib/api` owns HTTP behavior, errors, timeouts, auth readiness, and domain endpoints.
- `src/features` re-exports feature-specific contracts so business logic can grow near the feature.
- `src/types` defines backend-agnostic eCommerce contracts.
- `src/stores` is limited to safe UI state and does not replace server state.
- `src/lib/seo` keeps metadata and structured data reusable.
- `middleware.ts` prepares protected routes without expensive API calls.

## Caching

Public catalog data should be cached or revalidated through Next.js server fetching when connected. Cart, account, checkout, and admin data should remain dynamic and user-specific.

## Authentication

The project assumes future session tokens live in HttpOnly cookies. Middleware only checks for a lightweight session signal and redirects protected routes. Real authorization should happen server-side or in the backend API.

## Payments

Payment success must be verified server-side. Browser callbacks from Razorpay, Stripe, PayPal, or any other provider should never be treated as authoritative.

## Internationalization

Strings are currently simple placeholders. Future i18n can be added through locale route segments or request-aware dictionaries without changing the API architecture.
