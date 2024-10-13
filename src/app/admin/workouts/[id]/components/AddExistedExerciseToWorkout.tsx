"use client";

import { addWorkoutToExercise } from "@/app/actions";
import { Button } from "@/components/ui/button";
import type { Exercise, Workout } from "@prisma/client";
import { SquarePlus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  workoutId: string;
  exercises: (Exercise & { workouts: Workout[] })[];
  setOpen: (state: boolean) => void;
};
export default function AddExistedExerciseToWorkout({
  setOpen,
  exercises,
  workoutId,
}: Props) {
  const exercisesWithoutCurrnetWorkout = exercises.filter((exercise) => {
    return !exercise.workouts.some((workout) => workout.id === workoutId);
  });

  if (exercisesWithoutCurrnetWorkout.length === 0) {
    return (
      <div className="max-h-[80vh] overflow-scroll rounded-md border p-4">
        <p className="text-center text-muted-foreground">No exercises left</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="max-h-[80vh] w-full overflow-scroll rounded-md border p-4">
        <ul className="flex flex-col gap-3">
          {exercisesWithoutCurrnetWorkout.map((exercise) => (
            <li
              key={exercise.id}
              className="flex items-center justify-between gap-4"
            >
              <Image
                src={exercise.image}
                alt={exercise.name}
                width={50}
                height={50}
                className="h-16 w-16 rounded-md"
              />
              <div className="flex flex-1 flex-col gap-1">
                <p className="font-semibold">{exercise.name}</p>
                <p className="text-sm text-muted-foreground">
                  In {exercise.workouts.length} workouts
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={async () => {
                  try {
                    const result = await addWorkoutToExercise(
                      exercise.id,
                      workoutId,
                    );
                    toast(result.name, {
                      description: "Exercise has been added to workout",
                    });
                  } catch (error) {
                    toast("error", {
                      description: JSON.stringify(error),
                    });
                  }
                }}
              >
                <SquarePlus className="h-5 w-5" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </div>
  );
}
