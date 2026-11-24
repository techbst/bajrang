import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, Mail } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionEyebrow } from "@/components/common/section-eyebrow";

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <main className="grid min-h-[65vh] place-items-center bg-[#f6f9fc] px-4 py-14 sm:py-20">
      <section className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(16,36,74,0.1)]">
        <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-sky-300" />
        <Container className="py-10 sm:py-14">
          <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-primary"><Clock3 className="size-6" /></span>
          <SectionEyebrow className="mt-7">Bajrang Auto Parts</SectionEyebrow>
          <h1 className="mt-3 text-3xl leading-tight font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">We’re preparing this information for our business customers. Please contact our team if you need help with this topic in the meantime.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"><ArrowLeft className="size-4"/> Back to home</Link>
            <Link href="/contact" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800">Contact our team <ArrowRight className="size-4"/></Link>
          </div>
          <a href="mailto:exports@bajrangautoparts.in" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary"><Mail className="size-4"/> exports@bajrangautoparts.in</a>
        </Container>
      </section>
    </main>
  );
}
