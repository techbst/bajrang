"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bike,
  CarFront,
  ChevronDown,
  CircleUserRound,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Tractor
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
import { SearchBar } from "./search-bar";
import { MegaMenu } from "./mega-menu";
import { aboutLinks, brandGroups, megaMenuConfig } from "./navigation-data";
import { SocialIcons } from "@/components/common/socialmedia";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
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
      onMouseLeave={() => {
        setOpenMenu(null);
        setIsAccountOpen(false);
      }}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl"
    >
      <div className="bg-secondary-foreground text-white">
        <Container className="flex h-8 items-center justify-between text-xs font-regular py-1 tracking-wide">
          <div className="flex items-center gap-6">
            <a
              href="tel:9718346347"
              className="flex items-center gap-2 hover:text-white/80"
            >
              <Phone className="size-3.5" />
              Need Spare Parts : +91 971-8346-347
            </a>
            <span className="h-4 w-[1px] bg-white/20" />
            <a
              href="mailto:info@bajrangautoparts.com"
              className="flex items-center gap-2 hover:text-white/80"
            >
              <Mail className="size-3.5" />
              info@bajrangautoparts.com
            </a>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/">Home</Link>
            <Link href="/about/who-we-are">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <span className="h-4 w-[1px] bg-white/20" />
            
            
              <SocialIcons
                wrapperClassName="gap-1"
                itemClassName="size-6 text-white hover:text-[#0760BC]"
                iconClassName="size-3.4"
              />
            
          </div>
        </Container>
      </div>

      <Container className="grid min-h-[76px] grid-cols-[1fr_auto] items-center gap-2 py-3 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="flex w-fit shrink-0 items-center"
          aria-label="Bajrang home"
        >
          <Image
            src="/img/common/logo.png"
            alt="Bajrang Auto Parts"
            width={320}
            height={48}
            className="h-auto max-[1280px]:w-[280px]  max-[1170px]:w-[230px]"
            priority
          />
        </Link>
        <nav
          className="hidden items-center justify-center gap-6 lg:flex"
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
                className="flex items-center gap-1 text-[14px] max-[1170px]:text-[13px] font-semibold whitespace-nowrap text-secondary-foreground transition hover:text-primary focus-visible:ring-2 focus-visible:ring-[#0760BC] focus-visible:outline-none cursor-pointer"
              >
                {item.label}
                <ChevronDown
                  className={`size-3.5 transition ${openMenu === item.key ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          ))}
        </nav>
        <div className="hidden items-center justify-end gap-2 lg:flex">
          <SearchSheet open={isSearchOpen} onOpenChange={setIsSearchOpen} />
          <AccountMenu open={isAccountOpen} onOpenChange={setIsAccountOpen} />
          <CartButton />
        </div>
        <div className="flex items-center justify-end gap-2 lg:hidden">
          <SearchSheet open={isSearchOpen} onOpenChange={setIsSearchOpen} />
          <CartButton />
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation"
                className="grid size-10 place-items-center border border-slate-200 block lg:hidden"
              >
                <Menu className="size-5" />
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
                <div className="mt-6">
                  <SearchBar compact />
                </div>
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
          className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-700 transition hover:border-[#0760BC] hover:bg-[#0760BC] hover:text-white cursor-pointer"
        >
          <Search className="size-4" />
        </button>
      </SheetTrigger>
      <SearchDrawer />
    </Sheet>
  );
}

function CartButton() {
  return (
    <Link
      href="/cart"
      aria-label="Cart, 0 items"
      className="group relative flex gap-2 h-[40px] px-5 whitespace-nowrap place-items-center rounded-[10px] bg-[#0760BC] text-white transition hover:-translate-y-0.5 hover:bg-secondary-foreground hover:shadow-md active:translate-y-0"
    >
      <ShoppingCart className="size-4" /> Cart
      <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-secondary-foreground group-hover:bg-primary text-[10px] font-bold">
        0
      </span>
    </Link>
  );
}

function AccountMenu({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-700 transition hover:border-[#0760BC] hover:bg-[#0760BC] hover:text-white  cursor-pointer"
      >
        <CircleUserRound className="size-5" />
        <span className="sr-only">Account</span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-12 right-0 z-50 w-64 border border-slate-100 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.15)]"
            role="menu"
          >
            <Link
              href="/account"
              className="group flex items-center gap-3 p-3 hover:bg-[#0760BC]/10"
            >
               <span className="bg-slate-100 group-hover:bg-white grid size-10 place-items-center rounded-full">
                <CircleUserRound className="size-5 text-[#0760BC]" />
              </span>
              <span className="leading-normal">
                <span className="block text-sm font-semibold">My Account</span>
                <span className="text-xs text-slate-500">
                  Login, Profile and Addresses
                </span>
              </span>
            </Link>
            <Link
              href="/account/orders"
              className="group flex items-center gap-3 p-3 hover:bg-[#0760BC]/10"
            >
              <span className="bg-slate-100 group-hover:bg-white grid size-10 place-items-center rounded-full">
                <ShoppingCart className="size-5 text-[#0760BC]" />
              </span>
              <span>
                <span className="block text-sm font-semibold">My Orders</span>
                <span className="text-xs text-slate-500">
                  Track your purchases
                </span>
              </span>
            </Link>
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
                  href={`${item.href}/${brand.slug}`}
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
