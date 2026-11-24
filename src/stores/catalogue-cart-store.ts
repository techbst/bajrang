"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CatalogueCartItem = {
  id: string;
  partNumber: string;
  description: string;
  productType: string;
  brand: string;
  vehicle: string;
  assemblyCode: string;
  assemblyName: string;
  quantity: number;
};

type CatalogueCartState = {
  items: CatalogueCartItem[];
  addItem: (item: Omit<CatalogueCartItem, "id" | "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

export const useCatalogueCartStore = create<CatalogueCartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity = 1) => set((state) => {
        const id = `${item.partNumber}:${item.vehicle}`;
        const existing = state.items.find((cartItem) => cartItem.id === id);
        return {
          items: existing
            ? state.items.map((cartItem) => cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem)
            : [...state.items, { ...item, id, quantity }]
        };
      }),
      setQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
      })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clear: () => set({ items: [] })
    }),
    {
      name: "bajrang-catalogue-cart",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
