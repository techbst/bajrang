"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export function DemoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reusable modal</DialogTitle>
          <DialogDescription>
            Ready for account, checkout, and confirmation flows.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
