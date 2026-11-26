"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Globe2,
  Mail,
  Minus,
  Menu,
  Plus,
  Phone,
  ShoppingBag,
  Trash2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { MegaMenu } from "./mega-menu";
import { aboutLinks, brandGroups, getAssemblyMenuLinks, megaMenuConfig } from "./navigation-data";
import { useCatalogueCartStore } from "@/stores/catalogue-cart-store";
import { useCartStore } from "@/stores/cart-store";
import { CartActions } from "@/components/catalogue/cart-actions";
import { ProductTypeBadge } from "@/components/catalogue/assembly-detail";

const navigationItemClass =
  "flex min-h-10 cursor-pointer items-center gap-1.5 rounded-md px-3 text-sm font-semibold whitespace-nowrap text-foreground transition-colors hover:bg-slate-100 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary aria-expanded:bg-slate-100 aria-expanded:text-primary";
const headerIconButtonClass =
  "grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-primary";

export function Header({
  isAuthenticated = false
}: {
  isAuthenticated?: boolean;
}) {
  const isHome = usePathname() === "/";
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const menuRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updatePinned() {
      const topBar = topBarRef.current;
      if (topBar) setIsPinned(window.scrollY >= topBar.offsetHeight);
    }

    updatePinned();
    window.addEventListener("scroll", updatePinned, { passive: true });
    window.addEventListener("resize", updatePinned);
    return () => {
      window.removeEventListener("scroll", updatePinned);
      window.removeEventListener("resize", updatePinned);
    };
  }, []);

  useEffect(() => {
    function closeOnOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header
      ref={menuRef}
      data-store-header
      className="sticky top-[calc(-1*var(--store-top-bar-height))] z-40"
    >
      <Sheet
        open={isCartOpen}
        onOpenChange={(open) => (open ? openCart() : closeCart())}
      >
        <div className={`pb-(--store-header-padding) ${isPinned ? "" : "px-3 sm:px-5 lg:px-6"}`}>
          <div ref={topBarRef} className={`mx-auto flex h-(--store-top-bar-height) max-w-[1920px] items-center justify-between gap-2 px-2 sm:px-4 ${isHome ? "text-slate-100" : "text-slate-700"}`}>
            <p className="flex min-w-0 items-center gap-2 py-1 text-xs font-semibold">
              <Globe2
                aria-hidden="true"
                className={`size-3.5 shrink-0 ${isHome ? "text-blue-300" : "text-primary"}`}
              />
              Wholesale &amp; Export
              <span className="hidden opacity-80 sm:inline">
                · Genuine Parts
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-3 text-xs sm:gap-5">
              <a
                href="tel:+919718346347"
                aria-label="Call +91 971-8346-347"
                className="inline-flex min-h-7 items-center gap-1.5 hover:underline"
              >
                <Phone aria-hidden="true" className={`size-3.5 ${isHome ? "text-blue-300" : "text-primary"}`} />
                <span>+91 971-8346-347</span>
              </a>
              <a
                href="mailto:info@bajrangautoparts.com"
                aria-label="Email info@bajrangautoparts.com"
                className="inline-flex min-h-7 items-center gap-1.5 hover:underline"
              >
                <Mail aria-hidden="true" className={`size-3.5 ${isHome ? "text-blue-300" : "text-primary"}`} />
                <span className="hidden md:inline">
                  info@bajrangautoparts.com
                </span>
              </a>
            </div>
          </div>

          <div
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") setOpenMenu(null);
            }}
            className={`relative mx-auto flex h-(--store-nav-height) items-center justify-between gap-3 border-slate-200 bg-white py-2 shadow-md ${isPinned ? "w-full border-b px-6 sm:px-10 lg:px-12" : "max-w-[1920px] rounded-xl border px-3 sm:px-5 lg:px-7"}`}
          >
            <div className="flex min-w-0 flex-col items-start">
              <Link
                href="/"
                className="flex min-w-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0760BC]"
                aria-label="Bajrang home"
              >
                <Image
                  src="/img/common/logo.png"
                  alt="Bajrang Auto Parts"
                  width={1461}
                  height={221}
                  sizes="(min-width: 1536px) 320px, (min-width: 640px) 288px, 240px"
                  className="h-auto w-60 max-w-full sm:w-72 2xl:w-80"
                  priority
                />
              </Link>
            </div>
            <nav
              className="ml-auto hidden shrink-0 items-center gap-1 xl:flex"
              aria-label="Primary navigation"
            >
              <Link
                href="/"
                onMouseEnter={() => setOpenMenu(null)}
                onClick={() => setOpenMenu(null)}
                className={navigationItemClass}
              >
                Home
              </Link>
              <Link
                href="/about"
                onMouseEnter={() => setOpenMenu(null)}
                onClick={() => setOpenMenu(null)}
                className={navigationItemClass}
              >
                About Us
              </Link>
              {megaMenuConfig.map((item) => (
                <div
                  key={item.key}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setOpenMenu(item.key);
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setOpenMenu((current) => current === item.key ? null : current);
                    }
                  }}
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      const mouse = event.nativeEvent instanceof PointerEvent &&
                        event.nativeEvent.pointerType === "mouse";
                      setOpenMenu((current) =>
                        current === item.key && !mouse ? null : item.key
                      );
                    }}
                    aria-expanded={openMenu === item.key}
                    className={navigationItemClass}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-3.5 transition ${openMenu === item.key ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openMenu === item.key ? (
                      <MegaMenu
                        label={item.label}
                        href={item.href}
                        category={item.category}
                        description={item.description}
                        brands={brandGroups[item.key]}
                        onNavigate={() => setOpenMenu(null)}
                      />
                    ) : null}
                  </AnimatePresence>
                </div>
              ))}
              <Link
                href="/contact"
                onMouseEnter={() => setOpenMenu(null)}
                onClick={() => setOpenMenu(null)}
                className={buttonVariants({
                  className: "ml-2 h-10 rounded-full px-4 whitespace-nowrap"
                })}
              >
                Request a quote
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </nav>
            <div className="shrink-0 xl:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open navigation"
                    className={headerIconButtonClass}
                  >
                    <Menu aria-hidden="true" className="size-[18px]" />
                  </button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto p-0">
                  <div className="p-6">
                    <SheetHeader>
                      <SheetTitle className="text-left text-xl">
                        BAJRANG<span className="text-[#0760BC]">.</span>
                      </SheetTitle>
                      <SheetDescription className="text-left">
                        Genuine parts. Global supply.
                      </SheetDescription>
                    </SheetHeader>
                    <MobileNavigation />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        <SheetContent className="w-full max-w-md overflow-y-auto p-0 font-sans">
          <CartDrawerContents
            isAuthenticated={isAuthenticated}
            closeCart={closeCart}
          />
        </SheetContent>
      </Sheet>
    </header>
  );
}

function CartDrawerContents({ isAuthenticated, closeCart }: { isAuthenticated: boolean; closeCart: () => void }) {
  const items = useCatalogueCartStore((state) => state.items);
  const setQuantity = useCatalogueCartStore((state) => state.setQuantity);
  const removeItem = useCatalogueCartStore((state) => state.removeItem);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex h-full flex-col font-sans">
      <div className="border-b border-slate-200 px-5 py-5 pr-14 sm:px-6">
        <SheetHeader>
          <SheetTitle className="text-left text-xl font-bold tracking-tight text-slate-950">Cart <span className="text-primary">({items.length})</span></SheetTitle>
          <SheetDescription className="text-left text-sm text-slate-500">Your selected automotive parts and quantities.</SheetDescription>
        </SheetHeader>
      </div>
      {items.length === 0 ? (
        <div className="grid flex-1 content-center justify-items-center px-8 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-slate-100 text-slate-400"><ShoppingBag className="size-6" /></span>
          <p className="mt-4 font-bold text-slate-900">Your cart is empty</p>
          <p className="mt-1 max-w-xs text-sm leading-5 text-slate-500">Add parts from a vehicle assembly to build your enquiry list.</p>
        </div>
      ) : (
        <>
          <div className="flex-1 divide-y divide-slate-100 overflow-y-auto px-5 sm:px-6">
            {items.map((item) => <article key={item.id} className="py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold text-slate-900">{item.partNumber}</p>{item.source === "bom" ? <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-primary">Imported BOM</span> : <ProductTypeBadge productType={item.productType} />}</div><p className="mt-1 text-sm text-slate-700">{item.description}</p>{item.source !== "bom" && <p className="mt-1 truncate text-xs text-slate-500">{item.brand} {item.vehicle} · {item.assemblyCode}</p>}</div>
                <button type="button" aria-label={`Remove ${item.partNumber}`} onClick={() => removeItem(item.id)} className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"><Trash2 className="size-4" /></button>
              </div>
              <div className="mt-3 inline-flex h-9 items-center rounded-lg border border-slate-200"><button type="button" aria-label={`Decrease ${item.partNumber} quantity`} onClick={() => setQuantity(item.id, item.quantity - 1)} className="grid size-8 place-items-center text-slate-500 hover:text-primary"><Minus className="size-3.5" /></button><span className="min-w-8 text-center text-xs font-bold text-slate-800">{item.quantity}</span><button type="button" aria-label={`Increase ${item.partNumber} quantity`} onClick={() => setQuantity(item.id, item.quantity + 1)} className="grid size-8 place-items-center text-slate-500 hover:text-primary"><Plus className="size-3.5" /></button></div>
            </article>)}
          </div>
          <div className="border-t border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex justify-between text-sm text-slate-600"><span>{items.length} parts</span><strong className="text-slate-900">{totalQuantity} total qty</strong></div>
            <p className="mt-2 text-xs leading-5 text-slate-500">Pricing and availability will be confirmed with your enquiry.</p>
            <CartActions isAuthenticated={isAuthenticated} onNavigate={closeCart} />
            <Link href="/cart" onClick={closeCart} className="mt-3 block text-center text-xs font-semibold text-primary hover:underline">Open full cart</Link>
          </div>
        </>
      )}
    </div>
  );
}

function MobileNavigation() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <nav className="mt-8 space-y-1" aria-label="Mobile navigation">
      <SheetClose asChild>
        <Link
          href="/"
          className="block border-b border-slate-100 py-3 font-semibold"
        >
          Home
        </Link>
      </SheetClose>
      <div className="border-b border-slate-100 pb-2">
        <div className="flex items-center justify-between">
          <SheetClose asChild>
            <Link href="/about" className="flex-1 py-3 font-semibold">
              About Us
            </Link>
          </SheetClose>
          <button
            type="button"
            aria-label="About Us pages"
            aria-expanded={expanded === "about"}
            onClick={() => setExpanded(expanded === "about" ? null : "about")}
            className="grid size-10 place-items-center rounded hover:bg-slate-100"
          >
            <ChevronDown
              aria-hidden="true"
              className={`size-4 transition ${expanded === "about" ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        {expanded === "about" ? (
          <div className="border-l-2 border-[#0760BC] pl-4">
            {aboutLinks.map((item) => (
              <SheetClose key={item.href} asChild>
                <Link
                  href={item.href}
                  className="block py-2 text-sm text-slate-500"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </div>
        ) : null}
      </div>
      {megaMenuConfig.map((item) => (
        <div key={item.key} className="border-b border-slate-100 pb-2">
          <button
            type="button"
            onClick={() => setExpanded(expanded === item.key ? null : item.key)}
            aria-expanded={expanded === item.key}
            className="flex w-full items-center justify-between py-3 text-left font-semibold"
          >
            {item.label}
            <ChevronDown
              className={`size-4 transition ${expanded === item.key ? "rotate-180" : ""}`}
            />
          </button>
          {expanded === item.key ? (
            <div className="border-l-2 border-[#0760BC] pl-4">
              <SheetClose asChild>
                <Link
                  href={item.href}
                  className="text-primary block py-2 text-sm font-semibold"
                >
                  Explore catalog
                </Link>
              </SheetClose>
              <div className="my-2 border-y border-border py-2">
                <p className="py-1 text-sm font-semibold">Assembly groups</p>
                {getAssemblyMenuLinks(item.category).map((assembly) => (
                  <SheetClose key={assembly.code} asChild>
                    <Link href={assembly.href} className="block py-2 text-xs font-medium text-foreground">
                      <span className="mr-2 text-primary">{assembly.code}</span>
                      {assembly.name}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href={`/catalogue/assemblies?category=${item.category}`} className="block py-2 text-sm font-semibold text-primary">View all</Link>
                </SheetClose>
              </div>
              {brandGroups[item.key].map((brand) => (
                <SheetClose key={brand.slug} asChild>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="block py-2 text-sm text-slate-500"
                  >
                    {brand.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          ) : null}
        </div>
      ))}
      <SheetClose asChild>
        <Link href="/contact" className="block py-4 font-semibold">
          Contact Us
        </Link>
      </SheetClose>
      <a
        href="tel:9718346347"
        className="mt-5 flex items-center gap-3 border border-[#0760BC]/20 bg-[#0760BC]/5 p-4"
      >
        <Phone className="size-5 text-[#0760BC]" />
        <span>
          <span className="block text-xs text-slate-500">
            Need Spare Parts? Call Us
          </span>
          <strong>971-8346-347</strong>
        </span>
      </a>
    </nav>
  );
}
