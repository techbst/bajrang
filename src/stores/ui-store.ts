"use client";

import { create } from "zustand";

type UiState = {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  setSearchOpen: (isOpen: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen })
}));
