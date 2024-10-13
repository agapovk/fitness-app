"use client";

import React from "react";
import { deleteWorkout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import type { Category, Workout } from "@prisma/client";
import { PlusSquare, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import AddWorkout from "./AddWorkout";

type Props = {
  workouts: (Workout & { category: Category })[];
  categories: Category[];
};

export default function WorkoutsList({ workouts, categories }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between uppercase">
          Workouts
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <PlusSquare className="h-5 w-5" />
                <span className="sr-only">Add new workout</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Add new workout</SheetTitle>
                <SheetDescription />
              </SheetHeader>
              <AddWorkout categories={categories} setOpenWorkouts={setOpen} />
            </SheetContent>
          </Sheet>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {workouts.map((workout) => (
            <li
              key={workout.id}
              className="flex items-center justify-between gap-4"
            >
              <Link
                href={`/admin/workouts/${workout.id}`}
                className="flex items-center gap-4 hover:opacity-50"
              >
                <Image
                  src="/placeholder.svg"
                  alt={workout.name}
                  width={50}
                  height={50}
                  className="h-16 w-16 rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold">{workout.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {workout.category?.name}
                  </p>
                </div>
              </Link>
              <Button
                size="icon"
                variant="ghost"
                className="text-red-500"
                onClick={async () => {
                  try {
                    const result = await deleteWorkout(workout.id);
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
