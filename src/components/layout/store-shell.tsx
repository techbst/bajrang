import { Footer } from "./footer";
import { Header } from "@/components/navigation/header";

export function StoreShell({ children, isAuthenticated }: { children: React.ReactNode; isAuthenticated: boolean }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header isAuthenticated={isAuthenticated} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
