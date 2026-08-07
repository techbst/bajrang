export const protectedRoutes = ["/account", "/checkout"] as const;
export const authRoutes = ["/login", "/register", "/forgot-password"] as const;

export function isProtectedPath(pathname: string) {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}
