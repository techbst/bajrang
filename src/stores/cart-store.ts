"use client";

import { create } from "zustand";

type CartUiState = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartStore = create<CartUiState>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false })
}));
