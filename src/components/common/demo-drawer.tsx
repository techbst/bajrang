"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

export function DemoDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <ShoppingBag className="size-4" aria-hidden="true" />
          Open drawer
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart drawer</SheetTitle>
          <SheetDescription>Prepared for future cart interactions.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
