"use client";

import { deleteCategory } from "@/app/actions";
import type { Category, Workout } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import AddCategory from "./AddCategory";
import React from "react";
type Props = {
  data: (Category & { workouts: Workout[] })[];
};

export default function CategoriesList({ data }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between uppercase">
          Categories
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <PlusSquare className="h-5 w-5" />
                <span className="sr-only">Add new category</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Add new category</SheetTitle>
                <SheetDescription />
              </SheetHeader>
              <AddCategory setOpenCategories={setOpen} />
            </SheetContent>
          </Sheet>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {data.map((element) => (
            <li
              key={element.id}
              className="flex items-center justify-between gap-4"
            >
              <Image
                src="/placeholder.svg"
                alt={element.name}
                width={50}
                height={50}
                className="h-16 w-16 rounded-md"
              />
              <div className="flex-1">
                <p className="font-semibold">{element.name}</p>
                <p className="text-sm text-muted-foreground">
                  {element.workouts.length} workouts
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-red-500"
                onClick={async () => {
                  try {
                    const result = await deleteCategory(element.id);
                    toast(result.name, {
                      description: "Item has been deleted",
                    });
                  } catch (error) {
                    toast("error", {
                      description: JSON.stringify(error),
                    });
                  }
                }}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
