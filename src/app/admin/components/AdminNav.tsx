"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const adminSections = ["categories", "workouts", "exercises"];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {adminSections.map((category) => (
        <Link href={`/admin/${category}`} key={category}>
          <Button
            variant={
              pathname.split("/")[2] === category ? "default" : "outline"
            }
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <span>Edit {category}</span>
          </Button>
        </Link>
      ))}
    </nav>
  );
}
