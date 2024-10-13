"use client";

import { deleteExercise } from "@/app/actions";
import { Button } from "@/components/ui/button";
import type { Category, Exercise, Workout } from "@prisma/client";
import { PlusSquare, Trash2 } from "lucide-react";
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
import AddNewExercise from "./AddNewExercise";
import React from "react";

type Props = {
  categories: Category[];
  exercises: (Exercise & { workouts: Workout[] })[];
  workouts: (Workout & { category: Category })[];
};

export default function ExercisesList({
  exercises,
  workouts,
  categories,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between uppercase">
          Exercises
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <PlusSquare className="h-5 w-5" />
                <span className="sr-only">Add new exercise</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Add new exercise</SheetTitle>
                <SheetDescription />
              </SheetHeader>
              <AddNewExercise
                setOpen={setOpen}
                workouts={workouts}
                categories={categories}
              />
            </SheetContent>
          </Sheet>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {exercises.map((exercise) => (
            <li
              key={exercise.id}
              className="flex items-center justify-between gap-4"
            >
              <Image
                src="/placeholder.svg"
                alt={exercise.name}
                width={50}
                height={50}
                className="h-16 w-16 rounded-md"
              />
              <div className="flex-1">
                <p className="font-semibold">{exercise.name}</p>
                <p className="text-sm text-muted-foreground">
                  {exercise.description}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-red-500"
                onClick={async () => {
                  try {
                    const result = await deleteExercise(exercise.id);
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
