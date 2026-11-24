"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Building2, Eye, EyeOff, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AccountForm({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(isRegister
      ? "Your demo registration is ready. Account creation will be connected to the business account service."
      : "This demo sign-in form is ready to connect to the account service.");
  }

  return (
    <main className="bg-slate-50 py-10 sm:py-14 lg:py-16">
      <div className="container grid max-w-[1200px] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.78fr)] lg:items-stretch">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9 lg:p-11">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Bajrang Auto Parts · Trade Account</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{isRegister ? "Create your account" : "Welcome back"}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">{isRegister ? "Register your business to manage parts enquiries and orders." : "Sign in to access your parts enquiries, orders and account details."}</p>
          </div>

          <form className="grid gap-5" onSubmit={handleSubmit}>
            {isRegister ? <>
              <Field id="company" label="Company name" placeholder="Your business name" autoComplete="organization" />
              <Field id="contact-name" label="Contact person" placeholder="Full name" autoComplete="name" />
            </> : null}
            <Field id="email" label={isRegister ? "Business email" : "Email address"} type="email" placeholder="name@company.com" autoComplete="email" />
            {isRegister ? <Field id="phone" label="Phone number" type="tel" placeholder="+91 00000 00000" autoComplete="tel" /> : null}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder={isRegister ? "Create a password" : "Enter your password"} autoComplete={isRegister ? "new-password" : "current-password"} minLength={8} required className="h-11 rounded-lg pr-12" />
                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-0 grid h-11 w-11 place-items-center rounded-r-lg text-slate-400 transition-colors hover:text-primary"><span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
              </div>
            </div>
            {isRegister ? <div className="grid gap-2">
              <Label htmlFor="gst">GST / Tax ID <span className="font-normal text-slate-400">(optional)</span></Label>
              <Input id="gst" name="gst" placeholder="Enter your business tax ID" className="h-11 rounded-lg" />
            </div> : <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" name="remember" className="size-4 rounded border-slate-300 accent-[#0760BC]" /> Remember me</label>
              <Link href="/forgot-password" className="font-semibold text-primary transition-colors hover:text-blue-800">Forgot password?</Link>
            </div>}
            {notice ? <p role="status" className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm leading-5 text-blue-900">{notice}</p> : null}
            <Button type="submit" className="w-full rounded-lg text-sm sm:w-fit">{isRegister ? "Create trade account" : "Sign in"}<ArrowRight className="size-4" /></Button>
          </form>

          <p className="mt-7 border-t border-slate-100 pt-6 text-sm text-slate-600">
            {isRegister ? "Already have an account?" : "New to Bajrang Auto Parts?"}{" "}
            <Link href={isRegister ? "/login" : "/register"} className="font-bold text-primary transition-colors hover:text-blue-800">{isRegister ? "Sign in" : "Create a trade account"}</Link>
          </p>
          <p className="mt-5 text-xs leading-5 text-slate-400">Demo account UI · account actions will connect to the account API.</p>
        </section>

        <aside className="relative overflow-hidden rounded-2xl bg-[#101d2d] p-7 text-white sm:p-9 lg:p-11">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative -mx-7 -mt-7 mb-7 h-48 overflow-hidden sm:-mx-9 sm:-mt-9 sm:h-56 lg:-mx-11 lg:-mt-11 lg:h-64">
            <Image src="/img/home/form_sbu.webp" alt="Bajrang Auto Parts trade support team" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101d2d]/90 via-[#101d2d]/15 to-transparent" />
            <p className="absolute inset-x-5 bottom-4 text-xs font-bold uppercase tracking-[0.16em] text-white sm:inset-x-7">Auto parts sourcing for trade</p>
          </div>
          <div className="relative">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white/10 text-blue-200"><Building2 className="size-6" /></span>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">For parts businesses</p>
            <h2 className="mt-3 max-w-sm text-3xl font-bold leading-tight tracking-tight">A reliable supply partner for your business.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">Keep your sourcing organized with trade-focused support for automotive, motorcycle, tractor and commercial vehicle parts.</p>
            <div className="mt-8 space-y-4 border-t border-white/15 pt-6">
              <Benefit icon={<Truck />} text="Global sourcing and export support" />
              <Benefit icon={<ShieldCheck />} text="Parts availability and quote assistance" />
              <Benefit icon={<Building2 />} text="One account for your business enquiries" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Field({ id, label, type = "text", placeholder, autoComplete }: { id: string; label: string; type?: string; placeholder: string; autoComplete?: string }) {
  return <div className="grid gap-2"><Label htmlFor={id}>{label}</Label><Input id={id} name={id} type={type} placeholder={placeholder} autoComplete={autoComplete} required className="h-11 rounded-lg" /></div>;
}

function Benefit({ icon, text }: { icon: ReactNode; text: string }) {
  return <div className="flex items-center gap-3 text-sm font-medium text-slate-200"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-blue-200 [&>svg]:size-4">{icon}</span>{text}</div>;
}
