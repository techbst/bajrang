"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bike,
  CarFront,
  ChevronDown,
  CircleUserRound,
  Globe2,
  LogIn,
  Mail,
  Minus,
  Menu,
  Plus,
  Phone,
  Search,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Tractor,
  UserRoundPlus
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/common/container";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { MegaMenu } from "./mega-menu";
import { aboutLinks, brandGroups, megaMenuConfig } from "./navigation-data";
import { useCatalogueCartStore } from "@/stores/catalogue-cart-store";
import { useCartStore } from "@/stores/cart-store";
import { CartActions } from "@/components/catalogue/cart-actions";
import { ProductTypeBadge } from "@/components/catalogue/assembly-detail";

const headerIconButtonClass =
  "site-action grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-primary";

export function Header({
  isAuthenticated = false
}: {
  isAuthenticated?: boolean;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const cartCount = useCatalogueCartStore((state) => state.items.length);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const menuRef = useRef<HTMLElement>(null);
  const activeMenu = megaMenuConfig.find((item) => item.key === openMenu);

  useEffect(() => {
    function closeOnOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setIsAccountOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setIsAccountOpen(false);
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
      onMouseLeave={() => setOpenMenu(null)}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl"
    >
      <Sheet
        open={isCartOpen}
        onOpenChange={(open) => (open ? openCart() : closeCart())}
      >
        <div className="bg-slate-950 text-slate-100">
          <Container className="flex min-h-7 items-center justify-between gap-2 max-[400px]:px-3">
            <p className="flex min-w-0 items-center gap-2 py-1 text-xs font-semibold">
              <Globe2
                aria-hidden="true"
                className="size-3.5 shrink-0 text-blue-300"
              />
              Wholesale &amp; Export
              <span className="hidden text-slate-300 sm:inline">
                · Genuine Parts
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-3 text-xs sm:gap-5">
              <a
                href="tel:+919718346347"
                aria-label="Call +91 971-8346-347"
                className="inline-flex min-h-7 items-center gap-1.5 hover:text-blue-200"
              >
                <Phone aria-hidden="true" className="size-3.5 text-blue-300" />
                <span>+91 971-8346-347</span>
              </a>
              <a
                href="mailto:info@bajrangautoparts.com"
                aria-label="Email info@bajrangautoparts.com"
                className="inline-flex min-h-7 items-center gap-1.5 hover:text-blue-200"
              >
                <Mail aria-hidden="true" className="size-3.5 text-blue-300" />
                <span className="hidden md:inline">
                  info@bajrangautoparts.com
                </span>
              </a>
              <div className="hidden items-center gap-4 border-l border-white/20 pl-4 xl:flex">
                <Link href="/about" className="hover:text-blue-200">
                  About Us
                </Link>
                <Link href="/contact" className="hover:text-blue-200">
                  Contact
                </Link>
              </div>
            </div>
          </Container>
        </div>

        <Container className="flex min-h-[60px] items-center justify-between gap-3 py-2 max-[400px]:px-3">
          <Link
            href="/"
            className="flex min-w-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0760BC]"
            aria-label="Bajrang home"
          >
            <Image
              src="/img/common/logo.png"
              alt="Bajrang Auto Parts"
              width={320}
              height={48}
              className="h-auto w-52 max-w-full 2xl:w-56"
              priority
            />
          </Link>
          <nav
            className="hidden shrink-0 items-center xl:flex"
            aria-label="Primary navigation"
          >
            {megaMenuConfig.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.key)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu(openMenu === item.key ? null : item.key)
                  }
                  aria-expanded={openMenu === item.key}
                  aria-haspopup="true"
                  className="group hover:text-primary focus-visible:outline-primary aria-expanded:text-primary flex min-h-10 cursor-pointer items-center gap-1.5 rounded-md px-3 text-sm font-semibold whitespace-nowrap text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 aria-expanded:bg-slate-100"
                >
                  {item.label}
                  <ChevronDown
                    className={`size-3.5 transition ${openMenu === item.key ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            ))}
          </nav>
          <div className="hidden shrink-0 items-center justify-end gap-2 xl:flex">
            <SearchSheet open={isSearchOpen} onOpenChange={setIsSearchOpen} />
            <AccountMenu
              open={isAccountOpen}
              onOpenChange={setIsAccountOpen}
              isAuthenticated={isAuthenticated}
            />
            <Link
              href="/contact"
              className={buttonVariants({
                className: "h-10 px-4 whitespace-nowrap"
              })}
            >
              Request a quote
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            {isAuthenticated || cartCount > 0 ? <CartButton compact count={cartCount} /> : null}
          </div>
          <div className="flex shrink-0 items-center justify-end gap-1.5 xl:hidden">
            <SearchSheet open={isSearchOpen} onOpenChange={setIsSearchOpen} />
            {isAuthenticated || cartCount > 0 ? <CartButton compact count={cartCount} /> : null}
            <AccountMenu
              open={isAccountOpen}
              onOpenChange={setIsAccountOpen}
              isAuthenticated={isAuthenticated}
            />
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
                    <SheetTitle className="text-left text-xl tracking-[0.12em]">
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
        </Container>
        <AnimatePresence>
          {activeMenu ? (
            <MegaMenu
              key={activeMenu.key}
              label={activeMenu.label}
              href={activeMenu.href}
              description={activeMenu.description}
              brands={brandGroups[activeMenu.key]}
            />
          ) : null}
        </AnimatePresence>
        <SheetContent className="w-full max-w-md overflow-y-auto p-0 font-sans">
          <CartDrawerContents isAuthenticated={isAuthenticated} closeCart={closeCart} />
        </SheetContent>
      </Sheet>
    </header>
  );
}

function SearchSheet({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Search parts"
          className={headerIconButtonClass}
        >
          <Search aria-hidden="true" className="size-[18px]" />
        </button>
      </SheetTrigger>
      <SearchDrawer />
    </Sheet>
  );
}

function CartButton({ compact = false, count }: { compact?: boolean; count: number }) {
  return (
    <SheetTrigger asChild>
      <button
        type="button"
        aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
        className={`group relative inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white font-sans text-xs font-semibold text-slate-700 shadow-sm transition-[transform,box-shadow,color,background-color,border-color] hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md ${compact ? "size-10 px-0" : "gap-3 px-4 xl:px-5"}`}
      >
        <ShoppingCart className="size-[18px] shrink-0" />
        {!compact ? <span className="tracking-wide">Cart</span> : null}
        <span className={`${compact ? "absolute -right-1.5 -top-1.5" : "ml-0.5"} grid min-w-5 place-items-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold leading-none text-white ring-2 ring-white`}>{count}</span>
      </button>
    </SheetTrigger>
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
                <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold text-slate-900">{item.partNumber}</p><ProductTypeBadge productType={item.productType} /></div><p className="mt-1 text-sm text-slate-700">{item.description}</p><p className="mt-1 truncate text-xs text-slate-500">{item.brand} {item.vehicle} · {item.assemblyCode}</p></div>
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

function AccountMenu({
  open,
  onOpenChange,
  isAuthenticated
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated: boolean;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={isAuthenticated ? "Open account menu" : "Login or register"}
        className={headerIconButtonClass}
      >
        <CircleUserRound aria-hidden="true" className="size-[18px]" />
        <span className="sr-only">{isAuthenticated ? "Account" : "Login or register"}</span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-12 right-0 z-50 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-[0_20px_55px_rgba(15,23,42,0.18)]"
            role="menu"
          >
            <div className="border-b border-slate-100 px-3 py-3">
              <p className="text-sm font-bold text-slate-900">{isAuthenticated ? "Your account" : "Welcome to Bajrang"}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{isAuthenticated ? "Manage orders and account details." : "Sign in to manage orders and your parts list."}</p>
            </div>
            {isAuthenticated ? (
              <div className="space-y-1 pt-2">
                <Link href="/account" role="menuitem" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#0760BC]/[0.06] hover:text-[#0760BC]">
                  <CircleUserRound className="size-4" /> My Account
                </Link>
                <Link href="/account/orders" role="menuitem" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#0760BC]/[0.06] hover:text-[#0760BC]">
                  <ShoppingCart className="size-4" /> My Orders
                </Link>
              </div>
            ) : (
              <div className="grid gap-2 p-2 pt-3">
                <Link href="/login" role="menuitem" className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0760BC] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#064d96]">
                  <LogIn className="size-4" /> Login
                </Link>
                <Link href="/register" role="menuitem" className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-[#0760BC] hover:bg-[#0760BC]/[0.04] hover:text-[#0760BC]">
                  <UserRoundPlus className="size-4" /> Create an account
                </Link>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SearchDrawer() {
  const brands = ["Hero", "Bajaj", "Maruti Suzuki"];
  const models = [
    { name: "Achiever", date: "Nov, 2014", icon: Bike },
    { name: "Swift Dzire", date: "Mar, 2017", icon: CarFront },
    { name: "Mahindra 575 DI", date: "Jan, 2018", icon: Tractor }
  ];

  return (
    <SheetContent className="w-full max-w-md overflow-y-auto p-0 sm:max-w-lg">
      <div className="border-b border-slate-100 p-6 pr-14">
        <SheetTitle className="text-xl font-bold text-slate-900">
          Search parts
        </SheetTitle>
        <SheetDescription className="mt-1 text-sm text-slate-500">
          Find parts by name, part number or vehicle.
        </SheetDescription>
      </div>
      <div className="p-6">
        <SearchBar compact />
        <div className="mt-7">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Brands</h3>
            <Link
              href="/products"
              className="text-xs font-semibold text-[#0760BC]"
            >
              Browse Products
            </Link>
          </div>
          <div className="mt-3 divide-y divide-slate-100 border-y border-slate-100">
            {brands.map((brand) => (
              <Link
                key={brand}
                href={`/search?q=${encodeURIComponent(brand)}`}
                className="flex items-center gap-3 py-3 transition hover:text-[#0760BC]"
              >
                <span className="grid size-10 place-items-center rounded-full bg-[#0760BC]/10 text-sm font-bold text-[#0760BC]">
                  {brand.charAt(0)}
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {brand}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-7">
          <h3 className="text-sm font-bold text-slate-900">Popular models</h3>
          <p className="mt-1 text-xs text-slate-500">Hero · Model</p>
          <div className="mt-3 space-y-2">
            {models.map(({ name, date, icon: ModelIcon }) => (
              <Link
                key={name}
                href={`/search?q=${encodeURIComponent(name)}`}
                className="flex items-center gap-3 border border-slate-100 p-3 transition hover:border-[#0760BC]/35 hover:bg-[#0760BC]/[0.03]"
              >
                <span className="grid size-12 place-items-center bg-slate-100 text-[#0760BC]">
                  <ModelIcon className="size-6" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-800">
                    {name}
                  </span>
                  <span className="text-xs text-slate-500">{date}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SheetContent>
  );
}

function MobileNavigation() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <nav className="mt-8 space-y-1" aria-label="Mobile navigation">
      <div className="border-b border-slate-100 pb-2">
        <button
          type="button"
          onClick={() => setExpanded(expanded === "about" ? null : "about")}
          className="flex w-full items-center justify-between py-3 text-left font-semibold"
        >
          About Us
          <ChevronDown
            className={`size-4 transition ${expanded === "about" ? "rotate-180" : ""}`}
          />
        </button>
        {expanded === "about" ? (
          <div className="border-l-2 border-[#0760BC] pl-4">
            {aboutLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm text-slate-500"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {megaMenuConfig.map((item) => (
        <div key={item.key} className="border-b border-slate-100 pb-2">
          <button
            type="button"
            onClick={() => setExpanded(expanded === item.key ? null : item.key)}
            className="flex w-full items-center justify-between py-3 text-left font-semibold"
          >
            {item.label}
            <ChevronDown
              className={`size-4 transition ${expanded === item.key ? "rotate-180" : ""}`}
            />
          </button>
          {expanded === item.key ? (
            <div className="border-l-2 border-[#0760BC] pl-4">
              {brandGroups[item.key].map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="block py-2 text-sm text-slate-500"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ))}
      <Link href="/contact" className="block py-4 font-semibold">
        Contact Us
      </Link>
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
