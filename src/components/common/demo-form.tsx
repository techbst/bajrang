"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const searchSchema = z.object({
  search: z.string().trim().min(2, "Enter at least 2 characters.")
});

type SearchForm = z.infer<typeof searchSchema>;

export function DemoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: { search: "" }
  });

  return (
    <form
      className="grid gap-3 sm:grid-cols-[1fr_auto]"
      onSubmit={handleSubmit(() => undefined)}
    >
      <div className="grid gap-2">
        <Label htmlFor="demo-search">Search</Label>
        <Input
          id="demo-search"
          placeholder="Search by part name or number"
          aria-invalid={Boolean(errors.search)}
          {...register("search")}
        />
        {errors.search ? (
          <p className="text-sm text-destructive">{errors.search.message}</p>
        ) : null}
      </div>
      <Button className="self-end" type="submit">
        Submit
      </Button>
    </form>
  );
}
