"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlusSquare, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Category, Exercise, Workout } from "@prisma/client";
import { removeWorkoutFromExercise } from "@/app/actions";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddNewExercise from "@/app/admin/exercises/components/AddNewExercise";
import AddExistedExerciseToWorkout from "./AddExistedExerciseToWorkout";

type Props = {
  workout: Workout & { exercises: Exercise[]; category: Category };
  workouts: (Workout & { category: Category })[];
  exercises: (Exercise & { workouts: Workout[] })[];
};

export default function EditWorkout({ workout, workouts, exercises }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Exercises:</h3>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <PlusSquare className="h-5 w-5" />
              <span className="sr-only">Add new exercise</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Add exercise to workout</SheetTitle>
              <SheetDescription />
            </SheetHeader>

            <Tabs defaultValue="existed">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existed">Add existed</TabsTrigger>
                <TabsTrigger value="new">Add new</TabsTrigger>
              </TabsList>
              <TabsContent value="existed">
                <AddExistedExerciseToWorkout
                  workoutId={workout.id}
                  exercises={exercises}
                  setOpen={setOpen}
                />
              </TabsContent>
              <TabsContent value="new">
                <AddNewExercise workouts={workouts} setOpen={setOpen} />
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      </div>
      <ul className="flex flex-col gap-3">
        {workout.exercises.map((exercise, index) => (
          <li
            key={exercise.id}
            className="flex items-center justify-between gap-4"
          >
            <Button variant="ghost" size="icon">
              {index + 1}
            </Button>
            <Image
              src={exercise.image}
              alt={exercise.name}
              width={50}
              height={50}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{exercise.name}</p>
              <p className="text-sm text-muted-foreground">TODO: descpition?</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-red-500"
              onClick={async () => {
                try {
                  const result = await removeWorkoutFromExercise(
                    exercise.id,
                    workout.id,
                  );
                  toast(result.name, {
                    description: "Exercise has been removed from workout",
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
    </div>
  );
}
