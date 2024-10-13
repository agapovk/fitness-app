import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getExercises, getWorkout, getWorkouts } from "@/data/data";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import EditWorkout from "./components/EditWorkout";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const workout = await getWorkout(params.id);
  const workouts = await getWorkouts();
  const exercises = await getExercises();

  if (!workout)
    return (
      <div className="flex flex-col gap-4">
        <p>Workout not found</p>
        <Link href="/admin">
          <Button variant="default">Go back</Button>
        </Link>
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/workouts">
            <Button variant="outline" className="h-8 w-8 p-0">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-xl text-muted-foreground">{workout.name}</h2>
        </div>
        <Badge>{workout.category.name}</Badge>
      </div>
      <EditWorkout
        workout={workout}
        workouts={workouts}
        exercises={exercises}
      />
    </>
  );
}
