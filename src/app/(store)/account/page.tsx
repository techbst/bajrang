import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Package, UserRound } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { SectionEyebrow } from "@/components/common/section-eyebrow";

export default function AccountPage() {
  const links = [
    { title: "Profile details", description: "Update your contact information.", href: "/account/profile", icon: UserRound },
    { title: "Order history", description: "Review your orders and enquiries.", href: "/account/orders", icon: Package },
    { title: "Addresses", description: "Manage your business delivery addresses.", href: "/account/addresses", icon: MapPin }
  ];

  return (
    <>
      <PageHeader title="Your Account" description="Manage your Bajrang Auto Part trade account." />
      <section className="container grid gap-6 pb-12 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
        <div className="grid content-start gap-3">
          {links.map(({ title, description, href, icon: Icon }) => (
            <Link key={href} href={href} className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/5 text-primary"><Icon className="size-5" /></span>
              <span className="min-w-0 flex-1"><span className="block font-semibold text-slate-900">{title}</span><span className="mt-1 block text-sm text-slate-500">{description}</span></span>
              <ArrowUpRight className="size-4 shrink-0 text-slate-400 transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>
        <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-slate-900 sm:min-h-[380px]">
          <Image src="/img/home/form_sbu.webp" alt="Bajrang Auto Part team assisting a trade customer" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <SectionEyebrow className="text-blue-200">Trade support</SectionEyebrow>
            <h2 className="mt-2 max-w-md text-2xl font-semibold leading-tight sm:text-3xl">Parts sourcing support for your business.</h2>
            <p className="mt-3 text-sm text-white/80">Our team can help with availability, quotations and export requirements.</p>
          </div>
        </div>
      </section>
    </>
  );
}
