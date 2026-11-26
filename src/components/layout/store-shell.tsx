import { Footer } from "./footer";
import { Header } from "@/components/navigation/header";

export function StoreShell({ children, isAuthenticated }: { children: React.ReactNode; isAuthenticated: boolean }) {
  return (
    <div className="flex min-h-screen flex-col [--store-top-bar-height:2rem] [--store-nav-height:4.25rem] [--store-header-padding:0.75rem] [--store-header-height:calc(var(--store-top-bar-height)+var(--store-nav-height)+var(--store-header-padding))] sm:[--store-nav-height:5rem]">
      <Header isAuthenticated={isAuthenticated} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
