import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col justify-between">
      <SiteHeader />
      <div className="mx-auto max-w-5xl">{children}</div>
      <SiteFooter />
    </main>
  );
}
