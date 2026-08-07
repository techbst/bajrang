"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  productIds: string[];
  toggleProduct: (productId: string) => void;
  hasProduct: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggleProduct: (productId) =>
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId]
        })),
      hasProduct: (productId) => get().productIds.includes(productId)
    }),
    {
      name: "wishlist-ui"
    }
  )
);
